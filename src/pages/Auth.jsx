import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../themes/useTheme";
import WebFont from "webfontloader";
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginFormWrapper = styled.div`
  width: 400px;
  background: rgba(255, 255, 255, 0.8);

  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
`;

const LoginFormHeader = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  border-radius: 8px;
  font-weight: 400;
  border: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;

  font-weight: 600;
  cursor: pointer;
`;

const LoginScreen = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { getFonts } = useTheme();
  const [bgColor, setBgColor] = useState("");
  const [txtFont, setTxtFont] = useState("");
  const [userText, setuserText] = useState("");
  const [userBg, setuserBg] = useState("");
  const [senderText, setsenderText] = useState("");
  const [senderBg, setsenderBg] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      const value = {
        id: "T_001",
        name: "Dark",
        colors: {
          body: "#18181a",
          user: {
            text: "#aad3fb",
            body: "#136dfe",
          },
          sender: {
            text: "#c7c6cb",
            body: "#1f1f23",
          },
        },
        font: "Roboto",
      };

      window.localStorage.setItem("theme", JSON.stringify(value));
    } else console.log("nope");
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
    const getData = localStorage.getItem("theme");
    const actualData = JSON.parse(getData);
    console.log(actualData);

    setBgColor(actualData.colors.body);
    setTxtFont(actualData.font);
    setuserText(actualData.colors.user.text);
    setuserBg(actualData.colors.user.body);
    setsenderText(actualData.colors.sender.text);
    setsenderBg(actualData.colors.sender.body);
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("email", email);

    navigate("/chat");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: bgColor,
      }}
    >
      <LoginContainer>
        <LoginFormWrapper
          style={{
            backgroundColor: userBg,
          }}
        >
          <LoginFormHeader>Login</LoginFormHeader>
          <form onSubmit={handleSubmit}>
            <FormField
              style={{
                backgroundColor: userBg,
              }}
            >
              <Label
                style={{
                  color: userText,
                }}
              >
                Email:
              </Label>
              <Input
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </FormField>
            <FormField>
              <Label>Password:</Label>
              <Input
                type="password"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
                required
              />
            </FormField>

            <SubmitButton
              style={{
                backgroundColor: userText,
                color: userBg,
              }}
              type="submit"
            >
              Login
            </SubmitButton>
          </form>
        </LoginFormWrapper>
      </LoginContainer>
    </div>
  );
};

export default LoginScreen;
