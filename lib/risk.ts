import { Criteria, TermU } from "@/types";

export const riskEvaluation = (
  OR: Criteria[],
  IR: Criteria[],
  FR: Criteria[],
  IAR: Criteria[]
) => {
  const uOR = termK(OR);
  const uIR = termK(IR);
  const uFR = termK(FR);
  const uIAR = termK(IAR);

  const xOR = generalRiskEvaluation(uOR);
  const xIR = generalRiskEvaluation(uIR);
  const xFR = generalRiskEvaluation(uFR);
  const xIAR = generalRiskEvaluation(uIAR);

  const zOR = +(xOR / 100).toFixed(2);
  const zIR = +(xIR / 100).toFixed(2);
  const zFR = +(xFR / 100).toFixed(2);
  const zIAR = +(xIAR / 100).toFixed(2);

  const finalRes = (4 - zOR - zIR - zFR - zIAR) / 4;

  return {
    uOR: uOR,
    uIR: uIR,
    uFR: uFR,
    uIAR: uIAR,
    xOR: xOR,
    xIR: xIR,
    xFR: xFR,
    xIAR: xIAR,
    zOR: zOR,
    zIR: zIR,
    zFR: zFR,
    zIAR: zIAR,
    finalRes: finalRes,
  };
};

export const termK = (K: Criteria[]) => {
  let H = 0;
  let HSum = 0;
  let HC = 0;
  let HCSum = 0;
  let C = 0;
  let CSum = 0;
  let BC = 0;
  let BCSum = 0;
  let B = 0;
  let BSum = 0;
  let count = 0;

  K.map(({ lingusticValue, credibility }) => {
    count += 1;

    if (lingusticValue === "H") {
      H += 1;
      HSum += credibility;
    } else if (lingusticValue === "HC") {
      HC += 1;
      HCSum += credibility;
    } else if (lingusticValue === "C") {
      C += 1;
      CSum += credibility;
    } else if (lingusticValue === "BC") {
      BC += 1;
      BCSum += credibility;
    } else if (lingusticValue === "B") {
      B += 1;
      BSum += credibility;
    }
  });

  if (H >= count * 0.6 && BC === 0 && B === 0) {
    return {
      lingusticValue: "H",
      aggregatedValue: +((1 / H) * HSum).toFixed(2),
    };
  } else if (HC >= count * 0.6 && BC === 0 && B === 0) {
    return {
      lingusticValue: "HC",
      aggregatedValue: +((1 / HC) * HCSum).toFixed(2),
    };
  } else if (C >= count * 0.6 && B === 0) {
    return {
      lingusticValue: "C",
      aggregatedValue: +((1 / C) * CSum).toFixed(2),
    };
  } else if (BC >= count * 0.6) {
    return {
      lingusticValue: "BC",
      aggregatedValue: +((1 / BC) * BCSum).toFixed(2),
    };
  } else {
    return {
      lingusticValue: "B",
      aggregatedValue: +((1 / B) * BSum).toFixed(2),
    };
  }
};

const getRange = (uL: string) => {
  let res: number[];
  switch (uL) {
    case "H":
      res = [0, 20];
      break;
    case "HC":
      res = [20, 40];
      break;
    case "C":
      res = [40, 60];
      break;
    case "BC":
      res = [60, 80];
      break;
    case "B":
      res = [80, 100];
      break;
    default:
      res = [0, 20];
      break;
  }
  return res;
};

export const generalRiskEvaluation = (uK: TermU) => {
  const rangeAB = getRange(uK.lingusticValue);

  if (uK.aggregatedValue <= 0.5) {
    return +(
      Math.sqrt(uK.aggregatedValue / 2) * (rangeAB[1] - rangeAB[0]) +
      rangeAB[0]
    ).toFixed(2);
  } else {
    return +(
      rangeAB[1] -
      Math.sqrt((1 - uK.aggregatedValue) / 2) * (rangeAB[1] - rangeAB[0])
    ).toFixed(2);
  }
};
