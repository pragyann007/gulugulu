"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlQuee = void 0;
var bullmq_1 = require("bullmq");
exports.crawlQuee = new bullmq_1.Queue("crawl-queue", {
    connection: {
        host: "localhost",
        port: 6379
    }
});
