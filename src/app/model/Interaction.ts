import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../common/classes/CustomError";
import { Errors } from "../common/enums/Errors";
import { HttpStatus } from "../common/enums/HttpStatus";
import { isValidNumber } from "../common/utils/numberValidation";
import { isValidString } from "../common/utils/stringValidation";

// DEV: ESSA CLASSE AQUI TÁ MUITO DESATUALIZADA
/**
 * INPUT:
 * model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
        {
            role: "developer",
            content: "Talk like a pirate."
        },
        {
            role: "user",
            content: "Are semicolons optional in JavaScript?",
        },
    ],

  * OUTPUT:
  * [
      {
          "id": "msg_67b73f697ba4819183a15cc17d011509",
          "type": "message",
          "role": "assistant",
          "content": [
              {
                  "type": "output_text",
                  "text": "Under the soft glow of the moon, Luna the unicorn danced through fields of twinkling stardust, leaving trails of dreams for every child asleep.",
                  "annotations": []
              }
          ]
      }
    ]

 */

type TInteraction = {
  role: "developer" | "user" | "assistant";
  content: String;
};

export class Interaction {
  gptModel: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  previousInteractions: TInteraction[] = [];
  message: string;
  inputSequence: TInteraction[] = []; // DEV: DESENVOLVER TIPAGEM
  toolFunctionSpecs: any; // DEV: DESENVOLVER TIPAGEM
  queryVerified: boolean = false;
  gptAnswer: string = "";

  constructor(requestDTO: RequestDTO) {
    this.gptModel = requestDTO.getGPTModel();
    this.temperature = this.verifyTemperature(requestDTO.getTemperature());
    this.maxTokens = this.verifyMaxTokens(requestDTO.getMaxTokens());
    this.prompt = this.verifyPrompt(requestDTO.getPrompt());
    this.toolFunctionSpecs = this.verifyFunctionSpecs(
      requestDTO.getToolFunctionSpecs()
    );
    this.message = this.verifyMessage(requestDTO.getMessage());

    // DEV: Lembrando que aqui pode vir nulo
    this.previousInteractions = this.verifyPreviousInteractions(
      requestDTO.getPreviousInteractions()
    );
  }

  private verifyTemperature(temperature: any) {
    // DEV: converter temperature para number se vier como string

    if (temperature >= 0 && temperature <= 2) {
      return temperature;
    }
    this.throwInvalidSpecsError("temperature");
  }

  private verifyMaxTokens(maxTokens: any) {
    if (isValidNumber(maxTokens)) {
      return maxTokens;
    }
    this.throwInvalidSpecsError("maxTokens");
  }

  // DEV: Desenvolver
  private verifyFunctionSpecs() {
    if (this.toolFunctionSpecs) {
    }
  }

  private verifyPrompt(prompt: any) {
    if (isValidString(prompt)) {
      return prompt;
    }
    this.throwInvalidSpecsError("prompt");
  }

  // DEV: Desenvolver critérios
  private verifyMessage(message: any) {
    if (isValidString(message)) {
      return message;
    }
    this.throwInvalidSpecsError("message");
  }

  // DEV: Desenvolver critérios (Lembrando: pode vir null)
  private verifyPreviousInteractions(interactions: any) {
    if (isValidString(interactions)) {
      // DEV: VEM STRING MESMO?
      return interactions;
    }
    this.throwInvalidSpecsError("previous interactions");
  }

  private formatInputSequence() {
    this.inputSequence.push({
      role: "developer",
      content: this.prompt,
    });

    // DEV: Push nas interações anteriores (Como virão?)

    this.inputSequence.push({ role: "user", content: this.message });
  }

  // DEV: CONTINUAR DESENVOLVIMENTO
  verifyRequest() {
    if (!this.prompt || !this.message) {
      throw new CustomError(
        Errors.QUERY_FIELDS_MISSING,
        HttpStatus.InvalidRequest
      );
    }

    this.verifyFunctionSpecs();

    this.queryVerified = true; // DEV: Qual necessidade disso?
    return this;
  }

  // DEV: DESENVOLVER
  verifyResponse() {
    return this;
  }

  throwInvalidSpecsError(field: string) {
    const msg = Errors.GPT_SPECIFICATIONS_INVALID + ": " + field;
    throw new CustomError(msg, HttpStatus.InvalidRequest);
  }

  getGptModel() {
    return this.gptModel;
  }

  getInputSequence() {
    return this.inputSequence;
  }

  getMaxTokens() {
    return this.maxTokens;
  }

  getTemperature() {
    return this.temperature;
  }

  getToolFunctionSpecs() {
    return this.toolFunctionSpecs;
  }

  setGPTAnswer(gptAnswer: string) {
    this.gptAnswer = gptAnswer;
  }
}
