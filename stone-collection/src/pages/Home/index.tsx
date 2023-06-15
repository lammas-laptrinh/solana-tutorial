import HomeStyle from "./home.module.css";
import Banner from "../../assets/banner.jpg";
import useHome from "./useHome";
import { Button, Input, Space, Layout } from "antd";
const { Header, Content } = Layout;
import {
  WalletOutlined,
  FileAddOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import Grid from "../../components/Grid";
import { createGifAccount } from "../../utils";

export default function Home() {
  const {
    isLoading,
    walletAddress,
    inputText,
    stones,
    onInputChange,
    onSubmit,
    onConnectWallet,
  } = useHome();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        {walletAddress === "" && (
          <Button
            className={HomeStyle.AddButton}
            type="primary"
            onClick={onConnectWallet}
            loading={isLoading}
          >
            <WalletOutlined /> Connect to wallet
          </Button>
        )}
      </Header>
      <Content className={HomeStyle.container}>
        <Space
          style={{ width: "100%" }}
          direction="vertical"
          size="small"
          align="center"
        >
          <h2 className="header">🖼 GemStone Portal</h2>
          <img className={HomeStyle.banner} src={Banner} />
          <p className={HomeStyle.subText}>
            View your STONE collection in the metaverse ✨
          </p>

          {walletAddress !== "" ? (
            <Space direction="vertical" size="large" align="center">
              <Space.Compact direction="vertical" size="middle">
                <Input
                  className={HomeStyle.HomeInput}
                  value={inputText}
                  onChange={onInputChange}
                  placeholder="Paste image url here..."
                />
              </Space.Compact>
              <Button
                className={HomeStyle.AddButton}
                icon={<FileAddOutlined />}
                onClick={onSubmit}
                type="primary"
              >
                ADD
              </Button>
              <Grid stones={stones} />
            </Space>
          ) : (
            stones === null && (
              <Button
                className={HomeStyle.AddButton}
                type="primary"
                onClick={createGifAccount}
                loading={isLoading}
                icon={<AccountBookOutlined />}
              >
                Do One-Time Initialization For Collection Program Account
              </Button>
            )
          )}
        </Space>
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
}
