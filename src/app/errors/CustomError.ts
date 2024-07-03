export default class CustomError extends Error {
  status: number;

  constructor(msg: string) {
    super(msg);
  }
}
