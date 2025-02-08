import { useMediaQuery } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  PendulumState,
  setArmLength,
  setMass,
} from "../features/pendulum/pendulumSlice";
import { Box, Divider, Paper, Slider, Switch, Text } from "@mantine/core";
import { getTextByLanguage } from "../utils/PendulumEnumFunction";
import { PendulumEnum } from "../enums/pendulumEnum.ts";
import {
  SettingsState,
  showSecondPendulum,
} from "../features/settings/settingsSlice";

const Controls = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const { pendulum1, pendulum2 } = useAppSelector(
    (state: { pendulum: PendulumState }) => state.pendulum
  );
  const settings = useAppSelector(
    (state: { settings: SettingsState }) => state.settings
  );
  const dispatch = useAppDispatch();

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
          key: "CONTROLS",
          LanguageId: settings.language,
        })}
      </Text>
      <Switch
        mb={10}
        color="indigo"
        checked={settings.isSecondPendulum}
        onChange={(event) => dispatch(showSecondPendulum(event.target.checked))}
        label={getTextByLanguage({
          key: "TWO_PENDULUMS",
          LanguageId: settings.language,
        })}
      />
      <Box mb={"30px"}>
        <Text mb={isMediumScreen ? 5 : 10}>
          {getTextByLanguage({
            key: "LENGTH",
            LanguageId: settings.language,
          })}{" "}
          (
          {getTextByLanguage({
            key: pendulum1.color.toUpperCase(),
            LanguageId: settings.language,
          })}
          )
        </Text>
        <Slider
          step={10}
          min={200}
          max={600}
          value={pendulum1.armLength}
          onChange={(value) =>
            dispatch(
              setArmLength({ pendulumName: PendulumEnum.PENDULUM1, armLength: value })
            )
          }
          color="indigo"
          styles={{
            markLabel: {
              color: "black",
              fontSize: isMediumScreen ? "9px" : "12px",
            },
          }}
          radius="xl"
          marks={[
            { value: 200, label: "200" },
            { value: 400, label: "400" },
            { value: 600, label: "600" },
          ]}
        />
      </Box>
      <Box mb={"30px"}>
        <Text mb={isMediumScreen ? 5 : 10}>
          {getTextByLanguage({
            key: "MASS",
            LanguageId: settings.language,
          })}{" "}
          (
          {getTextByLanguage({
            key: pendulum1.color.toUpperCase(),
            LanguageId: settings.language,
          })}
          )
        </Text>
        <Slider
          step={5}
          min={10}
          max={100}
          value={pendulum1.mass}
          onChange={(value) =>
            dispatch(setMass({ pendulumName: PendulumEnum.PENDULUM1, mass: value }))
          }
          color="indigo"
          styles={{
            markLabel: {
              color: "black",
              fontSize: isMediumScreen ? "9px" : "12px",
            },
          }}
          radius="xl"
          marks={[
            { value: 10, label: "10" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
      </Box>
      {settings.isSecondPendulum && (
        <>
          <Divider my="md" />
          <Box mb={"30px"}>
            <Text mb={isMediumScreen ? 5 : 10}>
              {getTextByLanguage({
                key: "LENGTH",
                LanguageId: settings.language,
              })}{" "}
              (
              {getTextByLanguage({
                key: pendulum2.color.toUpperCase(),
                LanguageId: settings.language,
              })}
              )
            </Text>
            <Slider
              step={10}
              min={200}
              max={600}
              value={pendulum2.armLength}
              onChange={(value) =>
                dispatch(
                  setArmLength({ pendulumName: PendulumEnum.PENDULUM2, armLength: value })
                )
              }
              color="indigo"
              styles={{
                markLabel: {
                  color: "black",
                  fontSize: isMediumScreen ? "9px" : "12px",
                },
              }}
              radius="xl"
              marks={[
                { value: 200, label: "200" },
                { value: 400, label: "400" },
                { value: 600, label: "600" },
              ]}
            />
          </Box>
          <Box mb={"30px"}>
            <Text mb={isMediumScreen ? 5 : 10}>
              {getTextByLanguage({
                key: "MASS",
                LanguageId: settings.language,
              })}{" "}
              (
              {getTextByLanguage({
                key: pendulum2.color.toUpperCase(),
                LanguageId: settings.language,
              })}
              )
            </Text>
            <Slider
              step={5}
              min={10}
              max={100}
              value={pendulum2.mass}
              onChange={(value) =>
                dispatch(
                  setMass({ pendulumName: PendulumEnum.PENDULUM2, mass: value })
                )
              }
              color="indigo"
              styles={{
                markLabel: {
                  color: "black",
                  fontSize: isMediumScreen ? "9px" : "12px",
                },
              }}
              radius="xl"
              marks={[
                { value: 10, label: "10" },
                { value: 50, label: "50" },
                { value: 100, label: "100" },
              ]}
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Controls;
