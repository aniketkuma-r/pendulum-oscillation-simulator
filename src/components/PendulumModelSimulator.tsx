import { Box, Container, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import protectorImg from "../assets/protector.png";
import PendulumComponent from "./PendulumComponent.tsx";
import MenuComponent from "./MenuComponent.tsx";
import Options from "./Options.tsx";
import Controls from "./Controls.tsx";
import EnergyGraph from "./EnergyGraph.tsx";
import Stopwatch from "./Stopwatch.tsx";
import { useAppSelector } from "../app/hooks.ts";
import { SettingsState } from "../features/settings/settingsSlice.ts";
import { PendulumEnum } from "../enums/pendulumEnum.ts";

const PendulumModelSimulator = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const settings = useAppSelector(
    (state: { settings: SettingsState }) => state.settings
  );

  return (
    <Box
      bg="var(--mantine-color-indigo-light)"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* protector  */}
      <Box>
        <Box
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            height: "15rem",
            width: "30rem",
            backgroundImage: `url(${protectorImg})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            transform: isMediumScreen
              ? "translateX(-50%) scale(0.7)"
              : "translateX(-50%)",
            transformOrigin: "top",
            overflow: "hidden",
          }}
        ></Box>
        <Box
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            height: "500px",
            borderLeft: "1px dashed red",
          }}
        />
      </Box>

      <PendulumComponent pendulumName={PendulumEnum.PENDULUM1} />
      {settings.isSecondPendulum && (
        <PendulumComponent pendulumName={PendulumEnum.PENDULUM2} />
      )}

      <ModalsProvider>
        <MenuComponent />
      </ModalsProvider>

      {!isMediumScreen && (
        <Box>
          <Flex
            gap="lg"
            justify="center"
            align="flex-start"
            direction="column"
            wrap="wrap"
            style={{
              height: "100%",
              padding: "1rem",
              position: "fixed",
              left: 0,
            }}
            >
            <Controls />
            <Options />
          </Flex>
          <Flex
            gap="lg"
            // justify="center"
            align="flex-start"
            direction="column"
            wrap="wrap"
            style={{
              height: "100%",
              maxHeight: "100%",
              overflow: "scroll",
              // padding: "1rem",
              position: "fixed",
              right: 0,
            }}
          >
            <EnergyGraph />
          </Flex>
        </Box>
      )}

      {(settings.isStopwatch || !isMediumScreen) && (
        <Container
          bg="var(--mantine-color-indigo-light)"
          style={{
            padding: "1rem 2rem",
            position: "fixed",
            left: "50%",
            bottom: "8rem",
            transform: "translateX(-50%)",
            zIndex: -1
          }}
        >
          <Stopwatch />
        </Container>
      )}
    </Box>
  );
};

export default PendulumModelSimulator;
