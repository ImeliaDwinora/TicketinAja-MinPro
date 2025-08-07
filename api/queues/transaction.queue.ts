import { Queue } from "bullmq";
import { redisConnection } from "../configs/redis.config

export const orderQueue = new Queue("order-queue", {
  connection: redisConnection,
});
