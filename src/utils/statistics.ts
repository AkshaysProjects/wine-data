import { WineData } from "../types/types";

// Define the interfaces for statistical data
interface Stats {
  mean: number;
  median: number;
  mode: number;
}

export interface AlcoholStats extends Stats {
  alcohol: number;
}

// Function to calculate statistics (mean, median, mode)
const calculateStats = (data: number[]): Stats => {
  // Calculate the sum of values
  const sum = data.reduce((acc, curr) => acc + curr, 0);

  // Sort the values to calculate the median
  const sortedValues = data.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);
  const median =
    sortedValues.length % 2 === 0
      ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
      : sortedValues[middle];

  // Calculate mode
  const modeMap = new Map<number, number>();
  let modeValue = 0;
  let maxCount = 0;

  data.forEach((value) => {
    const count = (modeMap.get(value) || 0) + 1;
    modeMap.set(value, count);
    if (count > maxCount) {
      maxCount = count;
      modeValue = value;
    }
  });

  // Calculate mean
  const mean = sum / data.length;

  return {
    mean,
    median,
    mode: modeValue,
  };
};

// Function to calculate statistics for flavanoids
export const calculateFlavanoidsStats = (
  wineData: WineData[]
): AlcoholStats[] => {
  // Map to store flavanoids values grouped by alcohol content
  const alcoholFlavanoids = new Map<number, number[]>();

  // Group flavanoids values by alcohol content
  wineData.forEach((wine) => {
    const { Alcohol, Flavanoids } = wine;
    const existingValues = alcoholFlavanoids.get(Alcohol) || [];
    alcoholFlavanoids.set(Alcohol, [...existingValues, Flavanoids]);
  });

  // Array to store calculated statistics
  const flavanoidsStats: AlcoholStats[] = [];

  // Calculate statistics for each alcohol content
  alcoholFlavanoids.forEach((values, alcohol) => {
    flavanoidsStats.push({
      alcohol,
      ...calculateStats(values.map((value) => Number(value))),
    });
  });

  return flavanoidsStats;
};

// Function to calculate statistics for gamma values
export const calculateGammaStats = (wineData: WineData[]): AlcoholStats[] => {
  // Map to store gamma values grouped by alcohol content
  const gammaValues = new Map<number, number[]>();

  // Calculate Gamma values for each wine
  wineData.forEach((wine) => {
    const { Alcohol, Ash, Hue, Magnesium } = wine;
    const gamma = (Ash * Hue) / Magnesium;
    const existingValues = gammaValues.get(Alcohol) || [];
    gammaValues.set(Alcohol, [...existingValues, gamma]);
  });

  // Array to store calculated statistics
  const gammaStats: AlcoholStats[] = [];

  // Calculate statistics for each alcohol content
  gammaValues.forEach((values, alcohol) => {
    gammaStats.push({
      alcohol,
      ...calculateStats(values),
    });
  });

  return gammaStats;
};
