"use client";

import MyLineChart from "@/components/gen/MyLineChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Home = () => {
  const [isLoadingMin, setIsLoadingMin] = useState(false);
  const [isLoadingMax, setIsLoadingMax] = useState(false);

  const [populationSize, setPopulationSize] = useState(100);
  const [maxGenerations, setMaxGenerations] = useState(200);
  const [pCrossover, setPCrossover] = useState(0.9);
  const [pMutations, setPMutations] = useState(0.1);
  const [nVector, setNVector] = useState(2);
  const [limitValueTop, setLimitValueTop] = useState(100);
  const [limitValueDown, setLimitValueDown] = useState(-100);

  const [fitnessFunc, setFitnessFunc] = useState(
    "f[0]**2 + 1.5 * f[1]**2 - 2 * f[0] * f[1] + 4 * f[0] - 8 * f[1]"
  );

  const [result, setResult] = useState({} as any);
  const [firstRecordsToShowCount, setFirstRecordsToShowCount] = useState(10);

  const handleSubmitMin = async () => {
    setIsLoadingMin(true);
    const data = {
      constants: {
        POPULATION_SIZE: populationSize,
        MAX_GENERATIONS: maxGenerations,
        P_CROSSOVER: pCrossover,
        P_MUTATION: pMutations,
        N_VECTOR: nVector,
        LIMIT_VALUE_TOP: limitValueTop,
        LIMIT_VALUE_DOWN: limitValueDown,
        RANDOM_SEED: 1, // Assuming this is a constant value you want to include
      },
      fitness_function: fitnessFunc,
    };

    await fetch(
      "https://flask-genetic-algorithm.vercel.app/approximation/min",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResult(data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      })
      .finally(() => {
        setIsLoadingMin(false);
      });
  };

  const handleSubmitMax = async () => {
    setIsLoadingMax(true);
    const data = {
      constants: {
        POPULATION_SIZE: populationSize,
        MAX_GENERATIONS: maxGenerations,
        P_CROSSOVER: pCrossover,
        P_MUTATION: pMutations,
        N_VECTOR: nVector,
        LIMIT_VALUE_TOP: limitValueTop,
        LIMIT_VALUE_DOWN: limitValueDown,
        RANDOM_SEED: 1, // Assuming this is a constant value you want to include
      },
      fitness_function: fitnessFunc,
    };

    await fetch(
      "https://flask-genetic-algorithm.vercel.app/approximation/max",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResult(data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      })
      .finally(() => {
        setIsLoadingMax(false);
      });
  };

  return (
    <main className="flex w-full flex-col gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div className="flex w-full flex-row gap-16 justify-center">
        <div className=" flex flex-col max-w-md w-full gap-4">
          <div className=" flex flex-col w-full gap-2">
            <Label>Розмір популяції</Label>
            <Input
              value={populationSize}
              onChange={(e) => setPopulationSize(+e.target.value)}
            ></Input>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <Label>Максимальна кількість генерацій</Label>
            <Input
              value={maxGenerations}
              onChange={(e) => setMaxGenerations(+e.target.value)}
            ></Input>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <Label>Шанс схрещення хромосом</Label>
            <Input
              value={pCrossover}
              onChange={(e) => setPCrossover(+e.target.value)}
            ></Input>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <Label>Шанс мутації хромосом</Label>
            <Input
              value={pMutations}
              onChange={(e) => setPMutations(+e.target.value)}
            ></Input>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <Label>Кількість генів в однієї хромосоми</Label>
            <Input
              value={nVector}
              onChange={(e) => setNVector(+e.target.value)}
            ></Input>
          </div>

          <div className=" flex flex-col w-full gap-2">
            <Label>Мінімальне/максимальне значення гена</Label>
            <div className=" flex flex-row w-full gap-2">
              <Input
                value={limitValueDown}
                onChange={(e) => setLimitValueDown(+e.target.value)}
              ></Input>
              <Input
                value={limitValueTop}
                onChange={(e) => setLimitValueTop(+e.target.value)}
              ></Input>
            </div>
          </div>

          <div className=" flex flex-col w-full gap-2">
            <Label>Цільова функція</Label>
            <Input
              value={fitnessFunc}
              onChange={(e) => setFitnessFunc(e.target.value)}
            ></Input>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 w-full">
            <Button
              disabled={!fitnessFunc || isLoadingMin}
              className="w-full bg-blue-500 hover:bg-blue-500/95"
              onClick={handleSubmitMin}
            >
              {isLoadingMin ? (
                <AiOutlineLoading className="animate-spin w-5 h-5" />
              ) : (
                "Знайти мінімум"
              )}
            </Button>
            <Button
              disabled={!fitnessFunc || isLoadingMax}
              className="w-full"
              variant={"destructive"}
              onClick={handleSubmitMax}
            >
              {isLoadingMax ? (
                <AiOutlineLoading className="animate-spin w-5 h-5" />
              ) : (
                "Знайти максимум"
              )}
            </Button>
          </div>
        </div>
        {!!result.min_fitness_values && (
          <div className="flex flex-col gap-6  w-[600px]">
            <Input
              className="w-24 self-end"
              value={firstRecordsToShowCount}
              type="number"
              onChange={(e) => setFirstRecordsToShowCount(+e.target.value)}
            />
            <MyLineChart
              minFitness={result.min_fitness_values}
              maxFitness={result.max_fitness_values}
              meanFitness={result.mean_fitness_values}
              firstRecordsAmount={firstRecordsToShowCount}
            />
            {result.min ? (
              <div>
                <Label>Мінімальне значення функції </Label>
                <Input
                  className=" self-end"
                  value={result.min.toFixed(2)}
                  type="number"
                />
              </div>
            ) : (
              <div>
                <Label>Максимальне значення функції </Label>
                <Input
                  className=" self-end"
                  value={result.max.toFixed(2)}
                  type="number"
                />
              </div>
            )}

            <div>
              <Label>Оптимальні значення аргументів </Label>
              <div className="flex gap-6">
                {result.values.map((value: number, index: number) => (
                  <Input
                    key={index}
                    className=" self-end"
                    value={value.toFixed(3)}
                    type="number"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
