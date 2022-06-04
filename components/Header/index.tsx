import type { NextPage } from "next";
import {
  HeaderContainer,
  HeaderButton,
  HeaderText,
  HeaderNav,
  HeaderUL,
  HeaderLI,
  HeaderLink,
} from "./../../styles/Header/styles";

const Header: NextPage = () => {
  return (
    <HeaderContainer>
      <HeaderText>
        NFT<span>CRAFT</span>
      </HeaderText>
      <HeaderNav>
        <HeaderUL>
          <HeaderLI>
            <HeaderLink href="/">Home</HeaderLink>
          </HeaderLI>
          <HeaderLI>
            <HeaderLink href="/draw">Draw</HeaderLink>
          </HeaderLI>
          <HeaderLI>
            <HeaderLink href="/collections">Collection</HeaderLink>
          </HeaderLI>
        </HeaderUL>
        <HeaderButton>Connect Wallet</HeaderButton>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
