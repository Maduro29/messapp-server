// Yêu cầu module Express
var express = require("express");

// Tạo một ứng dụng Express
var app = express();

// Xử lý yêu cầu GET đến đường dẫn '/'
app.get("/", function (request, response) {
  response.send("Hello World");
});

// Bắt đầu máy chủ
app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
