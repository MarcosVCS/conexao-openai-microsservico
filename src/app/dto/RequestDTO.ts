export class RequestDTO {
  gptModel: string;
  prompt: string;
  previousInteractions: any; // DEV: TIPAR
  message: string;
  maxTokens: number;
  resoaning: string;
  temperature: number;

  constructor(requestData: any) {
    this.gptModel = requestData.gptModel;
    this.prompt = requestData.prompt;
    this.previousInteractions = requestData.previousInteractions;
    this.message = requestData.message;
    this.maxTokens = requestData.maxTokens;
    this.resoaning = requestData.resoaning;
    this.temperature = requestData.temperature;
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
  getReasoning() {
    return this.resoaning;
  }
  getPrompt() {
    return this.prompt;
  }
  getPreviousInteractions() {
    return this.previousInteractions;
  }
  getMessage() {
    return this.message;
  }
}
