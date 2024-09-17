import {
  Box,
  Button,
  Flex,
  Menu,
  Text,
  Overlay,
  Tabs,
  TypographyStylesProvider,
} from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import protectorImg from "../../assets/protector.png";
import playImg from "../../assets/play.png";
import pauseImg from "../../assets/pause.png";
import resetImg from "../../assets/reset.png";
import userPrefrencesImg from "../../assets/user_prefrences.png";
import optionsImg from "../../assets/mi_options-vertical.png";
import closeImg from "../../assets/cross.png";
import Pendulum from "./Pendulum";
import Timer from "./Timer";
import EnergyGraph from "./EnergyGraph";
import Controls from "./Controls";
import Options from "./Options";
import { getLanguageEnumByKeyForPendulumModel } from "../../assets/LanguageEnums/PendulumEnumFunction";
import { Theory } from "./Theory";

export default function PendulumModelSimulation() {
  // const navigate = useNavigate();
  const isMediumScreen = useMediaQuery("(max-width: 1072px)");

  // Pendulum state variables
  const [angle1, setAngle1] = useState<number>(0);
  const [maxAngle1, setMaxAngle1] = useState<number>(0);
  const [armLength1, setArmLength1] = useState<number>(400);
  const [ballRadius1, setBallRadius1] = useState<number>(40);
  const [potentialEnergy1, setPotentialEnergy1] = useState<number>(0);
  const [KineticEnergy1, setKineticEnergy1] = useState<number>(0);
  // Pendulum 2 state variables
  const [angle2, setAngle2] = useState<number>(0);
  const [maxAngle2, setMaxAngle2] = useState<number>(0);
  const [armLength2, setArmLength2] = useState<number>(300);
  const [ballRadius2, setBallRadius2] = useState<number>(30);
  const [KineticEnergy2, setKineticEnergy2] = useState<number>(0);
  const [potentialEnergy2, setPotentialEnergy2] = useState<number>(0);

  const [damping, setDamping] = useState<number>(0); // Damping
  const [showSecondBall, setShowSecondBall] = useState<boolean>(false);
  const [showSecondBallEnergy, setShowSecondBallEnergy] =
    useState<boolean>(false);
  const [showFBD, setShowFBD] = useState<boolean>(false);
  const [showValues, setShowValues] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [showMenuInfo, setShowMenuInfo] = useState<boolean>(false);
  const [showUserPrefrence, setShowUserPrefrence] = useState<boolean>(false);
  const [showtimer, setShowtimer] = useState<boolean>(false);
  const [option, setOption] = useState<string | null>(null);
  const [frameRate, setFrameRate] = useState<0.25 | 0.5 | 1>(1);
  const [userLanguage, setUserLanguage] = useState<string>("en");

  const handleclosebutton = () => {
    setOption(null);
  };

  enum MenuItemsEnum {
    FRAMERATE = "FRAMERATE",
    INFO = "INFO",
    PAUSE = "PAUSE",
    PLAY = "PLAY",
    OPTIONS = "OPTIONS",
    RESET = "RESET",
    USERPREFRENCES = "USERPREFRENCES",
  }
  const menuItems = [
    { id: MenuItemsEnum.RESET, name: "reset", img: resetImg },
    !isPlay
      ? { id: MenuItemsEnum.PLAY, name: "play", img: playImg }
      : { id: MenuItemsEnum.PAUSE, name: "pause", img: pauseImg },
    { id: MenuItemsEnum.FRAMERATE, name: "frame rate", img: null },
    { id: MenuItemsEnum.INFO, name: "info", img: null },
    {
      id: MenuItemsEnum.USERPREFRENCES,
      name: "userprefrences",
      img: userPrefrencesImg,
    },
  ];

  if (isMediumScreen) {
    menuItems.splice(3, 0, {
      id: MenuItemsEnum.OPTIONS,
      name: "options",
      img: optionsImg,
    });
  }

  const handleMenuItemClick = (id: string) => {
    if (id === MenuItemsEnum.RESET) {
      setReset(true);
      setAngle1(0);
      setAngle2(0);
      setMaxAngle1(0);
      setMaxAngle2(0);
      setArmLength1(400);
      setArmLength2(300);
      setBallRadius1(40);
      setBallRadius2(30);
      setPotentialEnergy1(0);
      setPotentialEnergy2(0);
      setKineticEnergy1(0);
      setKineticEnergy2(0);
      setDamping(0);
      setShowSecondBall(false);
      setShowSecondBallEnergy(false);
      setShowFBD(false);
      setShowValues(false);
      setIsPlay(false);
      setFrameRate(1);
      setShowMenuInfo(false);
      setShowUserPrefrence(false);
      setShowtimer(false);
      setOption(null);
    } else if (id === MenuItemsEnum.PLAY) {
      setIsPlay(true);
    } else if (id === MenuItemsEnum.PAUSE) {
      setIsPlay(false);
    } else if (id === MenuItemsEnum.FRAMERATE) {
      setFrameRate((prev) => {
        if (prev === 0.5) return 1;
        if (prev === 1) return 0.25;
        if (prev === 0.25) return 0.5;
        return 0.25;
      });
    } else if (id === MenuItemsEnum.INFO) {
      setShowMenuInfo((prev) => !prev);
    } else if (id === MenuItemsEnum.USERPREFRENCES) {
      setShowUserPrefrence((prev) => !prev);
    }
  };
  return (
    <Box
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        bg="#E3F2FD"
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* protector  */}
        <Box
          style={{
            //   background: "#FFFFC5",
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            height: "239px",
            width: "475px",
            backgroundImage: `url(${protectorImg})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            transform: isMediumScreen
              ? "translateX(-234px) scale(0.7)"
              : "translateX(-233px)",
            transformOrigin: "top",
            overflow: "hidden",
          }}
        >
          {damping === 0 && (
            <>
              <Box
                style={{
                  position: "relative",
                  left: "49%",
                  top: "85%",
                  width: "2px",
                  height: "20px",
                  borderLeft: "4px solid red",
                  transformOrigin: "0 -1020%",
                  transform: `translateX(-50%) rotate(${maxAngle1}rad)`,
                }}
              />
              <Box
                style={{
                  position: "relative",
                  left: "49%",
                  top: "77%",
                  width: "2px",
                  height: "20px",
                  borderLeft: "4px solid red",
                  transformOrigin: "0 -1020%",
                  transform: `translateX(-50%) rotate(${-1 * maxAngle1}rad)`,
                }}
              />
            </>
          )}
          {damping === 0 && showSecondBall && (
            <>
              <Box
                style={{
                  position: "relative",
                  left: "49%",
                  top: "68%",
                  width: "2px",
                  height: "20px",
                  borderLeft: "4px solid blue",
                  transformOrigin: "0 -1020%",
                  transform: `translateX(-50%) rotate(${maxAngle2}rad)`,
                }}
              />
              <Box
                style={{
                  position: "relative",
                  left: "49%",
                  top: "60%",
                  width: "2px",
                  height: "20px",
                  borderLeft: "4px solid blue",
                  transformOrigin: "0 -1020%",
                  transform: `translateX(-50%) rotate(${-1 * maxAngle2}rad)`,
                }}
              />
            </>
          )}
        </Box>
        {/* dashed line for refrence */}
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
        {/* pendulum 1 (red) */}
        <Pendulum
          color={"#FF0000"}
          armLength={armLength1}
          ballRadius={ballRadius1}
          damping={damping}
          showFBD={showFBD}
          showValues={showValues}
          angle={angle1}
          setAngle={setAngle1}
          maxAngle={maxAngle1}
          setMaxAngle={setMaxAngle1}
          setKineticEnergy={setKineticEnergy1}
          setPotentialEnergy={setPotentialEnergy1}
          reset={reset}
          setReset={setReset}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          frameRate={frameRate}
        />
        {/* pendulum 2 (blue) */}
        {showSecondBall && (
          <Pendulum
            color={"#2400FF"}
            armLength={armLength2}
            ballRadius={ballRadius2}
            damping={damping}
            showFBD={showFBD}
            showValues={showValues}
            angle={angle2}
            setAngle={setAngle2}
            maxAngle={maxAngle2}
            setMaxAngle={setMaxAngle2}
            setKineticEnergy={setKineticEnergy2}
            setPotentialEnergy={setPotentialEnergy2}
            reset={reset}
            setReset={setReset}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            frameRate={frameRate}
          />
        )}
        <Box
          style={{
            position: "absolute",
            left: "50%",
            bottom: "0",
            transform: "translateX(-50%)",
            zIndex: 14,
            padding: isMediumScreen ? "4px" : "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: "10px",
          }}
        >
          {menuItems.map((item, index) =>
            item.id === "OPTIONS" ? (
              <Menu shadow="md" width={200} key={index}>
                <Menu.Target>
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleMenuItemClick(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      border: "1px solid black",
                      padding: "5px",
                      transition: "opacity 0.3s",
                      "&:hover": {
                        opacity: 0.8,
                        backgroundColor: "white",
                      },
                      color: "black",
                    }}
                  >
                    <img
                      src={item.img!}
                      alt={item.name}
                      style={{
                        width: isMediumScreen ? 22 : 25,
                        height: isMediumScreen ? 22 : 25,
                      }}
                    />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setOption("energy-graph")}>
                    {getLanguageEnumByKeyForPendulumModel({
                      key: "Energy_Graph",
                      LanguageId: userLanguage,
                    })}
                  </Menu.Item>
                  <Menu.Item onClick={() => setOption("controls")}>
                    {getLanguageEnumByKeyForPendulumModel({
                      key: "Controls",
                      LanguageId: userLanguage,
                    })}
                  </Menu.Item>
                  <Menu.Item onClick={() => setOption("options")}>
                    {getLanguageEnumByKeyForPendulumModel({
                      key: "Options",
                      LanguageId: userLanguage,
                    })}
                  </Menu.Item>

                  <Menu.Divider />
                  <Menu.Item onClick={() => setShowtimer(true)}>
                    {getLanguageEnumByKeyForPendulumModel({
                      key: "Add_Stopwatch",
                      LanguageId: userLanguage,
                    })}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleMenuItemClick(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: index === 1 ? 50 : 35,
                  height: index === 1 ? 50 : 35,
                  borderRadius: "50%",
                  border: "1px solid black",
                  padding: "5px",
                  transition: "opacity 0.3s",
                  "&:hover": {
                    opacity: 0.8,
                    backgroundColor: "white",
                  },
                  color: "black",
                }}
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: isMediumScreen ? 22 : 25,
                      height: isMediumScreen ? 22 : 25,
                    }}
                  />
                ) : (
                  <Text>
                    {" "}
                    {item.id === MenuItemsEnum.INFO
                      ? "i"
                      : item.id === MenuItemsEnum.FRAMERATE
                      ? `${frameRate}X`
                      : ""}{" "}
                  </Text>
                )}
              </Button>
            )
          )}
        </Box>

        {/* controls options */}
        <Box
          style={{
            position: "fixed",
            top: 50,
            right: 25,
            minWidth: "20%",
          }}
        >
          {!isMediumScreen && (
            <Controls
              armLength1={armLength1}
              armLength2={armLength2}
              setArmLength1={setArmLength1}
              setArmLength2={setArmLength2}
              ballRadius1={ballRadius1}
              ballRadius2={ballRadius2}
              setBallRadius1={setBallRadius1}
              setBallRadius2={setBallRadius2}
              showSecondBall={showSecondBall}
              setShowSecondBall={setShowSecondBall}
              userLanguage={userLanguage}
            />
          )}
          {!isMediumScreen && (
            <Options
              damping={damping}
              setDamping={setDamping}
              showFBD={showFBD}
              setShowFBD={setShowFBD}
              showValues={showValues}
              setShowValues={setShowValues}
              userLanguage={userLanguage}
            />
          )}
        </Box>

        <Box
          style={{
            position: "fixed",
            top: 50,
            left: 25,
            width: "350px",
          }}
        >
          {/* graph */}
          {!isMediumScreen && (
            <EnergyGraph
              setShowSecondBallEnergy={setShowSecondBallEnergy}
              showSecondBallEnergy={showSecondBallEnergy}
              showSecondBall={showSecondBall}
              maxAngle1={maxAngle1}
              maxAngle2={maxAngle2}
              potentialEnergy1={potentialEnergy1}
              potentialEnergy2={potentialEnergy2}
              KineticEnergy1={KineticEnergy1}
              KineticEnergy2={KineticEnergy2}
              userLanguage={userLanguage}
            />
          )}
          {!isMediumScreen && (
            <Flex justify="center">
              <Timer
                isPlay={isPlay}
                reset={reset}
                userLanguage={userLanguage}
              />
            </Flex>
          )}
        </Box>
        {/* timer */}
        {isMediumScreen && showtimer && (
          <Box
            style={{
              position: "absolute",
              left: "50%",
              bottom: "80px",
              transform: "translateX(-50%)",
            }}
          >
            <Timer isPlay={isPlay} reset={reset} userLanguage={userLanguage} />
          </Box>
        )}

        {isMediumScreen &&
          (option === "energy-graph" ||
            option === "options" ||
            option === "controls") && (
            <>
              {<Overlay opacity={0.8} color="#000" zIndex={1000} />}
              <Flex
                justify="center"
                align="center"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  border: "2px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "10px",
                  transform: "translateX(-50%) translateY(-50%)",
                  zIndex: 1001,
                }}
              >
                <Box
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={handleclosebutton}
                    src={closeImg}
                    width={10}
                    height={10}
                    alt="close"
                  />
                </Box>
                {option === "energy-graph" && (
                  <EnergyGraph
                    setShowSecondBallEnergy={setShowSecondBallEnergy}
                    showSecondBallEnergy={showSecondBallEnergy}
                    showSecondBall={showSecondBall}
                    maxAngle1={maxAngle1}
                    maxAngle2={maxAngle2}
                    potentialEnergy1={potentialEnergy1}
                    potentialEnergy2={potentialEnergy2}
                    KineticEnergy1={KineticEnergy1}
                    KineticEnergy2={KineticEnergy2}
                    userLanguage={userLanguage}
                  />
                )}
                {option === "controls" && (
                  <Controls
                    armLength1={armLength1}
                    armLength2={armLength2}
                    setArmLength1={setArmLength1}
                    setArmLength2={setArmLength2}
                    ballRadius1={ballRadius1}
                    ballRadius2={ballRadius2}
                    setBallRadius1={setBallRadius1}
                    setBallRadius2={setBallRadius2}
                    showSecondBall={showSecondBall}
                    setShowSecondBall={setShowSecondBall}
                    userLanguage={userLanguage}
                  />
                )}
                {option === "options" && (
                  <Options
                    damping={damping}
                    setDamping={setDamping}
                    showFBD={showFBD}
                    setShowFBD={setShowFBD}
                    showValues={showValues}
                    setShowValues={setShowValues}
                    userLanguage={userLanguage}
                  />
                )}
              </Flex>
            </>
          )}

        {showMenuInfo && (
          <>
            <Overlay
              opacity={0.8}
              color="#000"
              zIndex={1001}
              onClick={() => setShowMenuInfo(false)}
            />
            <Flex
              justify="center"
              align="center"
              direction="column"
              style={{
                minWidth: "340px",
                maxWidth: "80%",
                position: "absolute",
                left: "50%",
                top: "50%",
                border: "2px solid white",
                borderRadius: "10px",
                backgroundColor: "white",
                padding: "15px",
                transform: "translateX(-50%) translateY(-50%)",
                zIndex: 1001,
              }}
            >
              <>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "25%",
                  }}
                >
                  <Text style={{ fontWeight: 700, fontSize: "25px" }}>
                    {getLanguageEnumByKeyForPendulumModel({
                      key: "Information",
                      LanguageId: userLanguage,
                    })}
                  </Text>
                  <Box style={{ cursor: "pointer" }}>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowMenuInfo(false)}
                      src={closeImg}
                      width={15}
                      height={15}
                      alt="close"
                    />
                  </Box>
                </Box>
                <Box style={{ height: "70%", width: "100%" }}>
                  <Tabs defaultValue="description">
                    <Tabs.List>
                      <Tabs.Tab value="description">
                        {getLanguageEnumByKeyForPendulumModel({
                          key: "Description",
                          LanguageId: userLanguage,
                        })}
                      </Tabs.Tab>
                      <Tabs.Tab value="theory">
                        {getLanguageEnumByKeyForPendulumModel({
                          key: "Theory",
                          LanguageId: userLanguage,
                        })}
                      </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="description" pt="lg">
                      <Text>
                        {getLanguageEnumByKeyForPendulumModel({
                          key: "Description_Content",
                          LanguageId: userLanguage,
                        })}
                      </Text>
                    </Tabs.Panel>
                    <Tabs.Panel value="theory" pt="lg">
                      <TypographyStylesProvider>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: Theory({LanguageId: userLanguage}),
                          }}
                        />
                      </TypographyStylesProvider>
                    </Tabs.Panel>
                  </Tabs>
                </Box>
              </>
            </Flex>
          </>
        )}
        {showUserPrefrence && (
          <>
            <Overlay
              opacity={0.8}
              color="#000"
              zIndex={1001}
              onClick={() => setShowUserPrefrence(false)}
            />
            <Flex
              justify="center"
              align="center"
              direction="column"
              style={{
                minWidth: "300px",
                maxWidth: "400px",
                position: "absolute",
                left: "50%",
                top: "50%",
                border: "2px solid white",
                borderRadius: "10px",
                backgroundColor: "white",
                padding: "20px",
                transform: "translateX(-50%) translateY(-50%)",
                zIndex: 1001,
              }}
            >
              <>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "25%",
                  }}
                >
                  <Text style={{ fontWeight: 700, fontSize: "25px" }}>
                    {getLanguageEnumByKeyForPendulumModel({
                      key: "Preferences",
                      LanguageId: userLanguage,
                    })}
                  </Text>
                  <Box style={{ cursor: "pointer" }}>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowUserPrefrence(false)}
                      src={closeImg}
                      width={15}
                      height={15}
                      alt="close"
                    />
                  </Box>
                </Box>
                <Box style={{ height: "70%", width: "100%" }}>
                  <Tabs defaultValue="overview">
                    <Tabs.List>
                      <Tabs.Tab value="overview">
                        {getLanguageEnumByKeyForPendulumModel({
                          key: "Overview",
                          LanguageId: userLanguage,
                        })}
                      </Tabs.Tab>
                      <Tabs.Tab value="languages">
                        {getLanguageEnumByKeyForPendulumModel({
                          key: "Languages",
                          LanguageId: userLanguage,
                        })}
                      </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="overview" pt="lg">
                      <Text>
                        {getLanguageEnumByKeyForPendulumModel({
                          key: "Preference_Content",
                          LanguageId: userLanguage,
                        })}
                      </Text>
                    </Tabs.Panel>
                    <Tabs.Panel value="languages" pt="lg">
                      <Box
                        style={{
                          width: "100%",
                          height: "70px",
                          border: "2px solid black",
                          borderRadius: "10px",
                          padding: "7px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          style={{
                            borderRadius: "10px",
                            height: "100%",
                            width: "45%",
                            border: "1px solid transparent",
                            backgroundColor:
                              userLanguage === "en" ? "#BACEF4" : "transparent",
                          }}
                          variant="outline"
                          onClick={() => setUserLanguage("en")}
                        >
                          <Text style={{ fontSize: "20px" }} fw={500} c="black">
                            English
                          </Text>
                        </Button>
                        <Button
                          style={{
                            borderRadius: "10px",
                            height: "100%",
                            width: "45%",
                            border: "1px solid transparent",
                            backgroundColor:
                              userLanguage === "hi" ? "#BACEF4" : "transparent",
                          }}
                          variant="outline"
                          onClick={() => setUserLanguage("hi")}
                        >
                          <Text style={{ fontSize: "20px" }} fw={500} c="black">
                            हिंदी
                          </Text>
                        </Button>
                      </Box>
                    </Tabs.Panel>
                  </Tabs>
                </Box>
              </>
            </Flex>
          </>
        )}

      </Box>
    </Box>
  );
}
