// Yêu cầu module Express
var express = require("express");

// Tạo một ứng dụng Express
var app = express();

// Xử lý yêu cầu GET đến đường dẫn '/'
app.get("/", function (request, response) {
  response.send("Hello World");
});

// Bắt đầu máy chủ

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server listening on port 3000");
});
