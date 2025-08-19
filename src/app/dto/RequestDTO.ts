import { TFunctionSpecs, TInteractions } from "../common/types/interactions";

export class RequestDTO {
  gptModel: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  functionSpecs: TFunctionSpecs[];
  interacoes: TInteractions[];
  mensagem: string;

  constructor(requestData: any) {
    this.gptModel = requestData.gptModel;
    this.temperature = requestData.temperature;
    this.maxTokens = requestData.maxTokens;
    this.prompt = requestData.prompt;
    this.interacoes = requestData.interacoes;
    this.mensagem = requestData.mensagem;
    this.functionSpecs = requestData.functionSpecs;
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
  getInteracoes() {
    return this.interacoes;
  }
  getMensagem() {
    return this.mensagem;
  }
  getFunctionSpecs() {
    return this.functionSpecs;
  }
}
