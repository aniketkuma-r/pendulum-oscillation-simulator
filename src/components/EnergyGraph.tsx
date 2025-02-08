import { useMediaQuery } from "@mantine/hooks";
import { useAppSelector } from "../app/hooks";
import { PendulumState } from "../features/pendulum/pendulumSlice";
import {
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Table,
  TableData,
  Text,
} from "@mantine/core";
import { getTextByLanguage } from "../utils/PendulumEnumFunction";
import { SettingsState } from "../features/settings/settingsSlice";
import { BarChart } from "@mantine/charts";
import { useState } from "react";
import "../styles/energyGraph.css";
import { PendulumEnum } from "../enums/pendulumEnum";

const EnergyGraph = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const [pendulumName, setPendulumName] = useState<PendulumEnum>(
    PendulumEnum.PENDULUM1
  );
  const pendulums = useAppSelector(
    (state: { pendulum: PendulumState }) => state.pendulum
  );
  const settings = useAppSelector(
    (state: { settings: SettingsState }) => state.settings
  );
  const pendulum = settings.isSecondPendulum
    ? pendulums[pendulumName]
    : pendulums[PendulumEnum.PENDULUM1];

  const graphData = [
    {
      energy: "energy",
      Potential: pendulum.potentialEnergy,
      Kinetic: pendulum.kineticEnergy,
      Total: pendulum.potentialEnergy + pendulum.kineticEnergy,
    },
  ];
  const tableData: TableData = {
    caption: getTextByLanguage({
      key: "VALUES",
      LanguageId: settings.language,
    }),
    head: ["Variables", "Values"],
    body: [
      ["angle", (pendulum.angle * -180/Math.PI).toFixed(2) + " °"],
      ["Kinetic Energy", pendulum.kineticEnergy.toFixed(2) + " J"],
      ["Potential Energy", pendulum.potentialEnergy.toFixed(2) + " J"],
      ["mg", pendulum.components.mg.toFixed(2) + " N"],
      ["mgcos(θ)", pendulum.components.mgCosTheta.toFixed(2) + " N"],
      ["mgsin(θ)", pendulum.components.mgSinTheta.toFixed(2) + " N"],
      ["Tension", pendulum.components.tension.toFixed(2) + " N"],
    ],
  };

  return (
    <Paper
      withBorder
      style={{
        padding: isMediumScreen ? "7px 8px" : "10px 15px",
        minWidth: "20rem",
        width: "100%,",
      }}
    >
      <Text
        mb={isMediumScreen ? 5 : 20}
        style={{
          fontWeight: 700,
          fontSize: isMediumScreen ? "15px" : "20px",
          textAlign: "center",
        }}
      >
        {getTextByLanguage({
          key: "ENERGY_GRAPH",
          LanguageId: settings.language,
        })}
      </Text>
      <Box>
        <BarChart
          h={400}
          data={graphData}
          dataKey="energy"
          withLegend
          xAxisProps={{ padding: { left: 0, right: 0 } }}
          series={[
            {
              name: "Potential",
              label: getTextByLanguage({
                key: "POTENTIAL_ENERGY",
                LanguageId: settings.language,
              }),
              color: "violet.6",
            },
            {
              name: "Kinetic",
              label: getTextByLanguage({
                key: "KINETIC_ENERGY",
                LanguageId: settings.language,
              }),
              color: "blue.6",
            },
            {
              name: "Total",
              label: getTextByLanguage({
                key: "MECHANICAL_ENERGY",
                LanguageId: settings.language,
              }),
              color: "teal.6",
            },
          ]}
          withTooltip={false}
          withXAxis={false}
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#333",
          }}
        />
      </Box>
      {settings.isSecondPendulum && (
        <>
          <Divider my="xs" />
          <Group gap="xl" grow>
            <Button
              color={pendulums[PendulumEnum.PENDULUM1].color}
              variant={
                pendulumName === PendulumEnum.PENDULUM1 ? "filled" : "light"
              }
              onClick={() => setPendulumName(PendulumEnum.PENDULUM1)}
            >
              {getTextByLanguage({
                key: pendulums[PendulumEnum.PENDULUM1].color.toUpperCase(),
                LanguageId: settings.language,
              })}{" "}
              {getTextByLanguage({
                key: "BALL",
                LanguageId: settings.language,
              })}
            </Button>
            <Button
              color={pendulums[PendulumEnum.PENDULUM2].color}
              variant={
                pendulumName === PendulumEnum.PENDULUM2 ? "filled" : "light"
              }
              onClick={() => setPendulumName(PendulumEnum.PENDULUM2)}
            >
              {getTextByLanguage({
                key: pendulums[PendulumEnum.PENDULUM2].color.toUpperCase(),
                LanguageId: settings.language,
              })}{" "}
              {getTextByLanguage({
                key: "BALL",
                LanguageId: settings.language,
              })}
            </Button>
          </Group>
        </>
      )}
      <Divider my="xs" />
      <Table
        captionSide="top"
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        data={tableData}
      />
    </Paper>
  );
};

export default EnergyGraph;
