export type SystemControlCriteria = {
  lingusticValue: "T1" | "T2" | "T3" | "T4" | "T5";
  safety: number; // The safety is in the range [0, 1]
  weight: number;
  a0?: number;
  a1?: number;
  criteria_rate?: number;
};

export const calcControl = (values: SystemControlCriteria[]) => {
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
    value.criteria_rate = value.a1 * value.safety
  });

  console.log(values);
};