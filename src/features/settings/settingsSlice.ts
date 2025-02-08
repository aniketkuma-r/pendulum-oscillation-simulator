import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../../enums/language.ts";

export interface SettingsState {
  isSecondPendulum: boolean;
  dragCoefficient: number;
  isFBDs: boolean;
  isReset: boolean;
  isOn: boolean;
  playbackSpeed: number;
  language: Language;
  isStopwatch: boolean;
}

const initialState: SettingsState = {
  isSecondPendulum: false,
  dragCoefficient: 0,
  isFBDs: false,
  isReset: false,
  isOn: false,
  playbackSpeed: 1,
  language: Language.ENGLISH,
  isStopwatch: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetSettings: (state) => {
      state.isSecondPendulum = false;
      state.dragCoefficient = 0;
      state.isFBDs = false;
      state.isReset = true;
      state.isOn = false;
      state.playbackSpeed = 1;
      state.isStopwatch = false;
    },
    togglePlayPause: (state) => {
      state.isOn = !state.isOn;
      state.isReset = false;
    },
    setIsOn: (state, action: PayloadAction<boolean>) => {
      state.isOn = action.payload;
      state.isReset = false;
    },
    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      const speed = [0.25, 0.5, 1, 2];
      let index = speed.indexOf(action.payload);
      let newIndex = (index + 1) % speed.length;
      state.playbackSpeed = speed[newIndex];
    },
    displayStopwatch: (state) => {
      state.isStopwatch = true;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setDragCoefficient: (state, action: PayloadAction<number>) => {
      state.dragCoefficient = action.payload;
    },
    showFBDs: (state, action: PayloadAction<boolean>) => {
      state.isFBDs = action.payload;
    },
    showSecondPendulum: (state, action: PayloadAction<boolean>) => {
      state.isSecondPendulum = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetSettings,
  togglePlayPause,
  setIsOn,
  setPlaybackSpeed,
  displayStopwatch,
  setLanguage,
  setDragCoefficient,
  showFBDs,
  showSecondPendulum,
} = settingsSlice.actions;

export default settingsSlice.reducer;
