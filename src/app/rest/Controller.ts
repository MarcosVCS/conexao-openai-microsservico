import type { Request, Response } from "express";
import { HttpStatus } from "../common/enums/HttpStatus";
import { ResponseDTO } from "../dto/ResponseDTO";
import { RequestDTO } from "../dto/RequestDTO";
import { Service } from "../service/Service";
import CustomError from "../common/classes/CustomError";

export class Controller {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  requestOpenAi = async (req: Request, res: Response) => {
    try {
      const requestDTO = new RequestDTO(req);
      const resultado = await this.service.interactOpenAi(requestDTO);
      const responseDTO = new ResponseDTO(resultado);

      res.status(HttpStatus.Success).json(responseDTO);
    } catch (e) {
      console.error(e);
      const errorStatus =
        e instanceof CustomError ? e.status : HttpStatus.ServerError;

      return res.status(errorStatus).json({
        success: false,
        error: e,
      });
    }
  };
}
