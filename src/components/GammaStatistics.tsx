import React from "react";
import { WineData } from "../types/types";
import wineData from "../data/wine_data.json";
import { calculateGammaStats } from "../utils/statistics";
import { Table, TableData } from "@mantine/core";

const GammaStatistics: React.FC = () => {
  const gammaStats = calculateGammaStats(wineData as WineData[]);

  const gammaData: TableData = {
    head: ["Measure", ...gammaStats.map((stat) => `Class ${stat.alcohol}`)],
    body: [
      ["Gamma Mean", ...gammaStats.map((stat) => stat.mean.toFixed(3))],
      ["Gamma Median", ...gammaStats.map((stat) => stat.median.toFixed(3))],
      ["Gamma Mode", ...gammaStats.map((stat) => stat.mode.toFixed(3))],
    ],
  };

  return (
    <>
      <Table
        data={gammaData}
        withColumnBorders
        highlightOnHover
        withTableBorder
        mx="auto"
      />
    </>
  );
};

export default GammaStatistics;
