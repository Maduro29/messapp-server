// Yêu cầu module Express
import express from "express";
import { createUser } from "./controllers/user/createUser.js";
import bodyParser from "body-parser";
import { login } from "./controllers/user/login.js";

// Tạo một ứng dụng Express
var app = express();
app.use(bodyParser.json());

// Xử lý yêu cầu GET đến đường dẫn '/'
app.get("/", function (request, response) {
    response.send("Hello World");
});

app.get("/hello", (request, response) => {
    response.send("Hello 2");
});

// Bắt đầu máy chủ

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening on port 3000");
});

// user apis
app.post("/create-user", (req, res) => createUser(req, res));
app.post("/login", (req, res) => login(req, res));
