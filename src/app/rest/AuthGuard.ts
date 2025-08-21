import { Request, Response, NextFunction } from "express";
import jwtLib from "jsonwebtoken";
import { HttpStatus } from "../common/enums/HttpStatus";

export class AuthGuard {
  static authorize(req: Request, res: Response, next: NextFunction) {
    const JWT_KEY = process.env.JWT_SECRET ?? "";

    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");

        if (authorization[0] !== "Bearer" || !authorization[1]) {
          return res
            .status(HttpStatus.NotAuthenticated)
            .json({ error: { message: "Invalid Token" } });
        }

        res.locals.jwt = jwtLib.verify(authorization[1], JWT_KEY);
      } catch (error) {
        return res
          .status(HttpStatus.NotAuthenticated)
          .json({ error: { message: "Not Authorized" } });
      }
    } else {
      return res.status(HttpStatus.NotAuthenticated).json({
        error: { message: "Missing authorization header" },
      });
    }

    next();
  }
}
