import React from "react";
import { Label } from "@/components/ui/label";
import {
  FaFaceGrin,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceFrown,
  FaFaceDizzy,
} from "react-icons/fa6";

interface TeamEvaluationViewProps {
  finalRes: number;
}

const getEvaluationText = (finalRes: number) => {
  if (finalRes >= 0.87) {
    return {
      text: "дуже високий рейтинг команди",
      color: "text-green-600",
      icon: FaFaceGrin,
    };
  } else if (finalRes >= 0.67) {
    return {
      text: "високий рейтинг команди",
      color: "text-lime-600",
      icon: FaFaceSmile,
    };
  } else if (finalRes >= 0.36) {
    return {
      text: "середній рейтинг команди",
      color: "text-yellow-600",
      icon: FaFaceMeh,
    };
  } else if (finalRes >= 0.21) {
    return {
      text: "низький рейтинг команди",
      color: "text-orange-600",
      icon: FaFaceFrown,
    };
  } else {
    return {
      text: "дуже низький рейтинг команди",
      color: "text-red-600",
      icon: FaFaceDizzy,
    };
  }
};

const TeamEvaluationView = ({ finalRes }: TeamEvaluationViewProps) => {
  const evaluationText = getEvaluationText(finalRes);
  const IconComponent = evaluationText.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <IconComponent className={` h-32 w-32 ${evaluationText.color}`} />

      <div className="flex flex-col gap-2">
        <Label className=" text-center text-xl font-bold">
          <span className={` ${evaluationText.color}  font-bold underline`}>
            {evaluationText.text}
          </span>
        </Label>
        <Label className="text-center text-lg ">
          Оцінка:{" "}
          <span className=" text-blue-600 font-bold underline">{finalRes}</span>
        </Label>
      </div>
    </div>
  );
};

export default TeamEvaluationView;
