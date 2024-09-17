import { Box, Checkbox, Slider, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getLanguageEnumByKeyForPendulumModel } from "../../assets/LanguageEnums/PendulumEnumFunction";

export default function Options({
  damping,
  showFBD,
  showValues,
  setShowFBD,
  setShowValues,
  setDamping,
  userLanguage,
}: any) {
  const isMediumScreen = useMediaQuery("(max-width: 1072px)");
  return (
    <Box
      style={{
        border: isMediumScreen ? "2px solid white" : "2px solid black",
        borderRadius: "10px",
        padding: isMediumScreen ? "7px 8px" : "10px 15px",
        minWidth: "300px",
        backgroundColor: "white",        
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
        {getLanguageEnumByKeyForPendulumModel({
              key: "Options",
              LanguageId: userLanguage,
            })}
      </Text>
      <Box
        style={{
          marginBottom: "30px",
        }}
      >
        <Text mb={isMediumScreen ? 5 : 10}>
        {getLanguageEnumByKeyForPendulumModel({
              key: "Air_Resistance",
              LanguageId: userLanguage,
            })}
        </Text>
        <Slider
          step={0.01}
          min={0.00}
          max={0.5}
          value={damping}
          onChange={setDamping}
          color="violet"
          styles={{
            markLabel: {
              color: "black",
              fontSize: isMediumScreen ? "9px" : "12px",
            },
          }}
          radius="xl"
          marks={[
            { value: 0, label: "0" },
            { value: 0.25, label: "0.25" },
            { value: 0.5, label: "0.5" },
          ]}
        />
      </Box>
      <Checkbox
        style={{
          marginBottom: "10px",
        }}
        checked={showFBD}
        onChange={(event) => setShowFBD(event.currentTarget.checked)}
        label={getLanguageEnumByKeyForPendulumModel({
          key: "Free_Body_Diagram",
          LanguageId: userLanguage,
        })}
      />
      <Checkbox
        style={{
          marginBottom: "10px",
        }}
        checked={showValues}
        onChange={(event) => setShowValues(event.currentTarget.checked)}
        label={getLanguageEnumByKeyForPendulumModel({
          key: "Values",
          LanguageId: userLanguage,
        })}
      />
    </Box>
  );
}
