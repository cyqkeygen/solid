export interface IShowParam {
  userId: string
}

export interface ISendCodeParam {
  phone: string
}

export interface IRegisterParam {
  phone: string
  code: string
}

export interface ILoginParam {
  phone: string
  code: string
}

export interface IUserRes {
  userId: string
  phone: string
  name?: string
  address?: string
  token: string
}

export interface IRegisterRes {
  userId: string
  phone: string
  token: string
}

export interface ILoginRes {
  userId: string
  phone: string
  token: string
}

export interface IUser {
  show (param: IShowParam): Promise<IUserRes>
  sendCode (param: ISendCodeParam): void
  register (param: IRegisterParam): Promise<IUserRes>
  login (param: ILoginParam): Promise<IUserRes>
}