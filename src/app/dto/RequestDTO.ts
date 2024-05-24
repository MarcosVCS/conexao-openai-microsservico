type TInteracoes = {
    role: "system" | "user" | "assistant";
    mensagem: String
}

type TArrayInteracoes = TInteracoes[];

export class RequestDTO{


    prompt: string;
    interacoes: TArrayInteracoes;
    mensagem: string;


    constructor(requestData: any){
        this.prompt = requestData.prompt;
        this.interacoes = requestData.interacoes;
        this.mensagem = requestData.mensagem;

    }

    getPrompt(){
        return this.prompt;
    }

    getInteracoes(){
        return this.interacoes;
    }

    getMensagem(){
        return this.mensagem;
    }

    
}