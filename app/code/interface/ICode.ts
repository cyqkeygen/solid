export interface ICodeParam {
  phone: string
  code: string
}

export interface ICodeMachine {
  send (param: ICodeParam): void
  validate (param: ICodeParam): Promise<boolean>
}