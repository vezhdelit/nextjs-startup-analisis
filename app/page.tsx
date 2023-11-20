"use client";

import InputTables from "@/components/EvaluationInputTables";
import ModelOneTable from "@/components/ModelOneTable";
import StartupEvaluationView from "@/components/StartupEvaluationView";
import UTable from "@/components/UTable";
import EvaluationTable from "@/components/EvaluationTable";
import { Button } from "@/components/ui/button";

import { startupEvaluation } from "@/lib/utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const [G, setG] = useState<number[]>([70, 50, 40, 150, 65]);
  const [A, setA] = useState<number[]>([20, 15, 10, 50, 25]);
  const [B, setB] = useState<number[]>([115, 60, 50, 225, 90]);

  const [T, setT] = useState<number[]>([80, 55, 35, 165, 50]);
  const [U, setU] = useState<number[]>([3, 3, 5, 4, 3]);
  const [P, setP] = useState<number[]>([10, 8, 6, 7, 4]);

  const [fG, setfG] = useState<number[]>();
  const [fT, setfT] = useState<number[]>();

  const [Uj, setUj] = useState<number[][]>();
  const [uUj, setuUj] = useState<number[][]>();

  const [uO, setuO] = useState<number[]>();

  const [finalRes, setFinalRes] = useState<number>();

  const calculate = () => {
    const res = startupEvaluation(G, A, B, T, U, P);

    setfG(res.fG);
    setfT(res.fT);
    setUj(res.Uj);
    setuUj(res.uUj);
    setuO(res.uO);
    setFinalRes(res.finalRes);

    setIsCalculated(true);
  };

  const defaultValues = () => {
    setG([70, 50, 40, 150, 65]);
    setA([20, 15, 10, 50, 25]);
    setB([115, 60, 50, 225, 90]);
    setT([80, 55, 35, 165, 50]);
    setU([3, 3, 5, 4, 3]);
    setP([10, 8, 6, 7, 4]);

    setIsCalculated(false);
  };

  const clearValues = () => {
    setG([0, 0, 0, 0, 0]);
    setA([0, 0, 0, 0, 0]);
    setB([0, 0, 0, 0, 0]);
    setT([0, 0, 0, 0, 0]);
    setU([0, 0, 0, 0, 0]);
    setP([0, 0, 0, 0, 0]);

    setIsCalculated(false);
  };

  useEffect(() => {
    isCalculated && calculate();
  }, [G, A, B, T, U, P]);

  return (
    <main className="flex flex-col gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div className="">
        <InputTables
          G={G}
          setG={setG}
          A={A}
          setA={setA}
          B={B}
          setB={setB}
          T={T}
          setT={setT}
          U={U}
          setU={setU}
          P={P}
          setP={setP}
        />
      </div>

      <div className="flex flex-row gap-2">
        <Button variant={"destructive"} onClick={clearValues}>
          Clear
        </Button>
        <Button onClick={defaultValues}>Default Values</Button>
        <Button className="bg-blue-600 hover:bg-blue-500" onClick={calculate}>
          Calculate
        </Button>
      </div>

      {isCalculated && fG && fT && Uj && uUj && uO && finalRes && (
        <>
          <ModelOneTable G={G} fG={fG} T={T} fT={fT} />
          <UTable Uj={Uj} uUj={uUj} UjStar={U} />
          <EvaluationTable uO={uO} />
          <StartupEvaluationView finalRes={finalRes} />
        </>
      )}
    </main>
  );
};

export default Home;
