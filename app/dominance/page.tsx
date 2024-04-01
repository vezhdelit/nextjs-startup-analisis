"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MultiCriteriaTable from "@/components/multicriteria/MultiCriteriaTable";
import MultiCriteriaTableAdvanced from "@/components/multicriteria/MultiCriteriaTableAdvanced";
import DominationTable from "@/components/multicriteria/DominationTable";
import DominanceInputTable from "@/components/multicriteria/DominanceInputTable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const MultiCriteriaPage = () => {
  const [K, setK] = useState<any[]>([
    { greater: false, x1: 3000, x2: 4000, x3: 5000, x4: 3500 }, //1
    { greater: true, x1: 4, x2: 5, x3: 5, x4: 3 }, //2
    { greater: true, x1: 4, x2: 3, x3: 4, x4: 2 }, //3
    { greater: true, x1: 1, x2: 1, x3: 1, x4: 0 }, //4
    { greater: true, x1: 1, x2: 0, x3: 0, x4: 1 }, //5

    { greater: true, x1: 1, x2: 0, x3: 1, x4: 1 }, //6
    { greater: true, x1: 4, x2: 3, x3: 4, x4: 3 }, //7
    { greater: true, x1: 3, x2: 5, x3: 5, x4: 1 }, //8
    { greater: true, x1: 1, x2: 1, x3: 1, x4: 0 }, //9
  ]);

  const [D, setD] = useState<any[]>([]);

  const [sumX1, setSumX1] = useState<number>(0);
  const [sumX2, setSumX2] = useState<number>(0);
  const [sumX3, setSumX3] = useState<number>(0);
  const [sumX4, setSumX4] = useState<number>(0);

  const [maxX, setMaxX] = useState<any>({});

  const calculate = () => {
    const countsX1 = K.reduce(
      (acc, curr) => {
        Object.entries(curr).forEach(([key, value]) => {
          if (key !== "x1" && key !== "greater") {
            if (curr.greater) {
              if (curr.x1 >= value) {
                acc[key]++;
              }
            } else {
              if (curr.x1 <= value) {
                acc[key]++;
              }
            }
          }
        });
        return acc;
      },
      { x2: 0, x3: 0, x4: 0 }
    );
    const countsX2 = K.reduce(
      (acc, curr) => {
        Object.entries(curr).forEach(([key, value]) => {
          if (key !== "x2" && key !== "greater") {
            if (curr.greater) {
              if (curr.x2 >= value) {
                acc[key]++;
              }
            } else {
              if (curr.x2 <= value) {
                acc[key]++;
              }
            }
          }
        });
        return acc;
      },
      { x1: 0, x3: 0, x4: 0 }
    );
    const countsX3 = K.reduce(
      (acc, curr) => {
        Object.entries(curr).forEach(([key, value]) => {
          if (key !== "x3" && key !== "greater") {
            if (curr.greater) {
              if (curr.x3 >= value) {
                acc[key]++;
              }
            } else {
              if (curr.x3 <= value) {
                acc[key]++;
              }
            }
          }
        });
        return acc;
      },
      { x1: 0, x2: 0, x4: 0 }
    );
    const countsX4 = K.reduce(
      (acc, curr) => {
        Object.entries(curr).forEach(([key, value]) => {
          if (key !== "x4" && key !== "greater") {
            if (curr.greater) {
              if (curr.x4 >= value) {
                acc[key]++;
              }
            } else {
              if (curr.x4 <= value) {
                acc[key]++;
              }
            }
          }
        });
        return acc;
      },
      { x1: 0, x2: 0, x3: 0 }
    );

    const d = [countsX1, countsX2, countsX3, countsX4];
    setD(d);
    console.log(d);

    //sum counts for each x1
    const sumX1 = (d[0].x2 + d[0].x3 + d[0].x4) / 18;
    const sumX2 = (d[1].x1 + d[1].x3 + d[1].x4) / 18;
    const sumX3 = (d[2].x1 + d[2].x2 + d[2].x4) / 18;
    const sumX4 = (d[3].x1 + d[3].x2 + d[3].x3) / 18;

    setSumX1(sumX1);
    setSumX2(sumX2);
    setSumX3(sumX3);
    setSumX4(sumX4);

    const max = Math.max(sumX1, sumX2, sumX3, sumX4);
    let maxObj = {};
    if (max === sumX1) {
      maxObj = { name: "X1", score: sumX1 };
    } else if (max === sumX2) {
      maxObj = { name: "X2", score: sumX2 };
    } else if (max === sumX3) {
      maxObj = { name: "X3", score: sumX3 };
    } else if (max === sumX4) {
      maxObj = { name: "X4", score: sumX4 };
    }
    setMaxX(maxObj);
  };

  return (
    <main className="flex flex-col gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-6">
          <DominanceInputTable K={K} setK={setK} title="Критерії" />
          {!!D.length && (
            <div className="flex flex-col">
              <DominationTable D={D} setD={setD} title="Показники домінуванн" />
              <div>
                <h2 className="p-4 font-medium">Ранг кожної альтернативи</h2>
                <div className="border rounded-lg ">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className=" bg-blue-50 w-12">X1</TableCell>
                        <TableCell>
                          <Input
                            step={"1"}
                            type="number"
                            value={sumX1.toFixed(2)}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className=" bg-blue-50 w-12">X2</TableCell>
                        <TableCell>
                          <Input
                            step={"1"}
                            type="number"
                            value={sumX2.toFixed(2)}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className=" bg-blue-50 w-12">X3</TableCell>
                        <TableCell>
                          <Input
                            step={"1"}
                            type="number"
                            value={sumX3.toFixed(2)}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className=" bg-blue-50 w-12">X4</TableCell>
                        <TableCell>
                          <Input
                            step={"1"}
                            type="number"
                            value={sumX4.toFixed(2)}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="border-4 border-blue-500/50 rounded-lg mt-4">
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