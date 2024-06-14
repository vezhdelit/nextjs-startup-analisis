import React from "react";
import { Label } from "@/components/ui/label";
import {
  FaFaceGrin,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceFrown,
  FaFaceDizzy,
} from "react-icons/fa6";

interface RiskEvaluationViewProps {
  finalRes: number;
}

const getEvaluationText = (finalRes: number) => {
  if (finalRes >= 0.81) {
    return {
      text: "низький рівень ризику функціонування системи",
      color: "text-green-600",
      icon: FaFaceGrin,
    };
  } else if (finalRes >= 0.61) {
    return {
      text: "рівень ризику функціонування системи нижче середнього",
      color: "text-lime-600",
      icon: FaFaceSmile,
    };
  } else if (finalRes >= 0.41) {
    return {
      text: "середній рівень ризику функціонування системи",
      color: "text-yellow-600",
      icon: FaFaceMeh,
    };
  } else if (finalRes >= 0.21) {
    return {
      text: "рівень ризику функціонування системи вище середнього",
      color: "text-orange-600",
      icon: FaFaceFrown,
    };
  } else {
    return {
      text: "високий рівень ризику функціонування системи",
      color: "text-red-600",
      icon: FaFaceDizzy,
    };
  }
};

const ResultView = ({ finalRes }: RiskEvaluationViewProps) => {
  const evaluationText = getEvaluationText(finalRes);
  const IconComponent = evaluationText.icon;

  if (!finalRes) return null;
  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-md">
      <IconComponent className={` h-32 w-32 ${evaluationText.color}`} />

      <div className="flex flex-col gap-2">
        <Label className=" text-center text-xl font-bold">
          <span className={` ${evaluationText.color}  font-bold underline`}>
            {evaluationText.text}
          </span>
        </Label>
        <Label className="text-center text-lg">
          Оцінка:{" "}
          <span className=" text-blue-600 font-bold underline">{finalRes.toFixed(3)}</span>
        </Label>
      </div>
    </div>
  );
};

export default ResultView;
