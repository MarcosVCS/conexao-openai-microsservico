import OpenAI from "openai";
import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../errors/CustomError";
import { errorType } from "../errors/errorType";
import { Consulta } from "../model/Consulta";

export class Service {
  private openai: OpenAI;

  constructor() {}

  consultarOpenAI = async (requestDTO: RequestDTO) => {
    const consulta = new Consulta(requestDTO).validarRequest();

    // CONSULTA OPENAI
    this.openai = new OpenAI({ apiKey: consulta.getOpenAIKey() });

    try {
      await this.openai.chat.completions.create({
        model: consulta.getGptModel(),
        messages: consulta.getSequenciaMensagens(),
        max_tokens: consulta.getMaxTokens(),
        temperature: consulta.getTemperature(),
        response_format: { type: "json_object" },
        tools: consulta.getFunctionSpecs(),
      });

    } catch (e) {
      console.error(e);
      throw new CustomError(errorType.ERRO_GPT);
    }
  };
}
