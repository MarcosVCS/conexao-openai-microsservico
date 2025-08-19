import { Router } from "express";
import { RateLimitMiddleware } from "./RateLimitMiddleware";
import { Controller } from "./Controller";
import { Service } from "../service/Service";

const controller = new Controller(new Service());
const router = Router();

// DEV: Necessário um middleware para verificar permissão do usuário

const rateLimiter = new RateLimitMiddleware(3); // Allows 3 interactions per minute

router.route("/").post(rateLimiter.protect(), controller.requestOpenAi);

export default router;
