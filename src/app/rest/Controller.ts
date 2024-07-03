import type { Request, Response } from 'express';

import { ResponseDTO } from "../dto/ResponseDTO";
import { Service } from "../service/Service";
import { RequestDTO } from '../dto/RequestDTO';

export class Controller {

    service: Service;

    constructor(service: Service){
        this.service = service;
    }
    
    consultarOpenAI = async (req: Request, res: Response) => {
        
        // SERIA TRY/CATCH MESMO?
        try {

            const requestDTO = new RequestDTO(req);

            const resultado = await this.service.consultarOpenAI(requestDTO);

            const responseDTO = new ResponseDTO(resultado);

            res.status(200).json(responseDTO);
        } catch (error) {

            // DESENVOLVER ERRO
            
        }

    }
}
