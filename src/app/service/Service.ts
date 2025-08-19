import OpenAI from "openai";
import { HttpStatus } from "../common/enums/HttpStatus";
import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../common/classes/CustomError.js";
import { Errors } from "../common/enums/Errors";
import { GPTQuery } from "../model/GPTQuery";

export class Service {
  openai: OpenAI;

  constructor() {
    const openAiKey = process.env.OPEN_AI_KEY;
    this.openai = new OpenAI({ apiKey: openAiKey });
  }

  interactWithOpenAi = async (requestDTO: RequestDTO) => {
    const query = new GPTQuery(requestDTO).validarRequest();

    // DEV: Criar uma classe para isso?
    try {
      await this.openai.chat.completions.create({
        model: query.getGptModel(),
        messages: query.getSequenciaMensagens(),
        max_tokens: query.getMaxTokens(),
        temperature: query.getTemperature(),
        response_format: { type: "json_object" },
        tools: query.getFunctionSpecs(),
      });
    } catch (e) {
      console.error(e);
      throw new CustomError(
        Errors.GPT_SERVICE_ERROR,
        HttpStatus.ServerError,
        e as Error
      );
    }
  };
}
