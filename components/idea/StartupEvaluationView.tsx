import React from "react";
import { Label } from "../ui/label";
import {
  FaFaceGrin,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceFrown,
  FaFaceDizzy,
} from "react-icons/fa6";

interface startupEvaluation {
  finalRes: number;
}

const getEvaluationText = (finalRes: number) => {
  if (finalRes >= 0.67) {
    return { text: "відмінна", color: "text-green-600", icon: FaFaceGrin };
  } else if (finalRes >= 0.47) {
    return { text: "добра", color: "text-lime-600", icon: FaFaceSmile };
  } else if (finalRes >= 0.36) {
    return { text: "середня", color: "text-yellow-600", icon: FaFaceMeh };
  } else if (finalRes >= 0.21) {
    return { text: "низька", color: "text-orange-600", icon: FaFaceFrown };
  } else {
    return { text: "погана", color: "text-red-600", icon: FaFaceDizzy };
  }
};

const StartupEvaluationView = ({ finalRes }: startupEvaluation) => {
  const evaluationText = getEvaluationText(finalRes);
  const IconComponent = evaluationText.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <IconComponent className={` h-48 w-48 ${evaluationText.color}`} />
      <Label className=" text-center text-xl font-bold">
        Оцінка ідеї стартапу{" "}
        <span className={` ${evaluationText.color}  font-bold underline`}>
          {evaluationText.text}
        </span>
      </Label>
      <Label className="text-center text-lg">
        Оцінка:{" "}
        <span className=" text-blue-600 font-bold underline">{finalRes}</span>
      </Label>
    </div>
  );
};

export default StartupEvaluationView;
