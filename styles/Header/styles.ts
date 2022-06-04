import Link from "next/link";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: #111;
`;

export const HeaderText = styled.h1`
  font-size: 3rem;
  color: #fff;
  font-weight: bold;

  & span {
    background: radial-gradient(circle at 25% 30%, #f1c909, transparent 40%),
      radial-gradient(circle at 90% 10%, #1bc9e1, transparent 50%),
      radial-gradient(circle at 70% 60%, #e6327f, transparent 30%),
      linear-gradient(45deg, #a44129, #b61264, #712ead, #0fabbd);

    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    margin-left: 3px;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderUL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
`;

export const HeaderLI = styled.li`
  margin-right: 3rem;
  a {
    color: #ccc;
    text-decoration: none;
    font-size: 1.75em;

    &:hover {
      color: #0fabbd;
    }
  }
`;

export const HeaderLink = styled(Link)``;

export const HeaderButton = styled.button`
  background: radial-gradient(circle at 25% 30%, #f1c909, transparent 40%),
    radial-gradient(circle at 90% 10%, #1bc9e1, transparent 50%),
    radial-gradient(circle at 70% 60%, #e6327f, transparent 30%),
    linear-gradient(45deg, #a44129, #b61264, #712ead, #0fabbd);
  font-weight: bold;
  padding: 1.25rem;
  font-size: 1.6rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;
