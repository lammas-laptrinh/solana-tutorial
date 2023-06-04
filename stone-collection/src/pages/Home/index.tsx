import HomeStyle from "./home.module.css";
import Banner from "../../assets/banner.jpg";
import useHome from "./useHome";
import { Button } from "antd";

import { WalletOutlined } from "@ant-design/icons";
import Grid from "../../components/Grid";

export default function Home() {
  const { isLoading, walletAddress, onConnectWallet } = useHome();

  return (
    <div className={HomeStyle.container}>
      <img className={HomeStyle.banner} src={Banner} />
      <p className="header">🖼 GemStone Portal</p>
      <p className="sub-text">View your GIF collection in the metaverse ✨</p>
      {walletAddress === "" && (
        <Button type="primary" onClick={onConnectWallet} loading={isLoading}>
          <WalletOutlined /> Connect to wallet
        </Button>
      )}
      {walletAddress !== "" && <Grid />}
    </div>
  );
}
