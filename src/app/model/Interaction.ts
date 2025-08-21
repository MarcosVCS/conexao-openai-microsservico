import { RequestDTO } from "../dto/RequestDTO";
import CustomError from "../common/classes/CustomError";
import { Errors } from "../common/enums/Errors";
import { HttpStatus } from "../common/enums/HttpStatus";
import { isValidNumber } from "../common/utils/numberValidation";
import { isValidString } from "../common/utils/stringValidation";
import { ResponseInputItem } from "openai/resources/responses/responses";
import { Reasoning } from "openai/resources/shared";

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

export class Interaction {
  gptModel: string;
  maxTokens: number;
  temperature: number;
  reasoning: Reasoning | null = null;
  prompt: string;
  previousInteractions: ResponseInputItem[] = [];
  message: string;
  inputSequence: ResponseInputItem[] = [];
  gptAnswer: string = "";

  constructor(requestDTO: RequestDTO) {
    this.gptModel = requestDTO.getGPTModel();
    this.temperature = this.verifyTemperature(requestDTO.getTemperature());
    this.maxTokens = this.verifyMaxTokens(requestDTO.getMaxTokens());
    if (requestDTO.getReasoning() != null) {
      this.reasoning = this.verifyReasoning(requestDTO.getReasoning());
    }
    this.prompt = this.verifyPrompt(requestDTO.getPrompt());
    if (requestDTO.getPreviousInteractions() != null) {
      this.previousInteractions = this.verifyPreviousInteractions(
        requestDTO.getPreviousInteractions()
      );
    }
    this.message = this.verifyMessage(requestDTO.getMessage());

    this.formatInputSequence();
  }

  private verifyTemperature(temperature: any) {
    if (isValidString(temperature)) {
      temperature = parseInt(temperature);
    }

    if (isValidNumber(temperature) && temperature >= 0 && temperature <= 2) {
      return temperature;
    }
    this.throwInvalidSpecsError("temperature");
  }

  private verifyMaxTokens(maxTokens: any) {
    if (isValidString(maxTokens)) {
      maxTokens = parseInt(maxTokens);
    }

    if (isValidNumber(maxTokens)) {
      return maxTokens;
    }
    this.throwInvalidSpecsError("maxTokens");
  }

  // DEV: Somente deve retornar quando o modelo for gpt-5 ou o-series
  private verifyReasoning(reasoning: any): Reasoning {
    if (reasoning !== "low" && reasoning !== "medium" && reasoning !== "high") {
      this.throwInvalidSpecsError("resoaning");
    }
    return { effort: reasoning };
  }

  private verifyPrompt(prompt: any) {
    if (isValidString(prompt)) {
      return prompt;
    }
    this.throwInvalidSpecsError("prompt");
  }

  private verifyMessage(message: any) {
    if (isValidString(message)) {
      return message;
    }
    this.throwInvalidSpecsError("message");
  }

  // DEV: Desenvolver critérios
  private verifyPreviousInteractions(interactions: any) {
    // DEV: for-loop nas interações, verificar campos... se tiver algum mal formatado, lançar erro
    // this.throwInvalidSpecsError("previous interactions");
  }

  private formatInputSequence() {
    this.inputSequence.push({
      role: "developer",
      content: this.prompt,
    });

    if (this.previousInteractions.length != 0) {
      this.inputSequence.push(...this.previousInteractions);
    }

    this.inputSequence.push({ role: "user", content: this.message });
  }

  verifyRequest() {
    if (!this.prompt || !this.message) {
      throw new CustomError(
        Errors.QUERY_FIELDS_MISSING,
        HttpStatus.InvalidRequest
      );
    }

    return this;
  }

  // DEV: DESENVOLVER
  verifyResponse() {
    return this;
  }

  throwInvalidSpecsError(field: string): void {
    const msg = Errors.GPT_SPECIFICATIONS_INVALID + ": " + field;
    throw new CustomError(msg, HttpStatus.InvalidRequest);
  }

  getGptModel() {
    return this.gptModel;
  }

  getInputSequence() {
    return this.inputSequence;
  }

  getReasoning() {
    return this.reasoning;
  }

  getMaxTokens() {
    return this.maxTokens;
  }

  getTemperature() {
    return this.temperature;
  }

  setGPTAnswer(gptAnswer: string) {
    this.gptAnswer = gptAnswer;
  }
}
