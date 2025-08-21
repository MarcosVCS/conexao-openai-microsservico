import { Router } from "express";
import { RateLimitMiddleware } from "./RateLimitMiddleware";
import { Controller } from "./Controller";
import { Service } from "../service/Service";
import { AuthGuard } from "./AuthGuard";

const controller = new Controller(new Service());
const router = Router();

const rateLimiter = new RateLimitMiddleware(3); // Allows 3 interactions per minute

router
  .route("/")
  .post(rateLimiter.protect(), AuthGuard.authorize, controller.requestOpenAi);

export default router;
