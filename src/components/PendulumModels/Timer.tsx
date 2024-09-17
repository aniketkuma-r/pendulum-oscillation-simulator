import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Box, Text } from "@mantine/core";
import { getLanguageEnumByKeyForPendulumModel } from "../../assets/LanguageEnums/PendulumEnumFunction";
interface TimerProps {
  isPlay: boolean;
  reset: boolean;
  userLanguage: string;
}

export default function Timer({ isPlay, reset, userLanguage }: TimerProps) {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const isMediumScreen = useMediaQuery("(max-width: 1072px)");

  useEffect(() => {
    if (reset) {
      setSecondsElapsed(0);
    }
    let interval: any;
    if (isPlay) {
      interval = setInterval(() => {
        setSecondsElapsed((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlay, reset]);

  const formatTime = () => {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} sec`;
  };

  return (
    <Box>
      <Text
        mb={isMediumScreen ? 5 : 20}
        style={{
          fontWeight: 700, fontSize: isMediumScreen ? "15px" : "20px", 
          textAlign: "center",
        }}
      >
        {getLanguageEnumByKeyForPendulumModel({
              key: "Timer",
              LanguageId: userLanguage,
            })}
      </Text>
      <Box
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          padding: "25px 50px",
          marginBottom: "20px",
          width: "200px",
          backgroundColor: "#685BFF",
        }}
      >
        <Text style={{ textAlign: "center", backgroundColor: "white" }}>
          {formatTime()}
        </Text>
      </Box>
    </Box>
  );
}
