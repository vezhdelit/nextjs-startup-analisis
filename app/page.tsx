"use client";

import InputTables from "@/components/InputTables";
import ModelOneTable from "@/components/ModelOneTable";
import UTable from "@/components/UTable";
import ValuationTable from "@/components/ValuationTable";
import { Button } from "@/components/ui/button";

import { defineTerms, maxAB, membershipFunc, termU } from "@/lib/utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const [G, setG] = useState<number[]>([70, 50, 40, 150, 65]);
  const [A, setA] = useState<number[]>([20, 15, 10, 50, 25]);
  const [B, setB] = useState<number[]>([115, 60, 50, 225, 90]);

  const [T, setT] = useState<number[]>([80, 55, 35, 165, 50]);
  const [U, setU] = useState<number[]>([3, 3, 5, 4, 3]);
  const [P, setP] = useState<number[]>([10, 8, 6, 7, 4]);

  const [fG, setfG] = useState<number[]>([0, 0, 0, 0, 0]);
  const [fT, setfT] = useState<number[]>([0, 0, 0, 0, 0]);

  const [Uj, setUj] = useState<number[][]>([
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
    [1],
  ]);
  const [uUj, setuUj] = useState<number[][]>([
    [0.1, 0.2],
    [0.1, 0.2],
    [0.1, 0.2],
    [0.1, 0.2],
    [0.1],
  ]);

  const [uO, setuO] = useState<number[]>([0.1, 0.1, 0.1, 0.1, 0.1]);

  const calculateValuation = () => {
    setfG(membershipFunc(G, A, B));
    setfT(membershipFunc(T, A, B));
    setUj(defineTerms(fG, fT));
    setuUj(termU(fG, fT, Uj));
    setuO(maxAB(Uj, uUj, U));

    setIsCalculated(true);
  };

  const setDefaultValues = () => {
    setG([70, 50, 40, 150, 65]);
    setA([20, 15, 10, 50, 25]);
    setB([115, 60, 50, 225, 90]);

    setT([80, 55, 35, 165, 50]);
    setU([3, 3, 5, 4, 3]);
    setP([10, 8, 6, 7, 4]);

    setIsCalculated(false);
  };

  return (
    <main className="flex flex-col gap-8 min-h-[80vh] items-center justify-center px-8">
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
        <Button onClick={setDefaultValues}>Default Values</Button>

        <Button
          className="bg-blue-600 hover:bg-blue-500"
          onClick={calculateValuation}
        >
          Calculate
        </Button>
      </div>

      {isCalculated && (
        <>
          <ModelOneTable G={G} fG={fG} T={T} fT={fT} />
          <UTable Uj={Uj} uUj={uUj} UjStar={U} />
          <ValuationTable uO={uO} />
        </>
      )}
    </main>
  );
};

export default Home;
