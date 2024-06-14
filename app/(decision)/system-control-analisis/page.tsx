"use client";

import ResultTable from "@/components/decision/system-control/result-table";
import SystemControlTable from "@/components/decision/system-control/system-control-table";
import SystemRiskTable from "@/components/decision/system-risk/system-risk-table";
import RiskEvaluationView from "@/components/startup/risk/RiskEvaluationView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SystemControlCriteria,
  calcControl,
} from "@/lib/system-control-analisis";
import { SystemRiskCriteria, calcBelongFunc } from "@/lib/system-risk-analisis";
import React, { useState } from "react";

const SystemControlAnalisis = () => {
  const [OR, setOR] = useState<SystemControlCriteria[]>([
    { lingusticValue: "T5", safety: 0.6, weight: 7 },
    { lingusticValue: "T3", safety: 0.8, weight: 8 },
    { lingusticValue: "T4", safety: 0.7, weight: 10 },
    { lingusticValue: "T3", safety: 0.8, weight: 10 },
    { lingusticValue: "T5", safety: 0.9, weight: 9 },

    { lingusticValue: "T4", safety: 0.7, weight: 10 },
  ]);

  const [type, setType] = useState<string>("середня");
  const [threshold, setThreshold] = useState<number>(0.5);

  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const result = calcControl(OR, type);
    setResult(result);
  };

  return (
    <main className="flex flex-row gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div>
        <div className="flex gap-5">
          <div className="flex flex-col w-1/2">
            <h2 className="p-2 font-medium">Тип згортки</h2>
            <Select value={type} onValueChange={(value) => setType(value)}>
              <SelectTrigger>
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
          <div className="flex flex-col  w-1/2">
            <h2 className="p-2 font-medium">Поріг безпеки</h2>
            <Input
              value={threshold}
              onChange={(e) => {
                setThreshold(e.target.value);
              }}
            />
          </div>
        </div>

        <SystemControlTable K={OR} setK={setOR} title="Вхідні дані" />
      </div>

      <div className="flex flex-col gap-4">
        {result && (
          <div>
            <h2 className="p-2 font-medium">
              Оцінка керованості <br /> при різних сценаріях
            </h2>

            <ResultTable finalRes={result} threshold={threshold} />
          </div>
        )}

        <Button className="bg-blue-600 hover:bg-blue-500" onClick={calculate}>
          Аналіз
        </Button>
      </div>
    </main>
  );
};

export default SystemControlAnalisis;
