"use client";
import { useState, useEffect } from "react";
import { Criteria, TermU } from "@/types";
import { Button } from "@/components/ui/button";
import { riskEvaluation } from "@/lib/risk";
import RiskInputTables from "@/components/startup/risk/RiskInputTables";
import RiskUTable from "@/components/startup/risk/RiskUTable";
import GeneralRiskTable from "@/components/startup/risk/GeneralRiskTable";
import RiskEvaluationView from "@/components/startup/risk/RiskEvaluationView";

const RiskAnalisisPage = () => {
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const [OR, setOR] = useState<Criteria[]>([
    { lingusticValue: "H", credibility: 0.8 },
    { lingusticValue: "H", credibility: 0.7 },
    { lingusticValue: "HC", credibility: 0.9 },

    { lingusticValue: "H", credibility: 0.6 },
    { lingusticValue: "H", credibility: 0.7 },
    { lingusticValue: "H", credibility: 0.5 },

    { lingusticValue: "HC", credibility: 0.7 },
    { lingusticValue: "C", credibility: 0.8 },
    { lingusticValue: "H", credibility: 0.9 },
  ]);

  const [IR, setIR] = useState<Criteria[]>([
    { lingusticValue: "HC", credibility: 0.7 },
    { lingusticValue: "H", credibility: 0.5 },
    { lingusticValue: "C", credibility: 0.6 },

    { lingusticValue: "HC", credibility: 0.8 },
    { lingusticValue: "HC", credibility: 0.9 },
  ]);

  const [FR, setFR] = useState<Criteria[]>([
    { lingusticValue: "HC", credibility: 0.3 },
    { lingusticValue: "HC", credibility: 0.6 },
    { lingusticValue: "HC", credibility: 0.2 },

    { lingusticValue: "H", credibility: 0.7 },
    { lingusticValue: "H", credibility: 0.6 },
  ]);

  const [IAR, setIAR] = useState<Criteria[]>([
    { lingusticValue: "H", credibility: 0.8 },
    { lingusticValue: "H", credibility: 0.9 },
    { lingusticValue: "HC", credibility: 0.1 },

    { lingusticValue: "HC", credibility: 0.7 },
    { lingusticValue: "HC", credibility: 0.6 },
  ]);

  const [uOR, setuOR] = useState<TermU>();
  const [uIR, setuIR] = useState<TermU>();
  const [uFR, setuFR] = useState<TermU>();
  const [uIAR, setuIAR] = useState<TermU>();

  const [xOR, setxOR] = useState<number>();
  const [xIR, setxIR] = useState<number>();
  const [xFR, setxFR] = useState<number>();
  const [xIAR, setxIAR] = useState<number>();

  const [zOR, setzOR] = useState<number>();
  const [zIR, setzIR] = useState<number>();
  const [zFR, setzFR] = useState<number>();
  const [zIAR, setzIAR] = useState<number>();

  const [finalRes, setFinalRes] = useState<number>();

  const calculate = () => {
    const res = riskEvaluation(OR, IR, FR, IAR);

    setuOR(res.uOR);
    setuIR(res.uIR);
    setuFR(res.uFR);
    setuIAR(res.uIAR);

    setxOR(res.xOR);
    setxIR(res.xIR);
    setxFR(res.xFR);
    setxIAR(res.xIAR);

    setzOR(res.zOR);
    setzIR(res.zIR);
    setzFR(res.zFR);
    setzIAR(res.zIAR);

    setFinalRes(res.finalRes);

    setIsCalculated(true);
  };

  const defaultValues = () => {
    setOR([
      { lingusticValue: "H", credibility: 0.8 },
      { lingusticValue: "H", credibility: 0.7 },
      { lingusticValue: "HC", credibility: 0.9 },

      { lingusticValue: "H", credibility: 0.6 },
      { lingusticValue: "H", credibility: 0.7 },
      { lingusticValue: "H", credibility: 0.5 },

      { lingusticValue: "HC", credibility: 0.7 },
      { lingusticValue: "C", credibility: 0.8 },
      { lingusticValue: "H", credibility: 0.9 },
    ]);

    setIR([
      { lingusticValue: "HC", credibility: 0.7 },
      { lingusticValue: "H", credibility: 0.5 },
      { lingusticValue: "C", credibility: 0.6 },

      { lingusticValue: "HC", credibility: 0.8 },
      { lingusticValue: "HC", credibility: 0.9 },
    ]);

    setFR([
      { lingusticValue: "HC", credibility: 0.3 },
      { lingusticValue: "HC", credibility: 0.6 },
      { lingusticValue: "HC", credibility: 0.2 },

      { lingusticValue: "H", credibility: 0.7 },
      { lingusticValue: "H", credibility: 0.6 },
    ]);

    setIAR([
      { lingusticValue: "H", credibility: 0.8 },
      { lingusticValue: "H", credibility: 0.9 },
      { lingusticValue: "HC", credibility: 0.1 },

      { lingusticValue: "HC", credibility: 0.7 },
      { lingusticValue: "HC", credibility: 0.6 },
    ]);

    setIsCalculated(false);
  };

  const clearValues = () => {
    setOR([
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },

      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },

      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
    ]);

    setIR([
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },

      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
    ]);

    setFR([
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },

      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
    ]);

    setIAR([
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },

      { lingusticValue: "H", credibility: 0 },
      { lingusticValue: "H", credibility: 0 },
    ]);
    setIsCalculated(false);
  };

  useEffect(() => {
    isCalculated && calculate();
  }, [OR, IR, FR, IAR]);

  return (
    <main className="flex flex-col gap-8 min-h-[80vh] items-center justify-center p-8 pb-16">
      <div className="flex flex-row gap-6">
        <RiskInputTables K={OR} setK={setOR} title="Операційні ризики(OR)" />
        <RiskInputTables K={IR} setK={setIR} title="Інвестиційні ризики(IR)" />
        <RiskInputTables K={FR} setK={setFR} title="Фінансові ризики(FR)" />
        <RiskInputTables
          K={IAR}
          setK={setIAR}
          title="Ризики Інноваційної діяльності(IAR)"
        />
      </div>

      <div className="flex flex-row gap-2">
        <Button variant={"destructive"} onClick={clearValues}>
          Очистити
        </Button>
        <Button onClick={defaultValues}>Дані за замовчуванням</Button>
        <Button className="bg-blue-600 hover:bg-blue-500" onClick={calculate}>
          Аналіз
        </Button>
      </div>
      <div className="flex flex-row gap-6">
        {isCalculated &&
          uOR &&
          uIR &&
          uFR &&
          uOR &&
          xOR &&
          xIR &&
          xFR &&
          xIAR &&
          zOR &&
          zIR &&
          zFR &&
          zIAR &&
          finalRes && (
            <>
              <RiskUTable
                uOR={uOR}
                uIR={uIR}
                uFR={uFR}
                uIAR={uIAR}
                title="Результуючі терм оцінки"
              />
              <GeneralRiskTable
                xOR={xOR}
                xIR={xIR}
                xFR={xFR}
                xIAR={xIAR}
                zOR={zOR}
                zIR={zIR}
                zFR={zFR}
                zIAR={zIAR}
                title="Загальний ризик по критеріям"
              />
              <RiskEvaluationView finalRes={finalRes} />
            </>
          )}
      </div>
    </main>
  );
};

export default RiskAnalisisPage;
