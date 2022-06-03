import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NFTCraft</title>
        <meta name="description" content="Draw your NFT and mint them" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>NFTCraft</h1>
      </main>
    </div>
  );
};

export default Home;
