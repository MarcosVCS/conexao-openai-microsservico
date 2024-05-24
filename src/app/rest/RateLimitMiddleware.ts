import rateLimit from 'express-rate-limit';

export class RateLimitMiddleware {
    private rateLimiter;

    constructor(tentativasPorMinuto: number) {
        this.rateLimiter = rateLimit({
            windowMs: 60 * 1000, // 1 minuto
            max: tentativasPorMinuto,
            message:
                'Limite de requisições excedido. Espere um pouco e tente novamente.',
        });
    }

    protegerRota() {
        return this.rateLimiter;
    }
}
