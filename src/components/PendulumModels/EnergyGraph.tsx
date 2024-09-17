import { Box, Button, Flex, Text } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import { getLanguageEnumByKeyForPendulumModel } from "../../assets/LanguageEnums/PendulumEnumFunction";

export default function EnergyGraph({
  showSecondBallEnergy,
  showSecondBall,
  maxAngle1,
  maxAngle2,
  potentialEnergy1,
  potentialEnergy2,
  KineticEnergy1,
  KineticEnergy2,
  setShowSecondBallEnergy,
  userLanguage,
}: any) {
  const isMediumScreen = useMediaQuery("(max-width: 1072px)");
  return (
    <Box
      style={{
        border: isMediumScreen ? "2px solid white" : "2px solid black",
        borderRadius: "10px",
        padding: "10px 15px",
        marginBottom: "20px",
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
          key: "Energy_Graph",
          LanguageId: userLanguage,
        })}
      </Text>

      <Box>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="row"
          style={{ marginBottom: "5px" }}
        >
          <Box
            style={{
              backgroundColor: "#FF4444",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
            }}
          ></Box>
          <Text>
            {getLanguageEnumByKeyForPendulumModel({
              key: "Potential_Energy",
              LanguageId: userLanguage,
            })}
          </Text>
        </Flex>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="row"
          style={{ marginBottom: "5px" }}
        >
          <Box
            style={{
              backgroundColor: "#5344FF",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
            }}
          ></Box>
          <Text>
            {getLanguageEnumByKeyForPendulumModel({
              key: "Kinetic_Energy",
              LanguageId: userLanguage,
            })}
          </Text>
        </Flex>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="row"
          style={{ marginBottom: "5px" }}
        >
          <Box
            style={{
              backgroundColor: "#FF44E1",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
            }}
          ></Box>
          <Text>
            {getLanguageEnumByKeyForPendulumModel({
              key: "Mechanical_Energy",
              LanguageId: userLanguage,
            })}
          </Text>
        </Flex>
      </Box>
      {!showSecondBallEnergy || !showSecondBall ? (
        <Flex
          gap="lg"
          justify="space-between"
          align="flex-end"
          direction="row"
          style={{
            marginTop: "10px",
            height: "300px",
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          <Box
            style={{
              width: "65px",
              height:
                Math.abs(maxAngle1) > 0.01 ? `${potentialEnergy1}%` : "1px",
              backgroundColor: "#FF4444",
            }}
          />
          <Box
            style={{
              width: "65px",
              height: Math.abs(maxAngle1) > 0.01 ? `${KineticEnergy1}%` : "1px",
              backgroundColor: "#5344FF",
            }}
          />
          <Box
            style={{
              width: "65px",
              height:
                Math.abs(maxAngle1) > 0.01
                  ? `${KineticEnergy1 + potentialEnergy1}%`
                  : "1px",
              backgroundColor: "#FF44E1",
            }}
          />
        </Flex>
      ) : (
        <Flex
          gap="lg"
          justify="space-between"
          align="flex-end"
          direction="row"
          style={{
            marginTop: "10px",
            height: "300px",
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          <Box
            style={{
              width: "65px",
              height:
                Math.abs(maxAngle2) > 0.01 ? `${potentialEnergy2}%` : "1px",
              backgroundColor: "#FF4444",
            }}
          />
          <Box
            style={{
              width: "65px",
              height: Math.abs(maxAngle2) > 0.01 ? `${KineticEnergy2}%` : "1px",
              backgroundColor: "#5344FF",
            }}
          />
          <Box
            style={{
              width: "65px",
              height:
                Math.abs(maxAngle2) > 0.01
                  ? `${KineticEnergy2 + potentialEnergy2}%`
                  : "1px",
              backgroundColor: "#FF44E1",
            }}
          />
        </Flex>
      )}
      {showSecondBall && (
        <Flex justify="space-around" align="center" direction="row">
          <Button
            variant={!showSecondBallEnergy ? "filled" : "light"}
            onClick={() => setShowSecondBallEnergy(false)}
          >
            {getLanguageEnumByKeyForPendulumModel({
              key: "Red_Ball",
              LanguageId: userLanguage,
            })}
          </Button>
          <Button
            variant={showSecondBallEnergy ? "filled" : "light"}
            onClick={() => setShowSecondBallEnergy(true)}
          >
            {getLanguageEnumByKeyForPendulumModel({
              key: "Blue_Ball",
              LanguageId: userLanguage,
            })}
          </Button>
        </Flex>
      )}
    </Box>
  );
}
