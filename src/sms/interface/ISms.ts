export interface ISingleSmsParam {
  msg: string
  phone: string
}

export interface IMultiSmsParam {
  msg: string
  phones: Array<string>
}

export interface ISmsSingle {
  send (param: ISingleSmsParam): void
}

export interface ISmsMultiple {
  multiSend (param: IMultiSmsParam): void
}