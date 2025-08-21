export class RequestDTO {
  gptModel: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  functionSpecs: any; // DEV: TIPAR
  previousInteractions: any; // DEV: TIPAR
  message: string;

  constructor(requestData: any) {
    this.gptModel = requestData.gptModel;
    this.prompt = requestData.prompt;
    this.previousInteractions = requestData.previousInteractions;
    this.message = requestData.message;
    this.maxTokens = requestData.maxTokens;
    this.temperature = requestData.temperature;
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
  getPreviousInteractions() {
    return this.previousInteractions;
  }
  getMessage() {
    return this.message;
  }
  getFunctionSpecs() {
    return this.functionSpecs;
  }
}
