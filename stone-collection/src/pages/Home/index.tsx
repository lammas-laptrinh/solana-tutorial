import HomeStyle from "./home.module.css";
import Banner from "../../assets/banner.jpg";
import useHome from "./useHome";
import { Button, Input, Space } from "antd";

import { WalletOutlined } from "@ant-design/icons";
import Grid from "../../components/Grid";

export default function Home() {
  const {
    isLoading,
    walletAddress,
    inputText,
    onInputChange,
    onSubmit,
    onConnectWallet,
  } = useHome();

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

      {walletAddress !== "" && (
        <Space direction="vertical" size="middle">
          <Space.Compact style={{ width: "80%" }}>
            <Input
              value={inputText}
              onChange={onInputChange}
            />
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space.Compact>
          <Grid stones={[]} />
        </Space>
      )}
    </div>
  );
}
