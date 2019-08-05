export interface ISingleSmsParam {
  msg: string
  phone: string
}

export interface IMultiSmsParam {
  msg: string
  phones: Array<string>
}

export interface ISmsSingleAbstract {
  send (param: ISingleSmsParam): void
}

export interface ISmsMultipleAbstract {
  multiSend (param: IMultiSmsParam): void
}