import OpenAI from "openai";
import { HttpStatus } from "../common/enums/HttpStatus";
import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../common/classes/CustomError.js";
import { Errors } from "../common/enums/Errors";
import { Interaction } from "../model/Interaction";

export class Service {
  openAiAgent: OpenAI;

  constructor() {
    const openAiKey = process.env.OPEN_AI_KEY;
    this.openAiAgent = new OpenAI({ apiKey: openAiKey });
  }

  interactWithOpenAi = async (requestDTO: RequestDTO) => {
    const query = new Interaction(requestDTO).verifyRequest();
    // DEV: GPT analisa outras coisas além de texto agora (imagens, arquivos etc.)
    // DEV: Criar uma classe para isso?
    try {
      const response = await this.openAiAgent.responses.create({
        model: query.getGptModel(),
        input: query.getInputSequence(),
        max_output_tokens: query.getMaxTokens(),
        temperature: query.getTemperature(),
        tools: query.getToolFunctionSpecs(),
      });

      return new Interaction(response).verifyResponse();
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
