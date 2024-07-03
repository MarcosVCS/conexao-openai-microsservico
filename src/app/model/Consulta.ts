import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../errors/CustomError";
import { errorType } from "../errors/errorType";
import { TFunctionSpecs, TInteracoes } from "../types/tiposConsulta";
import { ehNumeroValido } from "../utils/validacaoNumero";

export class Consulta {
  openAIKey: string;
  gptModel: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  functionSpecs: TFunctionSpecs[];
  interacoes: TInteracoes[];
  mensagem: string;
  resposta: string;
  sequenciaMensagens: TInteracoes[];
  consultaValidada: boolean = false;

  constructor(requestDTO: RequestDTO) {
    this.openAIKey = this.validarOpenAIKeyJwt(requestDTO.getOpenAIKeyJwt());
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

  // Desenvolver
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

  // Desenvolver
  private validarOpenAIKeyJwt(jwt: string) {
    try {
      return "";
    } catch (error) {
      throw new CustomError(errorType.VALIDACAO_OPENAI_KEY);
    }
  }

  private validarTemperature(temperature: any) {
    if (ehNumeroValido(temperature)) {
      return temperature;
    }
    throw new CustomError(errorType.VALIDACAO_ESPECIFICACOES_GPT);
  }

  private validarMaxTokens(maxTokens: any) {
    if (ehNumeroValido(maxTokens)) {
      return maxTokens;
    }
    throw new CustomError(errorType.VALIDACAO_ESPECIFICACOES_GPT);
  }

  // Desenvolver
  private validarFunctionSpecs() {
    if (this.functionSpecs) {
    }
  }

  validarRequest() {
    if (
      !this.openAIKey ||
      !this.gptModel ||
      !this.temperature ||
      !this.maxTokens
    ) {
      throw new CustomError(errorType.VALIDACAO_ESPECIFICACOES_GPT);
    }

    if (!this.prompt || !this.mensagem) {
      throw new CustomError(errorType.VALIDACAO_ATRIBUTOS_CONSULTA);
    }

    this.validarFunctionSpecs();

    this.consultaValidada = true;
    return this;
  }

  getOpenAIKey() {
    if (this.consultaValidada) {
      return this.openAIKey;
    }
    throw new CustomError(errorType.VALIDACAO_OPENAI_KEY);
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
