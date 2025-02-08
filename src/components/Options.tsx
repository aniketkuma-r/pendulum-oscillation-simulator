import { Box, Paper, Slider, Switch, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getTextByLanguage } from "../utils/PendulumEnumFunction";
import { useAppSelector, useAppDispatch } from "../app/hooks.ts";
import {
  setDragCoefficient,
  SettingsState,
  showFBDs,
} from "../features/settings/settingsSlice";

const Options = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
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
          key: "OPTIONS",
          LanguageId: settings.language,
        })}
      </Text>
      <Box mb={"30px"}>
        <Text mb={isMediumScreen ? 5 : 10}>
          {getTextByLanguage({
            key: "DRAG_COEFFICIENT",
            LanguageId: settings.language,
          })}
        </Text>
        <Slider
          step={0.01}
          min={0}
          max={0.5}
          label={(value) => value.toFixed(2)}
          value={settings.dragCoefficient}
          onChange={(value) => dispatch(setDragCoefficient(value))}
          color="indigo"
          styles={{
            markLabel: {
              color: "black",
              fontSize: isMediumScreen ? "9px" : "12px",
            },
          }}
          radius="xl"
          marks={[
            { value: 0, label: "0" },
            { value: 0.07, label: "0.07" },
            { value: 0.25, label: "0.25" },
            { value: 0.5, label: "0.5" },
          ]}
        />
      </Box>
      <Switch
        mb={10}
        color="indigo"
        checked={settings.isFBDs}
        onChange={(event) => dispatch(showFBDs(event.target.checked))}
        label={getTextByLanguage({
          key: "FREE_BODY_DIAGRAM",
          LanguageId: settings.language,
        })}
      />
    </Paper>
  );
};

export default Options;
