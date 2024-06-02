"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import MultiCriteriaTableAdvanced from "@/components/decision/multicriteria/MultiCriteriaTableAdvanced";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UniversalTable from "@/components/decision/multicriteria/UniversalTable";
import UniversalTableSimple from "@/components/decision/multicriteria/UniversalTableSimple";

const MultiCriteriaPage = () => {
  const [type, setType] = useState("середня");

  const [K, setK] = useState<any[]>([
    // {
    //   "name": "Корпус",
    //   "valuability": 8,
    //   "x1": 0.67,
    //   "x2": 0.25,
    //   "x3": 0,
    //   "x4": 0.43,
    //   "variations": [
    //     { "name": "Striker m12 0", "value": 0 },
    //     { "name": "Rebel k1 0.25", "value": 0.25 },
    //     { "name": "Revolut2 0.43", "value": 0.43 },
    //     { "name": "SupaCase 0.67", "value": 0.67 }
    //   ]
    // },
    {
      "name": "Процесор",
      "valuability": 8,
      "expected": 20,
      "x1": 10,
      "x2": 20,
      "x3": 20,
      "x4": 20,
      "variations": [
        { "name": "i3 7400 5", "value": 5 },
        { "name": "i3 13400 10", "value": 5 },
        { "name": "i5 11400 10", "value": 10 },
        { "name": "i5 13400 15", "value": 15 },
        { "name": "i7 13900f 20", "value": 20 },
      ]
    },
    // {
    //   "name": "Кулер",
    //   "valuability": 9,
    //   "x1": 0,
    //   "x2": 0.5,
    //   "x3": 0,
    //   "x4": 1,
    //   "variations": [
    //     { "name": "Sunzi 0", "value": 0 },
    //     { "name": "GameMax 0.5", "value": 0.5 },
    //     { "name": "Aerocool k1 1", "value": 1 }
    //   ]
    // },
    {
      "name": "Відеокарта",
      "valuability": 10,
      "expected": 20,
      "x1": 0,
      "x2": 10,
      "x3": 10,
      "x4": 20,
      "variations": [
        { "name": "RTX 1050ti 0", "value": 0 },
        { "name": "RTX 1070 5", "value": 5 },
        { "name": "RTX 3060 10", "value": 10 },
        { "name": "RTX 3070 15", "value": 15 },
        { "name": "RTX 3090 20", "value": 20 }
      ]
    },
    {
      "name": "Блок живлення",
      "valuability": 9,
      "expected": 15,
      "x1": 15,
      "x2": 0,
      "x3": 20,
      "x4": 15,
      "variations": [
        { "name": "Thermaltake VX1000W 20", "value": 20 },
        { "name": "Phantom 700W 15", "value": 15 },
        { "name": "Powermate 500W 10", "value": 10 },
        { "name": "Aerocool 400W 5", "value": 5 },
        { "name": "Aerocool VX300 0", "value": 0 },
      ]
    },
    {
      "name": "Оперативна пам'ять",
      "valuability": 8,
      "expected": 20,
      "x1": 25,
      "x2": 15,
      "x3": 5,
      "x4": 5,
      "variations": [
        { "name": "2*32gb 6000mhz 25", "value": 25 },
        { "name": "2*32gb 4000mhz 25", "value": 20 },
        { "name": "2*16gb 4000mhz 15", "value": 15 },
        { "name": "2*8gb 4000mhz 15", "value": 15 },
        { "name": "2*4gb 4000mhz 5", "value": 5 },
      ]
    },
    {
      "name": "Постійна пам'ять",
      "valuability": 8,
      "expected": 20,
      "x1": 15,
      "x2": 0,
      "x3": 20,
      "x4": 15,
      "variations": [
        { "name": "SSD 512gb 20", "value": 20 },
        { "name": "SSD 256gb 15", "value": 15 },
        { "name": "HDD 2tb 10", "value": 10 },
        { "name": "HDD 1tb 5", "value": 5 },
        { "name": "HDD 512gb 0", "value": 0 }
      ]
    },
    // {
    //   "name": "Материнська плата",
    //   "valuability": 5,
    //   "x1": 0.5,
    //   "x2": 1,
    //   "x3": 1,
    //   "x4": 0,
    //   "variations": [
    //     { "name": "Xiang A350 0", "value": 0 },
    //     { "name": "Asus Prime A450 0.5", "value": 0.5 },
    //     { "name": "Asus TUF gaming B550 1", "value": 1 },
    //   ]
    // },
    // {
    //   "name": "Термо паста",
    //   "valuability": 3,
    //   "x1": 1,
    //   "x2": 1,
    //   "x3": 1,
    //   "x4": 0,
    //   "variations": [
    //     { "name": "Aerocool MX500 1", "value": 1 },
    //     { "name": "Thermaltake k600 0", "value": 5 }
    //   ]
    // }
  ]);

  const [K2, setK2] = useState<any[]>([]);
  const [matrix, setMatrix] = useState<any[]>([]);
  const [X, setX] = useState<any[]>([]);
  const [maxX, setMaxX] = useState<any>({});

  const calculate = () => {
    const sum = K.reduce((acc, obj) => {
      return acc + obj.valuability;
    }, 0);
    const k2 = K.map((obj) => {
      return { ...obj, valuability: obj.valuability / sum, variations: null };
    });

    setK2(k2);

    //only x
    const onlyX = K.map((obj) => {
      const { valuability, expected, variations, name, ...other } = obj;
      return other;
    });
    console.log(onlyX);

    const maxAB = (arr: number[]): number => {
      return Math.max(...arr);
    };
    const minAB = (arr: number[]): number => {
      return Math.min(...arr);
    };

    // Iterate through each object
    const newX = onlyX.map((obj, i) => {
      return Object.values(obj).map((value: any, j) => {
        const maxVal = maxAB(Object.values(obj));
        const minVal = minAB(Object.values(obj));
        const toDivide = Math.max(
          K[i].expected - minVal,
          maxVal - K[i].expected
        );

        //divide by max value in current obj
        return 1 - Math.abs(K[i].expected - value) / toDivide;
      });
    });
    console.log("newX", newX);

    setMatrix(newX);

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
      <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-6">
            <UniversalTable K={K} setK={setK} title="Критерії" />
            {!!K2.length && (
              <UniversalTableSimple
                disabled
                K={K2}
                setK={setK2}
                title="Нормалізаці ваг"
              />
            )}
          </div>
          {!!K2.length && (
            <div className="flex flex-col gap-6 items-start">
              <div className="flex flex-row gap-6">
                <MultiCriteriaTableAdvanced
                  disabled
                  K={matrix}
                  setK={setMatrix}
                  title="Матриця"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h2 className="p-4 font-medium">
                    Результат кожної альтернативи
                  </h2>
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
            </div>
          )}
        </div>

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
