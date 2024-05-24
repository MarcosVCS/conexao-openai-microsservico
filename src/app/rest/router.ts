import { Router } from 'express';
import { RateLimitMiddleware } from './RateLimitMiddleware';
import { Controller } from './Controller';
import { Service } from '../service/Service';

const controller = new Controller(new Service)

const router = Router();

const rateLimiter = new RateLimitMiddleware(3); // Permite somente 3 consultas por minuto

router
    .route('/')
    .post(
        rateLimiter.protegerRota(),
        controller.consultarOpenAI
    );

export default router;
