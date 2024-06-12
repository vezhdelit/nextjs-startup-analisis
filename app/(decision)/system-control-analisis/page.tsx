"use client";

import SystemControlTable from "@/components/decision/system-control/system-control-table";
import SystemRiskTable from "@/components/decision/system-risk/system-risk-table";
import RiskEvaluationView from "@/components/startup/risk/RiskEvaluationView";
import { Button } from "@/components/ui/button";
import { SystemControlCriteria, calcControl } from "@/lib/system-control-analisis";
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

  const [result, setResult] = useState<number>(0);

  const calculate = () => {
    const result = calcControl(OR);
    setResult(1);
  };

  return (
    <main className="flex flex-row gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div>
        <SystemControlTable K={OR} setK={setOR} title="Вхідні дані" />
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <RiskEvaluationView finalRes={result} />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500" onClick={calculate}>
          Аналіз
        </Button>
      </div>
    </main>
  );
};

export default SystemControlAnalisis;
