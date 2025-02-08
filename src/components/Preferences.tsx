import { Box, Button, Group, Tabs, Text } from "@mantine/core";
import { getTextByLanguage } from "../utils/PendulumEnumFunction";
import { Language } from "../enums/language";
import { modals } from "@mantine/modals";
import { useAppSelector, useAppDispatch } from "../app/hooks.ts";
import {
  setLanguage,
  SettingsState,
} from "../features/settings/settingsSlice.ts";

const Preferences = () => {
  const settings = useAppSelector(
    (state: { settings: SettingsState }) => state.settings
  );
  const dispatch = useAppDispatch();
  return (
    <Box style={{ height: "70%", width: "100%" }}>
      <Tabs defaultValue="OVERVIEW">
        <Tabs.List>
          <Tabs.Tab value="OVERVIEW">
            {getTextByLanguage({
              key: "OVERVIEW",
              LanguageId: settings.language,
            })}
          </Tabs.Tab>
          <Tabs.Tab value="LANGUAGES">
            {getTextByLanguage({
              key: "LANGUAGES",
              LanguageId: settings.language,
            })}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="OVERVIEW" pt="lg">
          <Text>
            {getTextByLanguage({
              key: "PREFERENCE_CONTENT",
              LanguageId: settings.language,
            })}
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="LANGUAGES" pt="lg">
          <Group gap="xl" grow>
            <Button
              variant={
                settings.language === Language.ENGLISH ? "fill" : "light"
              }
              onClick={() => {
                dispatch(setLanguage(Language.ENGLISH));
                modals.closeAll();
              }}
            >
              English
            </Button>
            <Button
              variant={settings.language === Language.HINDI ? "fill" : "light"}
              onClick={() => {
                dispatch(setLanguage(Language.HINDI));
                modals.closeAll();
              }}
            >
              हिंदी
            </Button>
          </Group>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Preferences;
