import { useEffect, useState, useRef } from "react";
import { Box, Text } from "@mantine/core";

interface PendulumProps {
  color: string;
  armLength: number;
  ballRadius: number;
  damping: number;
  showFBD: boolean;
  showValues: boolean;
  isPlay: boolean;
  angle: number;
  maxAngle: number;
  reset: boolean;
  setAngle: (angle: number) => void;
  setMaxAngle: (angle: number) => void;
  setIsPlay: (isPlay: boolean) => void;
  setReset: (reset: boolean) => void;
  setKineticEnergy: (energy: number) => void;
  setPotentialEnergy: (energy: number) => void;
  frameRate: 0.25 | 0.5 | 1;
}

export default function Pendulum({
  color,
  armLength,
  ballRadius,
  damping,
  showFBD,
  showValues,
  angle,
  isPlay,
  reset,
  maxAngle,
  frameRate,
  setReset,
  setIsPlay,
  setAngle,
  setMaxAngle,
  setKineticEnergy,
  setPotentialEnergy,
}: PendulumProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [aVelocity, setAVelocity] = useState<number>(0.0);
  const [aAcceleration, setAAcceleration] = useState<number>(0.0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [isOscillating, setIsOscillating] = useState<boolean>(false);
  const [maxAVelocity, setMaxAVelocity] = useState<number>(0.0);
  const [dampingValue, setDampingValue] = useState<number>(0);
  const pivot = { x: window.innerWidth / 2, y: 0 }; // pivot point

  const scalingFactor = 0.25;
  const gravity = 9.81; // Gravity constant
  const mass = ballRadius * scalingFactor; // Mass of the pendulum ball
  const mg = mass * gravity; // Gravitational force
  const mgSinTheta = Math.abs(mg * Math.sin(angle)); // Horizontal component
  const mgCosTheta = Math.abs(mg * Math.cos(angle)); // Vertical component
  const massValue = ballRadius;
  const mgValue = (massValue * gravity).toFixed(2);
  const mgSinValue = (massValue * gravity * Math.sin(angle)).toFixed(2);
  const mgCosValue = (massValue * gravity * Math.cos(angle)).toFixed(2);
  const dampingFactor = -damping* 0.02 + 1; // adjusted damping factor
  // const dampingValue = 0.5 * 1 * (((1-dampingFactor)*100) * mgSinTheta) * (massValue * 3 / ballRadius);

  const animatePendulum = () => {
    if (isOscillating) {
      const gravity = 0.6; // Adjust gravity as needed

      const newAcceleration = ((-1 * gravity) / armLength) * Math.sin(angle);
      setAAcceleration(newAcceleration);

      const newVelocity = (aVelocity + newAcceleration * frameRate) * dampingFactor;
      setAVelocity(newVelocity);
      if (Math.abs(newVelocity) > maxAVelocity) {
        setMaxAVelocity(Math.abs(newVelocity));
      }

      const newAngle = angle + newVelocity * frameRate;
      setAngle(newAngle);
      if (Math.abs(newAngle) > maxAngle) {
        setMaxAngle(Math.abs(newAngle));
      }
      const dampingVal =  0.5 * 1 * (((1-dampingFactor)*100) * mgSinTheta) * (massValue * 3 / ballRadius);
      setDampingValue(dampingVal);
      const newPotentialEnergy = 100 - ((Math.abs(maxAngle) - Math.abs(angle)) / Math.abs(maxAngle)) * 100;
      setPotentialEnergy(newPotentialEnergy);
      const newKineticEnergy = (Math.pow(newVelocity, 2))/ (Math.pow(maxAVelocity, 2)) * 100;
      setKineticEnergy(newKineticEnergy);


      if ((newKineticEnergy+newPotentialEnergy)>100) {
        setKineticEnergy(newKineticEnergy/(newKineticEnergy+newPotentialEnergy)*100);
        setPotentialEnergy(newPotentialEnergy/(newKineticEnergy+newPotentialEnergy)*100);
      }
      if (lineRef.current) {
        lineRef.current.style.transform = `rotate(${newAngle}rad)`;
      }
    }
  };

  useEffect(() => {
    if (dragging) {
      setIsOscillating(false);
    } else setIsOscillating(isPlay);
  }, [isPlay, dragging]);

  useEffect(() => {
    if (reset) {
      setAVelocity(0);
      setAAcceleration(0);
      setAngle(0);
      setMaxAngle(0);
      setDragging(false);
      setIsOscillating(false);
      setKineticEnergy(0);
      setMaxAVelocity(0);

      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const animationId = requestAnimationFrame(animatePendulum);
    if (reset) cancelAnimationFrame(animationId);
    return () => cancelAnimationFrame(animationId);
  }, [angle, aVelocity, aAcceleration, isOscillating]);

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const dx = pivot.x - e.clientX;
      const dy = e.clientY - pivot.y;
      const newAngle = Math.atan2(dx, dy);
      setAngle(newAngle);
      if (setMaxAngle) setMaxAngle(newAngle);
      if (lineRef.current) {
        lineRef.current.style.transform = `rotate(${newAngle}rad)`;
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setIsOscillating(true);
    setAVelocity(0); // No velocity once you let go
    setIsPlay(true);
    setReset(false);
  };

  const handleMouseDown = () => {
    setDragging(true);
    setIsOscillating(false);
    setAVelocity(0); // No velocity when you start dragging
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
  };
  
  const handleTouchEnd = () => {
    handleMouseUp();
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragging]);

  return (
    <Box
      ref={lineRef}
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        height: `${armLength}px`,
        borderLeft: "2px solid black",
        transformOrigin: "top",
        transform: ` rotate(${angle}rad)`,
      }}
    >
      <Box
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{
          position: "absolute",
          bottom: `-${ballRadius}px`, // Align the circle at the bottom of the line
          left: "50%",
          width: `${ballRadius * 2}px`,
          height: `${ballRadius * 2}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, #D9D9D9, ${color})`,
          transform: "translateX(-50%)",
          cursor: "move",
        }}
      >
        {showFBD && (
          <>
            {/* Arrow: mg * cos(theta) */}
            <Box
              style={{
                position: "absolute",
                top: `${ballRadius}px`,
                left: "50%",
                width: "2px",
                height: `${mgCosTheta}px`,
                backgroundColor: "red",
                transform: "translateX(-100%)",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  borderTop: "10px solid red",
                  borderRight: "5px solid transparent",
                  borderLeft: "5px solid transparent",
                  transform: "translateX(-40%)",
                }}
              />
              {showValues && (
                <Text
                  style={{
                    width: "max-content",
                    position: "absolute",
                    top: `${mgCosTheta + 20}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >{`mgcos(θ) = ${mgCosValue} N`}</Text>
              )}
            </Box>

            {/* Arrow: mg * sin(theta) (horizontal) */}
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: angle > 0 ? `${ballRadius}px` : "auto",
                right: angle < 0 ? `${ballRadius}px` : "auto",
                width: `${mgSinTheta}px`,
                height: "2px",
                backgroundColor: "red",
                transform: "translateY(-50%) transalteX(-1px)",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  right: angle>0 ? "-10px" : "auto",
                  left: angle < 0 ? "-10px" : "auto",
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: angle>0 ? "10px solid red":"none",
                  borderRight: angle < 0 ? "10px solid red":"none",
                  transform: "translateY(-40%)",
                }}
              />
              {showValues && (
                <Text
                  style={{
                    width: "max-content",
                    position: "relative",
                    left: angle > 0 ? `${mgSinTheta + 100}px` : "auto",
                    right: angle <= 0 ? `${mgSinTheta + 50}px` : "auto",
                    transform: "translate(-50%, -50%)",
                  }}
                >{`mgsin(θ) = ${mgSinValue} N`}</Text>
              )}
            </Box>
              {/* damping  */}
            {damping!==0 && <Box
              style={{
                position: "absolute",
                top: "50%",
                left: angle > 0 ? `${ballRadius}px` : "auto",
                right: angle < 0 ? `${ballRadius}px` : "auto",
                width: `${dampingValue}px`,
                height: "2px",
                backgroundColor: "blue",
                transform: "translateY(-50%) transalteX(-1px)",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  right: angle > 0 ? "-10px" : "auto",
                  left: angle < 0 ? "-10px" : "auto",
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: angle > 0 ? "10px solid blue":"none",
                  borderRight: angle < 0 ? "10px solid blue":"none",
                  transform: "translateY(-40%)",
                }}
              />
              {showValues && (
                <Text
                  style={{
                    width: "max-content",
                    position: "relative",
                    left: angle > 0 ? `${dampingValue}px` : "auto",
                    right: angle < 0 ? `${dampingValue}px` : "auto",
                    top: `20px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >{`Resistance = ${dampingValue.toFixed(2)} N`}</Text>
              )}
            </Box>}
            {/* Arrow: Tension (along the arm, upwards) */}
            <Box
              style={{
                position: "absolute",
                bottom: `${ballRadius}px`,
                left: "50%",
                width: "2px",
                height: `${mgCosTheta}px`,
                backgroundColor: "blue",
                transform: "translateX(-100%)",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: "-10px",
                  borderBottom: "10px solid blue",
                  borderRight: "5px solid transparent",
                  borderLeft: "5px solid transparent",
                  transform: "translateX(-40%)",
                }}
              />
              {showValues && (
                <Text
                  style={{
                    width: "max-content",
                    position: "absolute",
                    bottom: `${mgCosTheta}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >{`T = ${-mgCosValue} N`}</Text>
              )}
            </Box>

            {/* Arrow: mg (downward) */}
            <Box
              style={{
                position: "absolute",
                top: `${ballRadius}px`,
                left: "50%",
                width: "2px",
                height: `${mg}px`,
                backgroundColor: "red",
                transformOrigin: "top",
                transform: `translateX(-100%) rotate(${-angle}rad)`,
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  borderTop: "10px solid red",
                  borderRight: "5px solid transparent",
                  borderLeft: "5px solid transparent",
                  transform: "translateX(-40%)",
                }}
              />
              {showValues && (
                <Text
                  style={{
                    width: "max-content",
                    position: "absolute",
                    top: `${mg + 50}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >{`mg = ${mgValue} N`}</Text>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
