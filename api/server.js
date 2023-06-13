// server için gerekli olanları burada ayarlayın

const express = require("express");
const cors = require("cors");

const server = express();
const useCors = cors();

server.use(express.json());
server.use(cors());

// posts router'ını buraya require edin ve bağlayın
const postsRouter = require("./posts/posts-router");

server.use("/api/posts", postsRouter);

module.exports = server;
