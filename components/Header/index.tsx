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
import { setWalletAddress } from "../../redux/reducer/wallet";
import { useAppDispatch } from "../../hooks/hooks";

const Header: NextPage = () => {
  const dispatch = useAppDispatch();
  const onSetWalletAddress = (walletAddress: string) =>
    dispatch(setWalletAddress(walletAddress));

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log(response, solana);
      console.log("Connected with Public Key:", response.publicKey.toString());
      onSetWalletAddress(response.publicKey.toString());
    }
  };

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
        <HeaderButton onClick={connectWallet}>Connect Wallet</HeaderButton>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
