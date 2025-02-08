import { Group, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks.ts";
import { SettingsState } from "../features/settings/settingsSlice.ts";

const Stopwatch = () => {
  const settings = useAppSelector(
    (state: { settings: SettingsState }) => state.settings
  );
  const [milliseconds, setMilliseconds] = useState<number>(0);

  useEffect(() => {
    if (settings.isReset) setMilliseconds(0);
    let interval: number;
    if (settings.isOn) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 50); // Update every 50ms
        // Running an interval every 1ms can be heavy on performance,
        // This means that updating state every 1ms might lead to inconsistent values
        // the state might not be updated immediately.
        // that's why updating at a slower frequency 50ms
      }, 50 / settings.playbackSpeed);
    }

    return () => clearInterval(interval);
  }, [settings.isOn, settings.isReset, settings.playbackSpeed]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${("0" + minutes).slice(-2)} :
    ${("0" + remainingSeconds).slice(-2)}`;
  };
  return (
    <Group justify="center" align="flex-end" gap={1}>
      <Text c="indigo" size="xl" fw={500}>
        {formatTime(milliseconds)}
      </Text>
      <Text c="indigo" size="xs">
        {("00" + (milliseconds % 1000)).slice(-3)}
      </Text>
    </Group>
  );
};

export default Stopwatch;
