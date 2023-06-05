import React from "react";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import WebFont from "webfontloader";
import { GlobalStyles } from "../themes/GlobalStyles";
import { useTheme } from "../themes/useTheme";
import ThemeSelector from "../components/ThemePicker/ThemeSelector";
import Dialog from "../components/ThemePicker/Dialog";
import CreateThemeContent from "../components/ThemePicker/CreateThemeContent";

const Container = styled.div`
  margin: 5px auto 5px auto;
`;

const Settings = () => {
  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [showDialog, setShowDialog] = useState(false);
  const [newTheme, setNewTheme] = useState();

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
  });

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  const manageDialog = () => {
    setShowDialog(!showDialog);
  };

  const createTheme = (newTheme) => {
    console.log(newTheme);
    setShowDialog(false);
    setNewTheme(newTheme);
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: selectedTheme.colors.sender.body,
        }}
      >
        {themeLoaded && (
          <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
            <Container
              style={{
                fontFamily: selectedTheme.font,
                backgroundColor: selectedTheme.colors.sender.body,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1
                  style={{
                    color: selectedTheme.colors.sender.text,
                  }}
                >
                  Theming System
                </h1>

                <button className="btn" onClick={manageDialog}>
                  Create a Theme
                </button>
              </div>
              <Dialog
                header="Create a Theme"
                body={<CreateThemeContent create={createTheme} />}
                open={showDialog}
                callback={manageDialog}
              />
              <ThemeSelector setter={setSelectedTheme} newTheme={newTheme} />
            </Container>
          </ThemeProvider>
        )}
      </div>
    </>
  );
};

export default Settings;
