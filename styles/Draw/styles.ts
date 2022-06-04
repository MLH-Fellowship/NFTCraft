import styled from "styled-components";

interface BtnProps {
  bg: string;
  boxColor: string;
}

export const DrawMain = styled.main`
  min-height: 100vh;
  background-color: #191919;
`;

export const DrawCanvasContainer = styled.div`
  padding: 4rem;
  height: 75vh;
`;

export const DrawCanvasToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8rem;
`;

export const DrawCanvasToolBoxButton = styled.button<BtnProps>`
  background-color: ${({ bg }) => bg};
  box-shadow: 0 8px ${({ boxColor }) => boxColor};
  border: 0;
  border-radius: 5px;
  color: #1f1a25;
  font-family: inherit;
  font-weight: bold;
  text-transform: uppercase;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  margin-right: 7.5px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px ${({ boxColor }) => boxColor};
  }
`;

export const DrawCanvasToolBox = styled.div``;

export const DrawCanvasColorDrawer = styled.div``;
