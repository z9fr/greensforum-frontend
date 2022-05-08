import React, { useState, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import {
  MantineProvider,
  ColorSchemeProvider,
  Text,
  Modal,
  TextInput,
  Kbd,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./index.css";

import { useLocalStorage } from "@mantine/hooks";
import { HeaderMiddle } from "./components/Header/Header";
import attributes from "./components/Header/attributes.json";
import { isValidToken } from "./authtoken";
import { Search } from "tabler-icons-react";
import { useHotkeys } from "@mantine/hooks";

function App() {
  const [colorScheme, setColorScheme] = useState("dark");
  const [saveUser, setSaveUser] = useLocalStorage({ key: "user" });
  const [opened, setOpened] = useState(false);

  useHotkeys([
    ["mod+J", () => console.log("Toggle color scheme")],
    ["ctrl+K", () => setOpened(true)],
    ["alt+mod+shift+X", () => console.log("Rick roll")],
  ]);

  const toggleColorScheme = (value) =>
    setColorScheme(value || colorScheme === "dark");

  const rightSection = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Kbd>Ctrl</Kbd>
      <span style={{ margin: "0 5px" }}>+</span>
      <Kbd>K</Kbd>
    </div>
  );

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-center">
          <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            onClose={() => setOpened(false)}
            withCloseButton={false}
            size="xl"
            radius="sm"
            opened={opened}
          >
            <form action="/search" method="GET">
              <TextInput
                placeholder="Search Questions"
                variant="default"
                size="xl"
                icon={<Search size={20} />}
                name="q"
                rightSectionWidth={90}
                rightSection={rightSection}
              />
            </form>
            <br />

            <Text> some information about how to search </Text>
          </Modal>

          <HeaderMiddle
            links={attributes}
            isLoggedIn={isValidToken()}
            loggedInUser={saveUser}
            loading={false}
          />
        </NotificationsProvider>
        <Router />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
