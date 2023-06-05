# Connect to Solana wallet

### Installing Phantom Wallet Extension

- Sử dụng wallet [phantom](https://phantom.app/?utm_source=buildspace.so&utm_medium=buildspace_project)

- Phantom là top wallet extention cho solana và nó thực sự được chống lưng bởi solana.

### Using the Solana object

- Để web app của ta có thể giao tiếp với solana, chúng ta cần kết nối wallet của ta với nó.
- Sau khi kết nối web app vài wallet, lúc đó app của ta có quyền thực thi những function trong program. Nếu không kết nối thì app sẽ không có khả năng giao tiếp với solana blockchain.
- Việc kết nối ví tưởng tự như việc đăng nhập vài một hệ thống bất kỳ. nếu không đăng nhập ta không thể sử dụng dịch vụ của hệ thống đó.
- Sau khi đã cài phantom wallet trình duyệt nó sẽ tự động nhúng vào `window` một object đặc biệt tên là `solana`.
- Vào project triển khai các đoạn code sau để kiểm tra xem có object `solana` trong `window` chưa.

### Accessing the user's account

- Viết function kiểm tra xem đã cài phantom wallet hay chưa.

```ts
const checkIfWalletIsConnected = async () => {
  if (window?.solana?.isPhantom) {
    console.log("Phantom wallet found!");
  } else {
    alert("Solana object not found! Get a Phantom Wallet 👻");
  }
};
```

- Triển khai function trong UseEffect để nó được chạy đầu tiên khi vào page.

```tsx
export default function Home() {
  React.useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return <div className={HomeStyle.container}>index</div>;
}
```

- Mở phần `debug của trình duyệt` `tab console` Kết quả sẽ tương tự như sau

```
Phantom wallet found!       index.ts:3:12
```

- kiểm tra xem người dùng đã thực sự kết nối wallet chưa.

```tsx
const checkIfWalletIsConnected = async () => {
  if (window?.solana?.isPhantom) {
    console.log("Phantom wallet found!");
    /*
     * The solana object gives us a function that will allow us to connect
     * directly with the user's wallet
     */
    const response = await window.solana.connect({ onlyIfTrusted: true });
    console.log("Connected with Public Key:", response.publicKey.toString());
  } else {
    alert("Solana object not found! Get a Phantom Wallet 👻");
  }
};
```

### 🛍 Render connect to wallet button

- tạo một state để lưu trữ địa chỉ ví

```tsx
const [walletAddress, setWalletAddress] = React.useState<string>("");
```

- tạo một button bằng ant

```tsx
import { Button } from "antd";
import { WalletOutlined } from "@ant-design/icons";

<Button type="primary" onClick={onConnectWallet} loading={isLoading}>
  <WalletOutlined /> Connect to wallet
</Button>;
```

- Đặt một điều kiện để ẩn hiện button connect to wallet

```tsx
{
  walletAddress !== "" && (
    <Button type="primary" onClick={onConnectWallet} loading={isLoading}>
      <WalletOutlined /> Connect to wallet
    </Button>
  );
}
```

### ACTUALLY connect to wallet

- tạo function `onConnectWallet` truyền vào button connect wallet.

```ts
const onConnectWallet = async () => {
  const { solana } = window;

  if (solana) {
    setLoading(true);
    const response = await solana.connect();
    console.log("Connected with Public Key:", response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
    setLoading(false);
  }
};
```

## 🧱 Building the Image grid.

- Vì chưa viết program trên solana để trả dữ liệu về cho front-end nên sẽ handle ở local trước.
- Chuẩn bị một danh sách các hình ảnh của collection.

```ts
export const dummysStones = [
  "https://image.lexica.art/full_jpg/6832e359-3520-4c17-86c6-fb3ddb5692a5",
  "https://image.lexica.art/full_jpg/dc78b49a-bdda-4cc6-98af-0af7c3467409",
  "https://image.lexica.art/full_jpg/3498aa1a-71a7-4d36-9976-09e2d7162435",
  "https://image.lexica.art/full_jpg/ca9c1728-9c3a-4327-8f80-5438dc178b6d",
  "https://image.lexica.art/full_jpg/18ddb610-326c-4cae-b8a5-b4c3c59c6d58",
  "https://image.lexica.art/full_jpg/44597a87-09cd-46be-9209-491761961faf",
  "https://image.lexica.art/full_jpg/43f85fa9-6f19-47a5-938a-f93a52e1fda2",
];
```

### 🧪 Displaying test data

- Tạo một component để render danh sách hình ảnh của collection

```tsx
import { Col, Image, Row } from "antd";
import { dummysStones } from "../../helpers";

export default function Grid() {
  return (
    <Row justify="space-around" align="middle" gutter={[6, 6]}>
      {dummysStones.map((source, index) => {
        return (
          <Col
            className="d-flex justify-content-center"
            key={index}
            xs={{ order: 1, span: 12 }}
            sm={{ order: 2, span: 12 }}
            md={{ order: 3 }}
            lg={{ order: 4, span: 6 }}
          >
            <Image
              preview
              className="rounded-xs"
              width="100%"
              height="auto"
              src={source}
              alt={source}
            />
          </Col>
        );
      })}
    </Row>
  );
}
```

- Kế tiếp gọi Component này ở file `App.tsx` hoặc bất cứ file nào cần sử dụng nó.
- Chỉ hiển thị grid này khi người dùng đã kết nối wallet vì sau này ta sẽ lấy dữ liệu này trên account của solana nếu không được kết nối sẽ không lấy được dữ liệu.

```tsx
{
  walletAddress !== "" && <Grid />;
}
```

### 🔤 Creating a input box

- Tạo một Input để người đùng có thể thêm hình ảnh vào collection của mình.

```tsx
import { Input, Space } from "antd";
{
  walletAddress !== "" && (
    <Space direction="vertical" size="middle">
      <Space.Compact style={{ width: "40%" }}>
        <Input value={inputText} onChange={onInputChange} />
        <Button onClick={onSubmit} type="primary">
          Submit
        </Button>
      </Space.Compact>

      <Grid />
    </Space>
  );
}
```

- thêm state chứa giá trị của Input và hai function để tương tác với nó.

```ts
const [inputText, setInputText] = React.useState("");

const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputText(e.target.value);
};

const onSubmit = () => {
  console.log("inputText", inputText);
};
```
