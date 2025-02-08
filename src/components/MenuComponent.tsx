import { ActionIcon, Box, Menu, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import { BiReset } from "react-icons/bi";
import { FaPlay, FaPause, FaInfo, FaUserCog } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { getTextByLanguage } from "../utils/PendulumEnumFunction";
import { MenuItems } from "../enums/menuItems";
import { useEffect } from "react";
import Information from "./Information";
import Preferences from "./Preferences";
import { useAppSelector, useAppDispatch } from "../app/hooks.ts";
import {
  displayStopwatch,
  SettingsState,
  togglePlayPause,
  setPlaybackSpeed,
  resetSettings,
} from "../features/settings/settingsSlice.ts";
import Options from "./Options.tsx";
import Controls from "./Controls.tsx";
import { resetPendulums } from "../features/pendulum/pendulumSlice.ts";
import EnergyGraph from "./EnergyGraph.tsx";

const MenuComponent = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const settings = useAppSelector(
    (state: { settings: SettingsState }) => state.settings
  );
  const dispatch = useAppDispatch();

  const menuItems = [
    { id: MenuItems.RESET, label: "press 'R' to reset the configurations", icon: <BiReset /> },
    { id: MenuItems.PLAY, label: "press 'spacebar' for play/pause", icon: <FaPlay /> },
    { id: MenuItems.PLAYBACK_SPEED, label: "playback speed for simulation", icon: null },
    {
      id: MenuItems.SHOW_PREFERENCES_MODAL, label: "prefrences",
      icon: <FaUserCog />,
    },
    { id: MenuItems.SHOW_INFORMATION_MODAL, label: "Theory", icon: <FaInfo /> },
  ];
  if (isMediumScreen)
    menuItems.push({ id: MenuItems.SHOW_MORE, label: "Show more", icon: <SlOptionsVertical /> });

  if (settings.isOn) menuItems[1] = { id: MenuItems.PAUSE, label: "press 'spacebar' for play/pause", icon: <FaPause /> };

  const handleMenuItemClick = (id: MenuItems) => {
    switch (id) {
      case MenuItems.RESET:
        dispatch(resetSettings());
        dispatch(resetPendulums());
        break;
      case MenuItems.PLAY:
        dispatch(togglePlayPause());
        break;
      case MenuItems.PAUSE:
        dispatch(togglePlayPause());
        break;
      case MenuItems.PLAYBACK_SPEED:
        dispatch(setPlaybackSpeed(settings.playbackSpeed));
        break;
      case MenuItems.SHOW_STOPWATCH:
        dispatch(displayStopwatch());
        break;
      case MenuItems.SHOW_INFORMATION_MODAL:
        modals.open({
          title: getTextByLanguage({
            key: "INFORMATION",
            LanguageId: settings.language,
          }),
          children: <Information />,
        });
        break;
      case MenuItems.SHOW_PREFERENCES_MODAL:
        modals.open({
          title: getTextByLanguage({
            key: "PREFERENCES",
            LanguageId: settings.language,
          }),
          children: <Preferences />,
        });
        break;
      case MenuItems.SHOW_ENERGY_GRAPH_MODAL:
        modals.open({
          title: getTextByLanguage({
            key: "ENERGY_GRAPH",
            LanguageId: settings.language,
          }),
          children: <EnergyGraph />,
        });
        break;
      case MenuItems.SHOW_CONTROLS_MODAL:
        modals.open({
          title: getTextByLanguage({
            key: "CONTROLS",
            LanguageId: settings.language,
          }),
          children: <Controls />,
        });
        break;
      case MenuItems.SHOW_OPTIONS_MODAL:
        modals.open({
          title: getTextByLanguage({
            key: "OPTIONS",
            LanguageId: settings.language,
          }),
          children: <Options />,
        });
        break;

      default:
        break;
    }
  };

  // EventListener for play/pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      (e.code === "Space" || e.code === "Enter") && dispatch(togglePlayPause());
      e.key.toLowerCase() === "r" && handleMenuItemClick(MenuItems.RESET);
    };
    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, []);

  return (
    <Box
      style={{
        position: "absolute",
        left: "50%",
        bottom: "0",
        transform: "translateX(-50%)",
        zIndex: 10,
        padding: isMediumScreen ? "4px" : "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: "10px",
      }}
    >
      {menuItems.map((item, index) =>
        item.id === MenuItems.SHOW_MORE ? (
          <Menu shadow="md" width={200} key={index}>
            <Menu.Target>
              <ActionIcon
                key={index}
                color="indigo"
                variant="outline"
                size="xl"
                radius="lg"
                aria-label="Settings"
              >
                {item.icon}
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() =>
                  handleMenuItemClick(MenuItems.SHOW_ENERGY_GRAPH_MODAL)
                }
              >
                {getTextByLanguage({
                  key: "ENERGY_GRAPH",
                  LanguageId: settings.language,
                })}
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  handleMenuItemClick(MenuItems.SHOW_CONTROLS_MODAL)
                }
              >
                {getTextByLanguage({
                  key: "CONTROLS",
                  LanguageId: settings.language,
                })}
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  handleMenuItemClick(MenuItems.SHOW_OPTIONS_MODAL)
                }
              >
                {getTextByLanguage({
                  key: "OPTIONS",
                  LanguageId: settings.language,
                })}
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item
                onClick={() => handleMenuItemClick(MenuItems.SHOW_STOPWATCH)}
              >
                {getTextByLanguage({
                  key: "ADD_STOPWATCH",
                  LanguageId: settings.language,
                })}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Tooltip label={item.label}>
            <ActionIcon
              key={index}
              color="indigo"
              variant="filled"
              size="xl"
              radius="lg"
              aria-label="Settings"
              onClick={() => handleMenuItemClick(item.id)}
            >
              {item.id === MenuItems.PLAYBACK_SPEED ? (
                <Text>{settings.playbackSpeed}X</Text>
              ) : (
                item.icon
              )}
            </ActionIcon>
          </Tooltip>
        )
      )}
    </Box>
  );
};

export default MenuComponent;
