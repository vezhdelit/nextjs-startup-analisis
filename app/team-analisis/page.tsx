"use client";
import OTable from "@/components/team/OTable";
import TeamEvaluationView from "@/components/team/TeamEvaluationView";
import TeamInput from "@/components/team/TeamInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { teamEvaluation } from "@/lib/team";
import { TeamCriteria } from "@/types";
import { useEffect, useState } from "react";

const RiskAnalisisPage = () => {
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const [A, setA] = useState<number[]>([10, 9, 8]);
  const [B, setB] = useState<number[]>([10, 8]);
  const [K1, setK1] = useState<TeamCriteria[]>([
    { lingusticValue: "B", credibility: 0.8, expected: 8 }, //10 => 0.92
    { lingusticValue: "C", credibility: 0.9, expected: 9 }, //8 =>0.84
  ]);
  const [K2a, setK2a] = useState<TeamCriteria[]>([
    { lingusticValue: "B", credibility: 0.7, expected: 8 }, //10 => 0.82
    { lingusticValue: "C", credibility: 0.8, expected: 10 }, //8 => 0.74
  ]);
  const [K2b, setK2b] = useState<TeamCriteria[]>([
    { lingusticValue: "HC", credibility: 0.6, expected: 9 }, //5 => 0.18
    { lingusticValue: "C", credibility: 0.5, expected: 10 }, //8 => 0.32
    { lingusticValue: "C", credibility: 0.7, expected: 7 },
  ]);
  const [K3, setK3] = useState<TeamCriteria[]>([
    { lingusticValue: "HC", credibility: 0.8, expected: 8 },
    { lingusticValue: "B", credibility: 0.9, expected: 6 },
    { lingusticValue: "B", credibility: 0.9, expected: 7 },
    { lingusticValue: "C", credibility: 0.8, expected: 9 },
  ]);

  const [O1, setO1] = useState<number[]>([]);
  const [O2a, setO2a] = useState<number[]>([]);
  const [O2b, setO2b] = useState<number[]>([]);
  const [O3, setO3] = useState<number[]>([]);

  const [Z, setZ] = useState<number>();

  const calculate = () => {
    const res = teamEvaluation(K1, K2a, K2b, K3, A, B);

    setO1(res.O1);
    setO2a(res.O2a);
    setO2b(res.O2b);
    setO3(res.O3);

    setZ(+res.Z.toFixed(2));

    setIsCalculated(true);
  };

  useEffect(() => {
    isCalculated && calculate();
  }, [K1, K2a, K2b, K3]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center">
      <div className="flex flex-col justify-center gap-6">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <div className="flex flex-row items-center border-b mb-16">
              <h2 className="p-4 font-medium">Стабільність та згуртованість</h2>
              <Input
                value={A[0]}
                onChange={(e) => {
                  let newA = [...A];
                  newA[0] = +e.target.value;
                  setA(newA);
                }}
                className="w-20 mr-4 ml-auto "
              />
            </div>
            <TeamInput K={K1} setK={setK1} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row  items-center border-b mb-2">
              <h2 className="p-4 font-medium">Професійні компетенції</h2>
              <Input
                value={A[1]}
                onChange={(e) => {
                  let newA = [...A];
                  newA[1] = +e.target.value;
                  setA(newA);
                }}
                className="w-20 mr-4 ml-auto"
              />{" "}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <h2 className="p-4 font-medium">Проф. компетенції лідерів</h2>
                <Input
                  value={B[0]}
                  onChange={(e) => {
                    let newB = [...B];
                    newB[0] = +e.target.value;
                    setA(newB);
                  }}
                  className="w-20 mr-4 ml-auto"
                />{" "}
              </div>
              <TeamInput K={K2a} setK={setK2a} />
            </div>
            <div className="flex flex-col pt-2">
              <div className="flex flex-row items-center">
                <h2 className="p-4 font-medium">Проф. компетенції команди</h2>
                <Input
                  value={B[0]}
                  onChange={(e) => {
                    let newB = [...B];
                    newB[0] = +e.target.value;
                    setA(newB);
                  }}
                  className="w-20 mr-4 ml-auto"
                />{" "}
              </div>
              <TeamInput K={K2b} setK={setK2b} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <h2 className="p-4 font-medium">Активність команди</h2>
              <Input
                value={A[1]}
                onChange={(e) => {
                  let newA = [...A];
                  newA[1] = +e.target.value;
                  setA(newA);
                }}
                className="w-20 mr-4 ml-auto"
              />{" "}
            </div>
            <TeamInput K={K3} setK={setK3} />
          </div>
        </div>

        <Button
          className="w-fit mx-auto bg-blue-600 hover:bg-blue-500"
          onClick={calculate}
        >
          Аналіз
        </Button>
        {Z && (
          <div className="flex flex-row gap-8 mx-auto pb-12">
            <OTable K={O1} title="" />
            <div>
              <OTable K={O2a} title="" />
              <OTable K={O2b} title="" />
            </div>

            <OTable K={O3} title="" />
            <TeamEvaluationView finalRes={Z} />
          </div>
        )}
      </div>
    </main>
  );
};

export default RiskAnalisisPage;
