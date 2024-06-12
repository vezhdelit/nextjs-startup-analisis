"use client";

import SystemRiskTable from "@/components/decision/system-risk/system-risk-table";
import RiskEvaluationView from "@/components/startup/risk/RiskEvaluationView";
import { Button } from "@/components/ui/button";
import { SystemRiskCriteria, calcBelongFunc } from "@/lib/system-risk-analisis";
import React, { useState } from "react";

const SystemRiskAnalisis = () => {
  const [OR, setOR] = useState<SystemRiskCriteria[]>([
    { lingusticValue: "T5", credibility: 0.9, weight: 10 },
    { lingusticValue: "T3", credibility: 0.8, weight: 8 },
    { lingusticValue: "T2", credibility: 0.7, weight: 7 },
    { lingusticValue: "T1", credibility: 0.8, weight: 7 },
    { lingusticValue: "T2", credibility: 0.6, weight: 7 },

    { lingusticValue: "T4", credibility: 0.7, weight: 8 },
    { lingusticValue: "T3", credibility: 0.8, weight: 9 },
    { lingusticValue: "T2", credibility: 0.8, weight: 7 },
    { lingusticValue: "T3", credibility: 0.9, weight: 9 },
    { lingusticValue: "T3", credibility: 0.7, weight: 10 },

    { lingusticValue: "T3", credibility: 0.5, weight: 7 },
    { lingusticValue: "T1", credibility: 0.8, weight: 6 },
  ]);

  const [result, setResult] = useState<number>(0);

  const calculate = () => {
    const res = calcBelongFunc(OR);
    setResult(res);
  };

  return (
    <main className="flex flex-row gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div>
        <SystemRiskTable K={OR} setK={setOR} title="Вхідні дані" />
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

export default SystemRiskAnalisis;
