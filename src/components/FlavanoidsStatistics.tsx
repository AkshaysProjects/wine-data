import React from "react";
import { WineData } from "../types/types";
import wineData from "../data/wine_data.json";
import { calculateFlavanoidsStats } from "../utils/statistics";
import { Table, TableData } from "@mantine/core";

const FlavanoidStatistics: React.FC = () => {
  const flavanoidsStats = calculateFlavanoidsStats(wineData as WineData[]);

  const flavanoidsData: TableData = {
    head: [
      "Measure",
      ...flavanoidsStats.map((stat) => `Class ${stat.alcohol}`),
    ],
    body: [
      [
        "Flavanoids Mean",
        ...flavanoidsStats.map((stat) => stat.mean.toFixed(3)),
      ],
      [
        "Flavanoids Median",
        ...flavanoidsStats.map((stat) => stat.median.toFixed(3)),
      ],
      [
        "Flavanoids Mode",
        ...flavanoidsStats.map((stat) => stat.mode.toFixed(3)),
      ],
    ],
  };

  return (
    <>
      <Table
        data={flavanoidsData}
        withColumnBorders
        highlightOnHover
        withTableBorder
        mx="auto"
        // maw={2000}
      />
    </>
  );
};

export default FlavanoidStatistics;
