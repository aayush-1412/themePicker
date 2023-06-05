import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { generate } from "shortid";
import _ from "lodash";
import { useTheme } from "../../themes/useTheme";

const Container = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 3rem;
`;

const Section = styled.div`
  vertical-align: top;
  margin-right: 10px;
  padding: 10px;
`;

const Row = styled.div`
  padding: 5px;
`;

const Preview = styled.div`
  border: 1px solid #000000;
  border-radius: 4px;
  width: 100%;
  height: 200px;
  padding: 5px;
`;

const CreateThemeContent = (props) => {
  const defaultTheme = {
    themeName: "",
    bgColor: "#0b0c0b",
    usertextColor: "#000000",
    sendertextColor: "#c7c6cb",
    userBgColor: "#cdd8dd",
    senderBgColor: "#1f201f",
    font: "Roboto",
  };
  const { getFonts } = useTheme();
  const [state, setState] = useState(defaultTheme);

  const [newTheme, setNewTheme] = useState({});

  const getThemeObj = () => {
    const themeObj = {};
    themeObj[_.camelCase(state.themeName)] = {
      id: generate(),
      name: state.themeName,
      colors: {
        body: state.bgColor,

        user: {
          text: state.usertextColor,
          body: state.userBgColor,
        },
        sender: {
          text: state.sendertextColor,
          body: state.senderBgColor,
        },
      },
      font: state.font,
    };
    return themeObj;
  };

  useEffect(() => {
    const updated = getThemeObj();
    setNewTheme({ ...updated });
  }, [state]);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const createTheme = () => {
    setState({ ...defaultTheme });
    props.create(newTheme);
  };

  return (
    <>
      <button
        style={{ float: "right" }}
        onClick={createTheme}
        disabled={state.themeName.trim().length === 0}
      >
        Let's Create
      </button>
      <Container>
        <Section>
          <Row>
            <label htmlFor="th_name">Theme Name:</label>{" "}
            <input
              type="text"
              id="themeName"
              name="themeName"
              value={state.themeName}
              placeholder="Specify a name"
              onChange={handleChange}
            />
          </Row>
          <Row>
            <label htmlFor="bg_color">Background Color:</label>{" "}
            <input
              type="color"
              id="bg_color"
              name="bgColor"
              value={state.bgColor}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <label htmlFor="user_text_color">Your Chat text Color:</label>{" "}
            <input
              type="color"
              id="user_txt_color"
              name="usertextColor"
              value={state.usertextColor}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <label htmlFor="user_bg_color">Your Chat Background Color:</label>{" "}
            <input
              type="color"
              id="user_bg_color"
              name="userBgColor"
              value={state.userBgColor}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <label htmlFor="sender_text_color">Recieved Chat text Color:</label>{" "}
            <input
              type="color"
              id="sender_text_color"
              name="sendertextColor"
              value={state.sendertextColor}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <label htmlFor="sender_bg_color">
              Recieved Chat Background Color:
            </label>{" "}
            <input
              type="color"
              id="sender_bg_color"
              name="senderBgColor"
              value={state.senderBgColor}
              onChange={handleChange}
            />
          </Row>

          <Row>
            <label htmlFor="font">Select a Font:</label>{" "}
            <select
              name="font"
              id="font"
              onChange={handleChange}
              value={state.font}
            >
              {getFonts().map((font, index) => (
                <option value={font} key={index}>
                  {font}
                </option>
              ))}
            </select>
          </Row>
        </Section>

        <Section>
          <span>
            <b>Preview</b>
          </span>
          <Preview
            style={{
              borderRadius: "12px",
              backgroundColor: state.bgColor,
              fontFamily: state.font,
            }}
          >
            <button
              className="btn"
              style={{
                margin: "auto",
                borderRadius: "10px",
                backgroundColor: state.userBgColor,
                color: state.usertextColor,
                fontFamily: state.font,
              }}
            >
              I am Your Chat Bubble
            </button>{" "}
            {"  "}
            <button
              className="btn"
              style={{
                margin: "auto",
                borderRadius: "10px",
                backgroundColor: state.senderBgColor,
                color: state.sendertextColor,
                fontFamily: state.font,
              }}
            >
              I am Sender's Chat Bubble
            </button>{" "}
            {"  "}
          </Preview>
        </Section>
      </Container>
    </>
  );
};

export default CreateThemeContent;
