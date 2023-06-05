import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useTheme } from "../../themes/useTheme";
import { getFromLS } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const UserThemedChat = styled.button`
  border: 0;
  display: inline-block;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 8px;
  margin-top: 5px;
  width: 100%;
  cursor: pointer;
`;
const SenderThemedChat = styled.button`
  border: 0;
  display: inline-block;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 8px;
  margin-top: 5px;
  width: 100%;
  cursor: pointer;
`;

const Wrapper = styled.li`
  padding: 48px;
  text-align: center;
  border-radius: 12px;
  border: 1px solid #000;
  list-style: none;
`;

const Container = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  margin-top: 3rem;
  padding: 10px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Header = styled.h2`
  display: flex;
  justify-content: space-around;
`;

export default (props) => {
  const themesFromStore = getFromLS("all-themes");
  const [data, setData] = useState(themesFromStore.data);
  console.log(data);
  const [themes, setThemes] = useState([]);
  const { setMode } = useTheme();
  const navigate = useNavigate();
  const themeSwitcher = (selectedTheme) => {
    console.log(selectedTheme);
    setMode(selectedTheme);
    props.setter(selectedTheme);
    navigate("/chat");
  };

  useEffect(() => {
    setThemes(_.keys(data));
  }, [data]);

  useEffect(() => {
    props.newTheme && updateThemeCard(props.newTheme);
  }, [props.newTheme]);

  const updateThemeCard = (theme) => {
    const key = _.keys(theme)[0];
    const updated = { ...data, [key]: theme[key] };
    setData(updated);
  };

  const ThemeCard = (props) => {
    return (
      <Wrapper
        style={{
          backgroundColor: `${data[_.camelCase(props.theme.name)].colors.body}`,
          color: `${data[_.camelCase(props.theme.name)].colors.user.text}`,
          fontFamily: `${data[_.camelCase(props.theme.name)].font}`,
        }}
      >
        <UserThemedChat
          onClick={(theme) => themeSwitcher(props.theme)}
          style={{
            backgroundColor: `${
              data[_.camelCase(props.theme.name)].colors.user.body
            }`,
            color: `${data[_.camelCase(props.theme.name)].colors.user.text}`,
            fontFamily: `${data[_.camelCase(props.theme.name)].font}`,
          }}
        >
          {props.theme.name}
        </UserThemedChat>
      </Wrapper>
    );
  };

  return (
    <div>
      <Container>
        {themes.length > 0 &&
          themes.map((theme) => (
            <ThemeCard theme={data[theme]} key={data[theme].id} />
          ))}
      </Container>
    </div>
  );
};
