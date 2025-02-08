import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PendulumEnum } from "../../enums/pendulumEnum";

export interface Pendulum {
  color: string;
  armLength: number;
  mass: number;
  angle: number;
  thresholdAngle: number;
  kineticEnergy: number;
  potentialEnergy: number;
  angularVelocity: number;
  angularAcceleration: number;
  isHold: boolean;
  isOscillating: boolean;
  components: {
    mg: number;
    mgSinTheta: number;
    mgCosTheta: number;
    tension: number;
    drag: number;
  };
}

const initialStateForPendulum1: Pendulum = {
  color: "red",
  armLength: 400,
  mass: 40,
  angle: 0,
  thresholdAngle: 0,
  kineticEnergy: 0,
  potentialEnergy: 0,
  angularVelocity: 0,
  angularAcceleration: 0,
  isHold: false,
  isOscillating: false,
  components: {
    mg: 0,
    mgSinTheta: 0,
    mgCosTheta: 0,
    tension: 0,
    drag: 0,
  },
};
const initialStateForPendulum2: Pendulum = {
  ...initialStateForPendulum1,
  color: "blue",
  armLength: 300,
  mass: 30,
};
export interface PendulumState {
  pendulum1: Pendulum;
  pendulum2: Pendulum;
}

const initialState: PendulumState = {
  pendulum1: initialStateForPendulum1,
  pendulum2: initialStateForPendulum2,
};

export const pendulumSlice = createSlice({
  name: "pendulum",
  initialState,
  reducers: {
    resetPendulums: (state) => {
      state[PendulumEnum.PENDULUM1] = initialStateForPendulum1;
      state[PendulumEnum.PENDULUM2] = initialStateForPendulum2;
    },
    setArmLength: (
      state,
      action: PayloadAction<{ pendulumName: PendulumEnum; armLength: number }>
    ) => {
      const { pendulumName, armLength } = action.payload;
      state[pendulumName].armLength = armLength;
    },
    setMass: (
      state,
      action: PayloadAction<{ pendulumName: PendulumEnum; mass: number }>
    ) => {
      const { pendulumName, mass } = action.payload;
      state[pendulumName].mass = mass;
    },
    setAngle: (
      state,
      action: PayloadAction<{ pendulumName: PendulumEnum; angle: number }>
    ) => {
      const { pendulumName, angle } = action.payload;
      state[pendulumName].angle = angle;
    },
    setThresholdAngle: (
      state,
      action: PayloadAction<{
        pendulumName: PendulumEnum;
        thresholdAngle: number;
      }>
    ) => {
      const { pendulumName, thresholdAngle } = action.payload;
      state[pendulumName].thresholdAngle = thresholdAngle;
    },
    setKineticEnergy: (
      state,
      action: PayloadAction<{
        pendulumName: PendulumEnum;
        kineticEnergy: number;
      }>
    ) => {
      const { pendulumName, kineticEnergy } = action.payload;
      state[pendulumName].kineticEnergy = kineticEnergy;
    },
    setPotentialEnergy: (
      state,
      action: PayloadAction<{
        pendulumName: PendulumEnum;
        potentialEnergy: number;
      }>
    ) => {
      const { pendulumName, potentialEnergy } = action.payload;
      state[pendulumName].potentialEnergy = potentialEnergy;
    },
    setAngularVelocity: (
      state,
      action: PayloadAction<{
        pendulumName: PendulumEnum;
        angularVelocity: number;
      }>
    ) => {
      const { pendulumName, angularVelocity } = action.payload;
      state[pendulumName].angularVelocity = angularVelocity;
    },
    setAngularAcceleration: (
      state,
      action: PayloadAction<{
        pendulumName: PendulumEnum;
        angularAcceleration: number;
      }>
    ) => {
      const { pendulumName, angularAcceleration } = action.payload;
      state[pendulumName].angularAcceleration = angularAcceleration;
    },
    setIsHold: (
      state,
      action: PayloadAction<{ pendulumName: PendulumEnum; isHold: boolean }>
    ) => {
      const { pendulumName, isHold } = action.payload;
      state[pendulumName].isHold = isHold;
    },
    setIsOscillating: (
      state,
      action: PayloadAction<{
        pendulumName: PendulumEnum;
        isOscillating: boolean;
      }>
    ) => {
      const { pendulumName, isOscillating } = action.payload;
      state[pendulumName].isOscillating = isOscillating;
    },
    setComponents: (
      state,
      action: PayloadAction<{
        pendulumName: PendulumEnum;
        components: {
          mg: number;
          mgSinTheta: number;
          mgCosTheta: number;
          tension: number;
          drag: number;
        };
      }>
    ) => {
      const { pendulumName, components } = action.payload;
      state[pendulumName].components = components;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetPendulums,
  setArmLength,
  setMass,
  setAngle,
  setThresholdAngle,
  setKineticEnergy,
  setPotentialEnergy,
  setAngularVelocity,
  setAngularAcceleration,
  setIsHold,
  setIsOscillating,
  setComponents,
} = pendulumSlice.actions;

export default pendulumSlice.reducer;
