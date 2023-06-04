import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../themes/useTheme';
import WebFont from "webfontloader";
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #f3f5f9, #ced6e5);
`;

const LoginFormWrapper = styled.div`
  width: 400px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
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
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: ${({ inputColor }) => inputColor};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #4b7bec;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const LoginScreen = () => {

// color matching starts
const { getFonts } = useTheme();
  const [bgColor, setBgColor] = useState("");
  const [txtFont, setTxtFont] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const[bgcolor2,setBgColor2]=useState("")
  const[chatText,setChatText]=useState("")





  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [inputColor, setInputColor] = useState('#f0f3f7');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedColor = localStorage.getItem('inputColor');


    if (storedEmail) setEmail(storedEmail);
    if (storedColor) setInputColor(storedColor);


//color matches

WebFont.load({
  google: {
    families: getFonts(),
  },
});
const getData = localStorage.getItem("theme");
const actualData = JSON.parse(getData);
console.log(actualData);

setHeaderColor(actualData.colors.text);
setTxtFont(actualData.font);
setBgColor(actualData.colors.body);
setChatText(actualData.colors.button.text)
setBgColor2(actualData.colors.button.background)



console.log(headerColor);

  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('email', email);
    
    navigate("/chat")
  };

  return (
    <LoginContainer>
      <LoginFormWrapper style={{
        backgroundColor:bgColor
      }} >
        <LoginFormHeader>Login</LoginFormHeader>
        <form onSubmit={handleSubmit}>
          <FormField 
            style={{
              backgroundColor:bgcolor2
            }}
          >
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              inputColor={inputColor}
              required
            />
          </FormField>
          <FormField>
            <Label>Password:</Label>
            <Input
              type="password"
              inputColor={inputColor}
              required
            />
          </FormField>
          
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
      </LoginFormWrapper>
    </LoginContainer>
  );
};

export default LoginScreen;
