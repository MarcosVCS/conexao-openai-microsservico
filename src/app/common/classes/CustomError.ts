export default class CustomError extends Error {
  status: number;
  erro: Error | undefined;

  constructor(msg: string, status: number, err?: Error) {
    super(msg);
    this.status = status;
    this.erro = err;

    console.error(
      `[${new Date(Date.now()).toLocaleString("pt-BR")}]`,
      msg,
      err?.message ?? ""
    );
  }
}
