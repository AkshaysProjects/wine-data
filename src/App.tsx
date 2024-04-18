import React from "react";
import FlavanoidStatistics from "./components/FlavanoidsStatistics";
import GammaStatistics from "./components/GammaStatistics";
import { Container, Text } from "@mantine/core";

function App() {
  return (
    <Container>
      <Text size="xl" mt={25}>
        Flavanoid Statistics
      </Text>
      <FlavanoidStatistics />
      <Text size="xl" mt={25}>
        Gamma Statistics
      </Text>
      <GammaStatistics />
    </Container>
  );
}

export default App;
