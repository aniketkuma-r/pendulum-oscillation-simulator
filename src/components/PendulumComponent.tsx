import { useEffect, useRef } from "react";
import { PendulumEnum } from "../enums/pendulumEnum";
import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Box, Text } from "@mantine/core";
import { setIsOn, SettingsState } from "../features/settings/settingsSlice";
import {
  PendulumState,
  setAngle,
  setAngularAcceleration,
  setAngularVelocity,
  setComponents,
  setIsHold,
  setIsOscillating,
  setKineticEnergy,
  setPotentialEnergy,
  setThresholdAngle,
} from "../features/pendulum/pendulumSlice";

interface PendulumProps {
  pendulumName: PendulumEnum;
}

const PendulumComponent = ({ pendulumName }: PendulumProps) => {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const lineRef = useRef<HTMLDivElement>(null);
  const pendulum = useAppSelector(
    (state: { pendulum: PendulumState }) => state.pendulum[pendulumName]
  );
  const settings = useAppSelector(
    (state: { settings: SettingsState }) => state.settings
  );
  const dispatch = useAppDispatch();
  const factor = 10;

  const handleMouseDown = () => {
    dispatch(setIsHold({ pendulumName: pendulumName, isHold: true }));
    dispatch(
      setIsOscillating({ pendulumName: pendulumName, isOscillating: false })
    );
    // dispatch(setIsOn(false));
    dispatch(
      setAngularVelocity({ pendulumName: pendulumName, angularVelocity: 0 })
    );
  };

  const handleMouseUp = () => {
    dispatch(setIsHold({ pendulumName: pendulumName, isHold: false }));
    dispatch(
      setIsOscillating({ pendulumName: pendulumName, isOscillating: true })
    );
    dispatch(setIsOn(true));
    dispatch(
      setAngularVelocity({ pendulumName: pendulumName, angularVelocity: 0 })
    ); // No velocity once you let go
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (pendulum.isHold) {
      const pivot = { x: window.innerWidth / 2, y: 0 }; // pivot point
      const dx = pivot.x - e.clientX;
      const dy = e.clientY - pivot.y;
      const newAngle = Math.atan2(dx, dy);
      dispatch(setAngle({ pendulumName: pendulumName, angle: newAngle }));
      dispatch(
        setThresholdAngle({
          pendulumName: pendulumName,
          thresholdAngle: newAngle,
        })
      );
      if (lineRef.current) {
        lineRef.current.style.transform = `rotate(${newAngle}rad)`;
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleMouseMove({
      clientX: touch.clientX,
      clientY: touch.clientY,
    } as MouseEvent);
  };

  const animatePendulum = () => {
    if (pendulum.isOscillating && settings.isOn) {
      const gravity = 9.81 / factor; // Acceleration due to gravity (m/s^2)
      const g = 9.81;
      const airDensity = 1;
      const armLength = pendulum.armLength; // Length of the pendulum in meters
      const mass = pendulum.mass;
      const angle = pendulum.angle; // angle of the pendulum in radians from mean position
      const radius = pendulum.mass / 2;
      const crossSectionalAreaOfBall = Math.PI * radius * radius;
      const angularVelocity = pendulum.angularVelocity;
      const dragCoefficient = settings.dragCoefficient;
      const dampingFactor = -dragCoefficient * 0.02 + 1; // Adjusted

      // The acceleration of a pendulum can be calculated using the equation: α = (-g/L) * sin(θ)
      let newAngularAcceleration =
        ((-1 * gravity) / armLength) * Math.sin(angle);
      dispatch(
        setAngularAcceleration({
          pendulumName: pendulumName,
          angularAcceleration: newAngularAcceleration,
        })
      );

      //  formula ωf = ωi + αt is a fundamental equation in physics
      let newAngularVelocity =
        angularVelocity + newAngularAcceleration * settings.playbackSpeed; // Velocity change without damping
      newAngularVelocity *= dampingFactor; // Apply damping to the velocity
      dispatch(
        setAngularVelocity({
          pendulumName: pendulumName,
          angularVelocity: newAngularVelocity,
        })
      );


      //  formula θf = θi + ωt is a fundamental equation in physics
      const newAngle = angle + newAngularVelocity * settings.playbackSpeed;
      dispatch(setAngle({ pendulumName: pendulumName, angle: newAngle }));
      if (lineRef.current) {
        lineRef.current.style.transform = `rotate(${newAngle}rad)`;
      }

      // max angle
      if (Math.abs(newAngle) > pendulum.thresholdAngle) {
        dispatch(
          setThresholdAngle({
            pendulumName: pendulumName,
            thresholdAngle: Math.abs(newAngle),
          })
        );
      }

      // PE=mgh=mgL(1−cos(θ))
      const newPotentialEnergy =
        mass * gravity * armLength * (1 - Math.cos(angle));
      dispatch(
        setPotentialEnergy({
          pendulumName: pendulumName,
          potentialEnergy: newPotentialEnergy,
        })
      );

      // v = ω r represents the linear velocity (v) of a point on a rotating body
      // KE = 0.5 * m * v^2 = 0.5 * m * (ω r)^2
      const linearVelocity = newAngularVelocity * armLength;
      const newKineticEnergy = 0.5 * mass * linearVelocity * linearVelocity;
      dispatch(
        setKineticEnergy({
          pendulumName: pendulumName,
          kineticEnergy: newKineticEnergy,
        })
      );
      // pause the animation if pendulum is not moving or total energy very low ~ 0.01
      const totalEnergy = newPotentialEnergy + newKineticEnergy;
      if (totalEnergy < 0.01) {
        dispatch(
          setIsOscillating({ pendulumName: pendulumName, isOscillating: false })
        );
        dispatch(setIsOn(false));
      } else {
        dispatch(setIsOn(true));
      }

      

      // Fd = ½ ∙ p ∙ v² ∙ Cd ∙ A
      // where,
      // Fd: Drag Force
      // p: Air Density
      // v: Object Velocity
      // Cd: Drag Coefficient
      // A: Object cross-sectional Area
      const newDragForce =
        0.5 *
        airDensity *
        linearVelocity *
        linearVelocity *
        dragCoefficient *
        crossSectionalAreaOfBall;

      // console.log(newDragForce);

      const newComponents = {
        mg: mass * g,
        mgSinTheta: Math.abs(mass * g * Math.sin(angle)),
        mgCosTheta: Math.abs(mass * g * Math.cos(angle)),
        tension: Math.abs(mass * g * Math.cos(angle)),
        drag: newDragForce,
      };
      dispatch(
        setComponents({
          pendulumName: pendulumName,
          components: newComponents,
        })
      );
    }
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(animatePendulum);
    if (settings.isReset) cancelAnimationFrame(animationId);
    return () => cancelAnimationFrame(animationId);
  }, [settings.isOn, pendulum.isOscillating, pendulum.angle]);

  useEffect(() => {
    const mass = pendulum.mass;
    const angle = pendulum.angle;
    const g = 9.81;
    const newComponents = {
      mg: mass * g,
      mgSinTheta: Math.abs(mass * g * Math.sin(angle)),
      mgCosTheta: Math.abs(mass * g * Math.cos(angle)),
      tension: Math.abs(mass * g * Math.cos(angle)),
      drag: pendulum.components.drag,
    };
    dispatch(
      setComponents({
        pendulumName: pendulumName,
        components: newComponents,
      })
    );
  }, [pendulum.mass, settings.isFBDs]);

  useEffect(() => {
    if (pendulum.isHold) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [pendulum.isHold]);
  return (
    <>
      <Box
        ref={lineRef}
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          height: `${pendulum.armLength}px`,
          borderLeft: "2px solid black",
          transformOrigin: "top",
          transform: `translateX(-50%) rotate(${pendulum.angle}rad)`,
        }}
      >
        <Box
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          style={{
            position: "absolute",
            bottom: 0, // Align the circle at the bottom of the line
            left: "50%",
            width: `${pendulum.mass}px`,
            height: `${pendulum.mass}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, #D9D9D9, ${pendulum.color})`,
            transform: "translateX(-50%) translateY(50%)",
            cursor: "move",
          }}
        ></Box>
        {settings.isFBDs && (
          <>
            {/* Arrow: mg * cos(theta) */}
            {pendulum.components.mgCosTheta > 0 &&
              pendulum.components.mgCosTheta !== pendulum.components.mg && (
                <Box
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    width: "2px",
                    height: `${pendulum.components.mgCosTheta / factor}px`,
                    backgroundColor: "red",
                    transform: "translateX(-50%) translateY(100%)",
                  }}
                >
                  <Box
                    style={{
                      position: "absolute",
                      bottom: "-9px",
                      borderTop: "10px solid red",
                      borderRight: "5px solid transparent",
                      borderLeft: "5px solid transparent",
                      transform: "translateX(-40%)",
                    }}
                  />
                  <Text
                    style={{
                      width: "max-content",
                      position: "absolute",
                      bottom: "-3rem",
                      userSelect: "none",
                    }}
                  >
                    mgcos(θ)
                  </Text>
                </Box>
              )}

            {/* Arrow: mg * sin(theta) (horizontal) */}
            {pendulum.components.mgSinTheta > 0 &&
              pendulum.components.mgSinTheta !== pendulum.components.mg && (
                <Box
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: pendulum.angle < 0 ? 0 : "auto",
                    width: `${pendulum.components.mgSinTheta / factor}px`,
                    height: "2px",
                    backgroundColor: "red",
                  }}
                >
                  <Box
                    style={{
                      position: "absolute",
                      right: pendulum.angle > 0 ? "-9px" : "auto",
                      left: pendulum.angle < 0 ? "-9px" : "auto",
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft:
                        pendulum.angle > 0 ? "10px solid red" : "none",
                      borderRight:
                        pendulum.angle < 0 ? "10px solid red" : "none",
                      transform: "translateY(-40%)",
                    }}
                  />
                  <Text
                    style={{
                      width: "max-content",
                      position: "absolute",
                      left: pendulum.angle < 0 ? "-5rem" : "auto",
                      right: pendulum.angle > 0 ? "-5rem" : "auto",
                      transform: "translateY(-50%)",
                      userSelect: "none",
                    }}
                  >
                    mgsin(θ)
                  </Text>
                </Box>
              )}

            {/* damping  */}

            {pendulum.components.drag > 0 && (
              <Box
                style={{
                  position: "absolute",
                  // top: "50%",
                  right: pendulum.angularVelocity < 0 ? 0 : "auto",
                  bottom: 0,
                  width: `${pendulum.components.drag / factor / factor}px`,
                  height: "2px",
                  backgroundColor: "blue",
                  transform: "translateY(-50%) transalteX(-1px)",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    left: pendulum.angularVelocity < 0 ? "-10px" : "auto",
                    right: pendulum.angularVelocity > 0 ? "-10px" : "auto",
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: pendulum.angularVelocity > 0 ? "10px solid blue" : "none",
                    borderRight:
                    pendulum.angularVelocity < 0 ? "10px solid blue" : "none",
                    transform: "translateY(-40%)",
                  }}
                />
                <Text
                  style={{
                    width: "max-content",
                    position: "absolute",
                    left: pendulum.angularVelocity < 0 ? "-5rem" : "auto",
                    right: pendulum.angularVelocity > 0 ? "-5rem" : "auto",
                    userSelect: "none",
                  }}
                >
                  drag
                </Text>
              </Box>
            )}

            {/* Arrow: Tension (along the arm, upwards) */}
            <Box
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                width: "2px",
                height: `${pendulum.components.tension / factor}px`,
                backgroundColor: "blue",
                transform: "translateX(-50%)",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: "-9px",
                  borderBottom: "10px solid blue",
                  borderRight: "5px solid transparent",
                  borderLeft: "5px solid transparent",
                  transform: "translateX(-40%)",
                }}
              />
              <Text
                style={{
                  width: "max-content",
                  position: "absolute",
                  top: "-3rem",
                  transform: "translateX(50%)",
                  userSelect: "none",
                }}
              >
                T
              </Text>
            </Box>

            {/* Arrow: mg (downward) */}
            <Box
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                width: "2px",
                height: `${pendulum.components.mg / factor}px`,
                backgroundColor: "red",
                transformOrigin: "top",
                transform: `translateX(-50%) translateY(100%) rotate(${-pendulum.angle}rad)`,
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  bottom: "-9px",
                  borderTop: "10px solid red",
                  borderRight: "5px solid transparent",
                  borderLeft: "5px solid transparent",
                  transform: "translateX(-40%)",
                }}
              />
              <Text
                style={{
                  width: "max-content",
                  position: "absolute",
                  bottom: "-3rem",
                  transform: "translate(-50%, -50%)",
                  userSelect: "none",
                }}
              >
                mg
              </Text>
            </Box>
          </>
        )}
      </Box>
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: isMediumScreen ? "9rem" : "13rem",
          width: "2px",
          height: "20px",
          borderLeft: `2px solid ${pendulum.color}`,
          transformOrigin: isMediumScreen ? "0 -9rem" : "0 -13rem",
          transform: `translateX(-50%) rotate(${pendulum.thresholdAngle}rad)`,
        }}
      />
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: isMediumScreen ? "9rem" : "13rem",
          width: "2px",
          height: "20px",
          borderLeft: `2px solid ${pendulum.color}`,
          transformOrigin: isMediumScreen ? "0 -9rem" : "0 -13rem",
          transform: `translateX(-50%) rotate(${
            -1 * pendulum.thresholdAngle
          }rad)`,
        }}
      />
    </>
  );
};

export default PendulumComponent;
