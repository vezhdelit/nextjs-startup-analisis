export type SystemRiskCriteria = {
  lingusticValue: "T1" | "T2" | "T3" | "T4" | "T5";
  credibility: number; // The credibility is in the range [0, 1]
  weight: number;
  normalizedWeight?: number;
  a?: number;
  b?: number;
  belong?: number;
  normalizedBelong?: number;
  individualRate?: number;
};

export const calcBelongFunc = (values: SystemRiskCriteria[]) => {
  values.forEach((value) => {
    if (value.lingusticValue === "T1") {
      value.a = 0;
      value.b = 20;
    } else if (value.lingusticValue === "T2") {
      value.a = 20;
      value.b = 40;
    } else if (value.lingusticValue === "T3") {
      value.a = 40;
      value.b = 60;
    } else if (value.lingusticValue === "T4") {
      value.a = 60;
      value.b = 80;
    } else if (value.lingusticValue === "T5") {
      value.a = 80;
      value.b = 100;
    }
  });

  values.forEach((value) => {
    // if (value.credibility <= 0.5) {
    //   value.belong =
    //     Math.sqrt(value.credibility / 2) * (value.b - value.a) + value.a;
    //   // } else {
    //   //   value.belong =
    //   //     value.b - Math.sqrt((1 - value.credibility) / 2) * (value.b - value.a);
    //   // }
    // } else {
    value.belong = Math.sqrt(value.credibility / 2) * (0 - 100) + 100;
    // }

    value.belong = +value.belong.toFixed(2);
  });

  values.forEach((value) => {
    value.normalizedBelong = value.belong / 100;
  });

  const sumWeights = values.reduce((acc, curr) => acc + curr.weight, 0);

  values.forEach((value) => {
    value.normalizedWeight = +(value.weight / sumWeights).toFixed(3);
  });

  values.forEach((value) => {
    value.individualRate = value.normalizedWeight * (1 - value.normalizedBelong);
  });

  const sumIndividualRates = values.reduce(
    (acc, curr) => acc + curr.individualRate,
    0
  );
  return sumIndividualRates;
};
