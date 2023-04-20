export const MONTHLY_RENTALS_RANGE: { [key: number]: number[] } = {
  [-1]: [undefined, undefined],
  0: [undefined, 10],
  1: [10, 20],
  2: [20, 50],
  3: [50, 100],
  4: [100, 200],
  5: [200, 400],
  6: [400, 800],
  7: [800, undefined],
};
export const PRICES_RANGE: { [key: number]: number[] } = {
  [-1]: [undefined, undefined],
  0: [undefined, 250],
  1: [250, 500],
  2: [500, 1000],
  3: [1000, 2500],
  4: [2500, undefined],
};
export const AREAS_RANGE: { [key: number]: number[] } = {
  [-1]: [undefined, undefined],
  0: [undefined, 100],
  1: [100, 250],
  2: [250, 500],
  3: [500, undefined],
};
export const FRONT_WIDTH_RANGE: { [key: number]: number[] } = {
  [-1]: [undefined, undefined],
  0: [undefined, 5],
  1: [5, 7.5],
  2: [7.5, 15],
  3: [15, 25],
  4: [25, undefined],
};
