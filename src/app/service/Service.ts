import { RequestDTO } from "../dto/RequestDTO";
import { Consulta } from "../model/Consulta";

export class Service {
    consultarOpenAI =  async (requestDTO: RequestDTO) => {
        const consulta = new Consulta(requestDTO).validar();

        // Passar para OpenAI
    }
}