import {
  Box,
  Checkbox,
  Divider,
  Slider,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getLanguageEnumByKeyForPendulumModel } from "../../assets/LanguageEnums/PendulumEnumFunction";

export default function Controls({
  armLength1,
  armLength2,
  setArmLength1,
  setArmLength2,
  ballRadius1,
  ballRadius2,
  setBallRadius1,
  setBallRadius2,
  showSecondBall,
  setShowSecondBall,
  userLanguage,
}: any) {
  const isMediumScreen = useMediaQuery("(max-width: 1072px)");
  return (
    <Box
      style={{
        border:  isMediumScreen ? "2px solid white" : "2px solid black",
        borderRadius: "10px",
        padding: "10px 15px",
        marginBottom: "20px",
        minWidth: "300px",
        backgroundColor: "white",
      }}
    >
      <Text
        mb={20}
        styles={{
          root: {
            fontWeight: 700,
            fontSize: "20px",
            textAlign: "center",
          },
        }}
      >
        {getLanguageEnumByKeyForPendulumModel({
              key: "Controls",
              LanguageId: userLanguage,
            })}
      </Text>
      <Checkbox
        style={{
          marginBottom: "10px",
        }}
        checked={showSecondBall}
        onChange={(event) => setShowSecondBall(event.currentTarget.checked)}
        label={getLanguageEnumByKeyForPendulumModel({
          key: "Two_Pendulums_Toggle",
          LanguageId: userLanguage,
        })}
      />
      <Box>
        <Box
          style={{
            marginBottom: "30px",
          }}
        >
          <Text
            mb={10}
            styles={{
              root: {
                fontSize: isMediumScreen ? "13px" : "17px",
              },
            }}
          >
            {getLanguageEnumByKeyForPendulumModel({
              key: "Length1",
              LanguageId: userLanguage,
            })}
          </Text>
          <Slider
            step={20}
            min={200}
            max={600}
            value={armLength1}
            onChange={setArmLength1}
            color="violet"
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
        <Box
          style={{
            marginBottom: "30px",
          }}
        >
          <Text
            mb={isMediumScreen ? 5 : 10}
            styles={{
              root: {
                fontSize: isMediumScreen ? "13px" : "17px",
              },
            }}
          >
            {getLanguageEnumByKeyForPendulumModel({
              key: "Mass1",
              LanguageId: userLanguage,
            })}
          </Text>
          <Slider
            step={10}
            min={10}
            max={100}
            value={ballRadius1}
            onChange={setBallRadius1}
            color="violet"
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
      </Box>
      {showSecondBall && (
        <>
          <Divider my="md" />
          <Box>
            <Box
              style={{
                marginBottom: "30px",
              }}
            >
              <Text
                mb={isMediumScreen ? 5 : 10}
                styles={{
                  root: {
                    fontSize: isMediumScreen ? "13px" : "17px",
                  },
                }}
              >
                {getLanguageEnumByKeyForPendulumModel({
              key: "Length2",
              LanguageId: userLanguage,
            })}
              </Text>
              <Slider
                step={20}
                min={200}
                max={600}
                value={armLength2}
                onChange={setArmLength2}
                color="violet"
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
            <Box
              style={{
                marginBottom: "30px",
              }}
            >
              <Text
                mb={isMediumScreen ? 5 : 10}
                styles={{
                  root: {
                    fontSize: isMediumScreen ? "13px" : "17px",
                  },
                }}
              >
                {getLanguageEnumByKeyForPendulumModel({
              key: "Mass2",
              LanguageId: userLanguage,
            })}
              </Text>
              <Slider
                step={10}
                min={10}
                max={100}
                value={ballRadius2}
                onChange={setBallRadius2}
                color="violet"
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
          </Box>
        </>
      )}
    </Box>
  );
}
