"use client";

import MyDialog from "@/components/implementation-and-accompaniment/gen/MyDialog";
import MyLineChart from "@/components/implementation-and-accompaniment/gen/MyLineChart";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [randomSeed, setRandomSeed] = useState<any>(1);
  const [isRandom, setIsRandom] = useState(false);

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
        RANDOM_SEED: isRandom ? null : randomSeed, // Assuming this is a constant value you want to include
      },
      fitness_function: fitnessFunc,
    };

    await fetch(
      "http://localhost:3000/approximation/v1/min",
      // "https://flask-genetic-algorithm.vercel.app/approximation/v1/min",
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
        setResult({
          error: "Помилка розрахунків. Перевірте правильність вхідних даних",
          message: error.message,
        });
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
        setResult({
          error: "Помилка розрахунків. Перевірте правильність вхідних даних",
          message: error.message,
        });
        console.error("There was a problem with your fetch operation:", error);
      })
      .finally(() => {
        setIsLoadingMax(false);
      });
  };

  return (
    <main className="flex w-full flex-col gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <h2 className="flex items-center text-2xl font-bold gap-2">
        Задача апроксимації функції на основі генетичний алгоритму
        <MyDialog />
      </h2>
      <div className="flex w-full flex-row gap-16 justify-center">
        <div className=" flex flex-col max-w-md w-full gap-4">
          <div className=" flex flex-col w-full gap-2">
            <Label>Розмір популяції</Label>
            <Input
              min={4}
              type="number"
              value={populationSize}
              onChange={(e) => setPopulationSize(+e.target.value)}
            ></Input>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <Label>Максимальна кількість генерацій</Label>
            <Input
              min={1}
              type="number"
              value={maxGenerations}
              onChange={(e) => setMaxGenerations(+e.target.value)}
            ></Input>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <Label>Шанс схрещення хромосом</Label>
            <Input
              min={0}
              max={1}
              type="number"
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
              min={1}
              type="number"
              step={1}
              value={nVector}
              onChange={(e) => setNVector(+e.target.value)}
            ></Input>
          </div>

          <div className=" flex flex-col w-full gap-2">
            <Label>Мінімальне/максимальне значення гена</Label>
            <div className=" flex flex-row w-full gap-2">
              <Input
                type="number"
                value={limitValueDown}
                onChange={(e) => setLimitValueDown(+e.target.value)}
              ></Input>
              <Input
                type="number"
                value={limitValueTop}
                onChange={(e) => setLimitValueTop(+e.target.value)}
              ></Input>
            </div>
          </div>

          <div className=" flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <Label>Зерно випадкової генерації</Label>
              <div className="flex items-center gap-1">
                <Label htmlFor="random">Вибрати випадково?</Label>
                <Checkbox
                  checked={isRandom}
                  onCheckedChange={(checked) => setIsRandom(!!checked)}
                  className="data-[state=checked]:bg-blue-500 border-blue-500"
                  id="random"
                />
              </div>
            </div>
            <Input
              value={randomSeed}
              disabled={isRandom}
              onChange={(e) => setRandomSeed(+e.target.value)}
            ></Input>
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
          {(result.error || !(result?.min == null && result?.max == null)) && (
            <div>
              <Label className="text-red-500">{result.error}</Label>
            </div>
          )}
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
              bestFitness={
                result.min
                  ? result.min_fitness_values
                  : result.max_fitness_values
              }
              worstFitness={
                result.min
                  ? result.max_fitness_values
                  : result.min_fitness_values
              }
              meanFitness={result.mean_fitness_values}
              firstRecordsAmount={firstRecordsToShowCount}
            />
            {result.min != null ? (
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
            <Label className=" self-end text-neutral-600">
              Зерно випадкової генерації: {result.seed} *
            </Label>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
