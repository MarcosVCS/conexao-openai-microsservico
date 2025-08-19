import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../common/classes/CustomError";
import { Errors } from "../common/enums/Errors";
import { HttpStatus } from "../common/enums/HttpStatus";
import { TFunctionSpecs, TInteractions } from "../common/types/interactions";
import { isValidNumber } from "../utils/numberValidation";

// DEV: TRADUZIR TUDO PARA INGLÊS

export class Consulta {
  gptModel: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  functionSpecs: TFunctionSpecs[];
  interacoes: TInteractions[];
  mensagem: string;
  resposta: string;
  sequenciaMensagens: TInteractions[];
  consultaValidada: boolean = false;

  constructor(requestDTO: RequestDTO) {
    this.gptModel = requestDTO.getGPTModel();
    this.temperature = this.validarTemperature(requestDTO.getTemperature());
    this.maxTokens = this.validarMaxTokens(requestDTO.getMaxTokens());
    this.prompt = requestDTO.getPrompt();
    // Validar
    this.functionSpecs = requestDTO.getFunctionSpecs();
    //
    this.interacoes = requestDTO.getInteracoes();
    this.mensagem = requestDTO.getMensagem();
  }

  // DEV: Desenvolver
  private formatarInteracoes() {
    this.sequenciaMensagens = [
      {
        role: "system",
        content: this.prompt,
      },
    ];

    // Push nas interações anteriores (Como virão?)

    this.sequenciaMensagens.push({ role: "user", content: this.mensagem });
  }

  private validarTemperature(temperature: any) {
    if (isValidNumber(temperature)) {
      return temperature;
    }
    throw new CustomError(
      Errors.VALIDACAO_ESPECIFICACOES_GPT,
      HttpStatus.InvalidRequest
    );
  }

  private validarMaxTokens(maxTokens: any) {
    if (isValidNumber(maxTokens)) {
      return maxTokens;
    }
    throw new CustomError(
      Errors.VALIDACAO_ESPECIFICACOES_GPT,
      HttpStatus.InvalidRequest
    );
  }

  // DEV: Desenvolver
  private validarFunctionSpecs() {
    if (this.functionSpecs) {
    }
  }

  validarRequest() {
    if (!this.gptModel || !this.temperature || !this.maxTokens) {
      throw new CustomError(
        Errors.VALIDACAO_ESPECIFICACOES_GPT,
        HttpStatus.InvalidRequest
      );
    }

    if (!this.prompt || !this.mensagem) {
      throw new CustomError(
        Errors.VALIDACAO_ATRIBUTOS_CONSULTA,
        HttpStatus.InvalidRequest
      );
    }

    this.validarFunctionSpecs();

    this.consultaValidada = true;
    return this;
  }

  getGptModel() {
    return this.gptModel;
  }

  getSequenciaMensagens() {
    return this.sequenciaMensagens;
  }

  getMaxTokens() {
    return this.maxTokens;
  }

  getTemperature() {
    return this.temperature;
  }

  getFunctionSpecs() {
    return this.functionSpecs;
  }

  setResposta(respostaGPT: string) {
    this.resposta = respostaGPT;
  }
}
