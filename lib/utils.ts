import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateValuation = (
  G: number[],
  A: number[],
  B: number[],
  T: number[],
  U: number[],
  P: number[]
) => {
  const fG = membershipFunc(G, A, B);
  const fT = membershipFunc(T, A, B);
  const Uj = defineTerms(fG, fT);
  const uUj = termU(fG, fT, Uj);
  const uO = maxAB(Uj, uUj, U);

  return {
    fG: fG,
    fT: fT,
    Uj: Uj,
    uUj: uUj,
    uO: uO,
  };
};

export const membershipFunc = (G: number[], A: number[], B: number[]) => {
  return G.map((gi, index) => {
    const a = A[index];
    const b = B[index];

    let res: number;

    if (gi <= a) {
      res = 0;
    } else if (gi <= (a + b) / 2) {
      res = 2 * Math.pow((gi - a) / (b - a), 2);
    } else if (gi <= b) {
      res = 1 - 2 * Math.pow((b - gi) / (b - a), 2);
    } else {
      res = 1;
    }

    return +res.toFixed(2);
  });
};

export const defineTerms = (fG: number[], fT: number[]) => {
  return fG.map((x, index) => {
    const a = fT[index];
    let res;

    if (x <= a - a / 2) {
      res = [1];
    } else if (a - a / 2 < x && x <= a - a / 4) {
      res = [1, 2];
    } else if (a - a / 4 < x && x <= a) {
      res = [2, 3];
    } else if (a < x && x <= a + a / 4) {
      res = [3, 4];
    } else if (a + a / 4 < x && x <= a + a / 2) {
      res = [4, 5];
    } else {
      res = [5];
    }

    return res;
  });
};

export const termU = (fG: number[], fT: number[], Uj: number[][]) => {
  return Uj.map((values, index) => {
    const x = fG[index];
    const a = fT[index];
    let res = new Array();

    values.map((term) => {
      switch (term) {
        case 1:
          //U1
          if (x <= a - a / 2) {
            res.push(1);
          } else if (x <= a - a / 4) {
            res.push(((3 * a - 4 * x) / a).toFixed(2));
          }
          break;

        case 2:
          //U2
          if (a - a / 2 < x && x <= a - a / 4) {
            res.push(((4 * x - 2 * a) / a).toFixed(2));
          } else if (a - a / 4 < x && x <= a) {
            res.push(((4 * a - 4 * x) / a).toFixed(2));
          }
          break;

        case 3:
          //U3
          if (a - a / 4 < x && x <= a) {
            res.push(((4 * x - 3 * a) / a).toFixed(2));
          } else if (a < x && x <= a + a / 4) {
            res.push(((5 * a - 4 * x) / a).toFixed(2));
          }
          break;

        case 4:
          //U4
          if (a < x && x <= a + a / 4) {
            res.push(((4 * x - 4 * a) / a).toFixed(2));
          } else if (a + a / 4 < x && x <= a + a / 2) {
            res.push(((6 * a - 4 * x) / a).toFixed(2));
          }
          break;

        case 5:
          //U5
          if (a + a / 4 < x && x <= a + a / 2) {
            res.push(((4 * x - 5 * a) / a).toFixed(2));
          } else if (x >= a + a / 2) {
            res.push(1);
          }
          break;
        default:
          alert("Error. fUj is Out of bounds");
          break;
      }
    });

    return res;
  });
};

export const maxAB = (Uj: number[][], uUj: number[][], UjStar: number[]) => {
  const res = UjStar.map((_, index) => {
    let A;
    if (Uj[index][0] === UjStar[index]) {
      A = uUj[index][0];
    } else if (Uj[index][1] === UjStar[index]) {
      A = uUj[index][1];
    } else {
      A = 0;
    }

    let B;
    if (Uj[index][0] + 1 === UjStar[index]) {
      B = uUj[index][0] / 2;
    } else {
      B = 0;
    }

    return A > B ? A : B;
  });

  return res;
};
