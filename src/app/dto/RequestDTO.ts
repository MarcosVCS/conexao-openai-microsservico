import { TFunctionSpecs, TInteracoes } from "../types/tiposConsulta";

export class RequestDTO {
  openAIKeyJwt: string;
  gptModel: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  functionSpecs: TFunctionSpecs[];
  interacoes: TInteracoes[];
  mensagem: string;

  constructor(requestData: any) {
    this.openAIKeyJwt = requestData.openAIKey;
    this.gptModel = requestData.gptModel;
    this.temperature = requestData.temperature;
    this.maxTokens = requestData.maxTokens;
    this.prompt = requestData.prompt;
    this.functionSpecs = requestData.functionSpecs;
    this.interacoes = requestData.interacoes;
    this.mensagem = requestData.mensagem;
  }

  getOpenAIKeyJwt() {
    return this.openAIKeyJwt;
  }
  getGPTModel() {
    return this.gptModel;
  }
  getTemperature() {
    return this.temperature;
  }
  getMaxTokens() {
    return this.maxTokens;
  }
  getPrompt() {
    return this.prompt;
  }
  getFunctionSpecs() {
    return this.functionSpecs;
  }
  getInteracoes() {
    return this.interacoes;
  }
  getMensagem() {
    return this.mensagem;
  }
}
