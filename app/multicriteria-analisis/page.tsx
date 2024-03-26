"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MultiCriteriaTable from "@/components/multicriteria/MultiCriteriaTable";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MultiCriteriaPage = () => {
  const [type, setType] = useState("середня");

  const [K, setK] = useState<any[]>([
    { valuability: 8, x1: 0.67, x2: 0.25, x3: 0, x4: 0.43 }, //1
    { valuability: 10, x1: 0.8, x2: 1, x3: 1, x4: 0.6 }, //2
    { valuability: 9, x1: 0, x2: 0.5, x3: 0, x4: 1 }, //3
    { valuability: 8, x1: 1, x2: 1, x3: 1, x4: 0 }, //4
    { valuability: 5, x1: 1, x2: 0, x3: 0, x4: 1 }, //5

    { valuability: 6, x1: 1, x2: 0, x3: 1, x4: 1 }, //6
    { valuability: 9, x1: 1, x2: 0.7, x3: 1, x4: 0.7 }, //7
    { valuability: 5, x1: 0.5, x2: 1, x3: 1, x4: 0 }, //8
    { valuability: 3, x1: 1, x2: 1, x3: 1, x4: 0 }, //9
  ]);
  const [K2, setK2] = useState<any[]>([]);
  const [X, setX] = useState<any[]>([]);
  const [maxX, setMaxX] = useState<any>({});

  const calculate = () => {
    const sum = K.reduce((acc, obj) => {
      return acc + obj.valuability;
    }, 0);
    const k2 = K.map((obj) => {
      return { ...obj, valuability: obj.valuability / sum };
    });
    console.log(k2);

    setK2(k2);

    //for each x in K2 calculate valeuability*xi
    let x1, x2, x3, x4;
    if (type === "середня") {
      x1 = k2.reduce((acc, obj) => {
        return acc + obj.valuability * obj.x1;
      }, 0);
      x2 = k2.reduce((acc, obj) => {
        return acc + obj.valuability * obj.x2;
      }, 0);
      x3 = k2.reduce((acc, obj) => {
        return acc + obj.valuability * obj.x3;
      }, 0);
      x4 = k2.reduce((acc, obj) => {
        return acc + obj.valuability * obj.x4;
      }, 0);
    } else if (type === "песимістична") {
      x1 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability / obj.x1;
        return 1 / sum;
      }, 0);
      x2 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability / obj.x2;
        return 1 / sum;
      }, 0);
      x3 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability / obj.x3;
        return 1 / sum;
      }, 0);
      x4 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability / obj.x4;
        return 1 / sum;
      }, 0);
    } else if (type === "оптимістична") {
      x1 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability * obj.x1 * obj.x1;
        return Math.sqrt(sum);
      }, 0);
      x2 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability * obj.x2 * obj.x2;
        return Math.sqrt(sum);
      }, 0);
      x3 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability * obj.x3 * obj.x3;
        return Math.sqrt(sum);
      }, 0);
      x4 = k2.reduce((acc, obj) => {
        const sum = acc + obj.valuability * obj.x4 * obj.x4;
        return Math.sqrt(sum);
      }, 0);
    } else if (type === "обережна") {
      x1 = k2.reduce((acc, obj) => {
        return acc * Math.pow(obj.x1, obj.valuability);
      }, 1);
      x2 = k2.reduce((acc, obj) => {
        return acc * Math.pow(obj.x2, obj.valuability);
      }, 1);
      x3 = k2.reduce((acc, obj) => {
        return acc * Math.pow(obj.x3, obj.valuability);
      }, 1);
      x4 = k2.reduce((acc, obj) => {
        return acc * Math.pow(obj.x4, obj.valuability);
      }, 1);
    }

    setX([
      { name: "X1", score: x1 },
      { name: "X2", score: x2 },
      { name: "X3", score: x3 },
      { name: "X4", score: x4 },
    ]);

    const max = Math.max(x1, x2, x3, x4);
    let maxObj = {};
    if (max === x1) {
      maxObj = { name: "X1", score: x1 };
    } else if (max === x2) {
      maxObj = { name: "X2", score: x2 };
    } else if (max === x3) {
      maxObj = { name: "X3", score: x3 };
    } else if (max === x4) {
      maxObj = { name: "X4", score: x4 };
    }
    setMaxX(maxObj);
  };

  return (
    <main className="flex flex-col gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="p-2 font-medium">Тип згортки</h2>
          <Select value={type} onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="песимістична">Песимістична</SelectItem>
                <SelectItem value="обережна">Обережна</SelectItem>
                <SelectItem value="середня">Середня</SelectItem>
                <SelectItem value="оптимістична">Оптимістична</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row gap-6">
          <MultiCriteriaTable K={K} setK={setK} title="Критерії" />
          {!!X.length && (
            <MultiCriteriaTable disabled K={K2} setK={setK2} title="2 етап" />
          )}
        </div>
        {!!X.length && (
          <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-col justify-center">
              <h2 className="p-4 font-medium">Результат кожної альтернативи</h2>
              <div className="border rounded-lg w-[500px]">
                <Table>
                  <TableBody>
                    <TableRow>
                      {X.map((obj, index) => (
                        <TableCell className="bg-blue-50  items-center justify-center">
                          <Label className="pl-6 text-center self-center mx-auto">
                            X{index + 1}
                          </Label>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {X.map((obj, index) => (
                        <TableCell>
                          <Input
                            key={index}
                            className="w-[80px]"
                            disabled
                            type="number"
                            value={obj.score.toFixed(2)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="border-4 border-blue-500/50 rounded-lg mt-4 w-[500px]">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className=" bg-blue-50">
                      Найкраща альтернатива
                    </TableCell>
                    <TableCell className=" text-base font-semibold">
                      {maxX.name}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {/* Найкраща альтернатива: {maxX.name} з результатом{" "}
            {maxX?.score?.toFixed(2)} */}
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2">
        <Button onClick={calculate} className="bg-blue-600 hover:bg-blue-500">
          Аналіз
        </Button>
      </div>
      <div className="flex flex-row gap-6"></div>
    </main>
  );
};

export default MultiCriteriaPage;
