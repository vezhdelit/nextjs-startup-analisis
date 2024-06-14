export type SystemControlCriteria = {
  lingusticValue: "T1" | "T2" | "T3" | "T4" | "T5";
  safety: number; // The safety is in the range [0, 1]
  weight: number;
  normalizedWeight?: number;
  a0?: number;
  a1?: number;
  criteria_rate?: number;
  u?: number;
};

export const calcControl = (
  values: SystemControlCriteria[],
  rateType: string
) => {
  values.forEach((value) => {
    if (value.lingusticValue === "T1") {
      value.a0 = 0;
      value.a1 = 20;
    } else if (value.lingusticValue === "T2") {
      value.a0 = 20;
      value.a1 = 40;
    } else if (value.lingusticValue === "T3") {
      value.a0 = 40;
      value.a1 = 60;
    } else if (value.lingusticValue === "T4") {
      value.a0 = 60;
      value.a1 = 80;
    } else if (value.lingusticValue === "T5") {
      value.a0 = 80;
      value.a1 = 100;
    }
  });

  values.forEach((value) => {
    value.criteria_rate = value.a1 * value.safety;
  });

  const sumWeights = values.reduce((acc, curr) => acc + curr.weight, 0);
  values.forEach((value) => {
    value.normalizedWeight = +(value.weight / sumWeights).toFixed(3);
  });

  const A0 = 0;
  const AL = 100;

  values.forEach((value) => {
    if (value.criteria_rate <= A0) {
      value.u = 0;
    } else if (
      A0 < value.criteria_rate &&
      value.criteria_rate <= (A0 + AL) / 2
    ) {
      value.u = 2 * Math.pow((value.criteria_rate - A0) / (AL - A0), 2);
    } else if (
      (A0 + AL) / 2 < value.criteria_rate &&
      value.criteria_rate <= AL
    ) {
      value.u = 1 - 2 * Math.pow((AL - value.criteria_rate) / (AL - A0), 2);
    } else {
      value.u = 1;
    }
  });

  const averageRate = values.reduce(
    (acc, curr) => acc + curr.u * curr.normalizedWeight,
    0
  );

  let optimisticRate = values.reduce(
    (acc, curr) => acc + curr.normalizedWeight * curr.u * curr.u,
    0
  );
  optimisticRate = Math.sqrt(optimisticRate);

  let pessimisticRate = values.reduce(
    (acc, curr) => acc + curr.normalizedWeight / curr.u,
    0
  );
  pessimisticRate = 1 / pessimisticRate;

  const carefullRate = values.reduce(
    (acc, curr) => acc * Math.pow(curr.u, curr.normalizedWeight),
    1
  );

  let chosenRate = 0;
  if (rateType === "оптимістична") {
    chosenRate = optimisticRate;
  } else if (rateType === "песимістична") {
    chosenRate = pessimisticRate;
  } else if (rateType === "середня") {
    chosenRate = averageRate;
  } else if (rateType === "обережна") {
    chosenRate = carefullRate;
  }

  const R = chosenRate * (100 - 0) + 0;
  const Uc1 = 1 - Math.pow((R - 0) / (100 - 0), 2);
  const Uc2 = 1 - Math.pow((R - 0) / (100 - 0), 7 / 4);
  const Uc3 = 1 - Math.pow((R - 0) / (100 - 0), 3 / 2);
  const Uc4 = 1 - Math.pow((R - 0) / (100 - 0), 5 / 4);
  const Uc5 = 1 - Math.pow((R - 0) / (100 - 0), 3 / 4);
  const Uc6 = 1 - Math.pow((R - 0) / (100 - 0), 1 / 2);
  const Uc7 = 1 - Math.pow((R - 0) / (100 - 0), 1 / 4);
  const Uc8 = 1 - Math.pow((R - 0) / (100 - 0), 1 / 8);

  return {
    Uc1: Uc1.toFixed(3),
    Uc2: Uc2.toFixed(3),
    Uc3: Uc3.toFixed(3),
    Uc4: Uc4.toFixed(3),
    Uc5: Uc5.toFixed(3),
    Uc6: Uc6.toFixed(3),
    Uc7: Uc7.toFixed(3),
    Uc8: Uc8.toFixed(3),
  };
};
