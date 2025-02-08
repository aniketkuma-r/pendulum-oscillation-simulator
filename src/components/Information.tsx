import { Box, Tabs, Text } from "@mantine/core";
import { getTextByLanguage } from "../utils/PendulumEnumFunction";
import { Language } from "../enums/language";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAppSelector } from "../app/hooks.ts";
import { SettingsState } from "../features/settings/settingsSlice.ts";

const Information = () => {
  const language = useAppSelector(
    (state: { settings: SettingsState }) => state.settings.language
  );
  const [theoryContent, setTheoryContent] = useState("");
  useEffect(() => {
    let filePath = "";
    switch (language) {
      case Language.ENGLISH:
        filePath = "/theoryInEnglish.md";
        break;
      case Language.HINDI:
        filePath = "/theoryInHindi.md";
        break;

      default:
        break;
    }
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => setTheoryContent(data))
      .catch((error) => console.error("Error fetching markdown:", error));
  }, []);

  return (
    <Box>
      <Tabs defaultValue="DESCRIPTION">
        <Tabs.List>
          <Tabs.Tab value="DESCRIPTION">
            {getTextByLanguage({
              key: "DESCRIPTION",
              LanguageId: language,
            })}
          </Tabs.Tab>
          <Tabs.Tab value="THEORY">
            {getTextByLanguage({
              key: "THEORY",
              LanguageId: language,
            })}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="DESCRIPTION" pt="lg">
          <Text>
            {getTextByLanguage({
              key: "DESCRIPTION_CONTENT",
              LanguageId: language,
            })}
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="THEORY" pt="lg">
          <Box>
            <ReactMarkdown>{theoryContent}</ReactMarkdown>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Information;
