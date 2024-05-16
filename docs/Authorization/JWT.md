# JWT

- JWT được sử dụng mặc định cho mọi route.
- Để disable JWT auth cho một route, có thể dùng @Public
  - Các route cần dùng auth khác thì cũng dùng cái này được:
    ```js
    @Public()
    @<Other guard>
    <Controller>
    ```
    (không đúng về ngữ nghĩa mà xài vẫn ok)
- Trong controller, để truy cập thông tin user được authenticate bởi JWT, có thể dùng `req.user`.
  ```js
    @Get()
    myController(@Request req) {
        const {userId, username} = req.user;
    }
  ```