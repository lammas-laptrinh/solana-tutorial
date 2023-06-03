# 🤔 What's Solana?

### Programs (Solana Programs)

- Trên solana smart contract được gọi là programs.
- Solana programs là môt phần code chạy ở trên blockchain.
- Blockchain là nơi tất cả mọi người có thể thực thi code với một khoản phí.
- Blockchain tương tự như AWS hay heroku, vercel. Nhưng thay vì được thực thi bởi các tập đoàn lớn thì các chain này được thực thi bởi các thợ đào (miner).
- Trong thế giới solana thì các miner được gọi là "Validator".

### Accounts

- Trên solana, programs là stateless. "Điều này khác hoàn toàn Ethereum".
- Trên Ethereum smart contrat và contract trực tiếp quản lý state là nơi ta có thể thực sự lưu trữ dữ liệu bằng biến trực tiếp trên contract.
- Trên solana, cách thức hoạt động của program là người dùng sở hữu "accounts" và các program này tương tác với account mà người dùng sở hữu. Một người dùng có thể sở hữu hàng nghìn account.
- Cách hiểu đơn giản thì account tương tự như một file chứa dữ liệu của người dùng. 
bản chấn program không chứa dữ liệu mà các program sẽ đọc dữ liệu từ các account.

### 👀 "Should I use Solana or Ethereum?"
- Mỗi thằng có một điểm mạnh và mục đích khác nhau.

- Ví dụ: khi nói một FE framework tốt nhất thì không có cái nào cả mà chỉ tuỳ vào mục đích ta muốn làm gì mà đưa ra lựa chọn phù hợp nhất.

- Thằng solana này điểm mạnh là nhanh và phí gas rẻ.
### ⛓ Cross chain future

- Các blockchain khác nhau bình thường không thể giao tiếp để chuyển đổi dữ liệu cho nhau.
- Nhưng có [Bridges](https://wiki.polkadot.network/docs/learn-bridges?utm_source=buildspace.so&utm_medium=buildspace_project) nó giúp các chain khác nhau có thể giao tiếp với nhau.
-Ví dụ: Có thể mua NFT của Ethereum rồi chuyển sang blockchain của solana.