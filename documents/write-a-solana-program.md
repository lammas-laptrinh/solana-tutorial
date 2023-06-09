# ☀️ Get local Solana env running.

- sử dụng https://beta.solpg.io/ để viết solana program online.

# Hello world program 🌍️

- Viết một program hello world bằng [anchor](https://anchor-lang.com/).

- Anchor cung cấp rất nhiều cải tiến so với Native solana programs.

- Một `Rust` program cơ bản.

```rust
// Import anchor
use anchor_lang::prelude::*;

declare_id!("");

#[program]
mod hello_world {
    use super::*;

    pub fn hello(ctx: Context<Hello>) -> Result<()> {
        msg!("Hello, World!");
        Ok(())
    }
}
#[derive(Accounts)]
pub struct Hello {

}
```

### Import Anchor

- bắt đầu bằng việc import Anchor để sử dụng trong program

```rust
use anchor_lang::prelude::*;
```

### Declare Program Id

- Với anchor ta phải khai báo publicKey của program. Nó được Anchor sử dụng để tăng tính bảo mật của program.
- Chúng ta có thể dễ dàng khai báo program Id bằng function `declare_id!` ở toàn cục.

```rust
declare_id!("");
```


