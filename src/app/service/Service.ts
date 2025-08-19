import OpenAI from "openai";
import { HttpStatus } from "../common/enums/HttpStatus";
import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../common/classes/CustomError.js";
import { Errors } from "../common/enums/Errors";
import { Consulta } from "../model/Consulta";

export class Service {
  openai: OpenAI;

  constructor() {
    const openAiKey = process.env.OPEN_AI_KEY;
    this.openai = new OpenAI({ apiKey: openAiKey });
  }

  interactOpenAi = async (requestDTO: RequestDTO) => {
    const consulta = new Consulta(requestDTO).validarRequest();

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
      throw new CustomError(
        Errors.ERRO_GPT,
        HttpStatus.ServerError,
        e as Error
      );
    }
  };
}
