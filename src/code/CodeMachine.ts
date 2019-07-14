import {ICodeMachine, ICodeParam} from './interface/ICode'

export default class CodeMachine implements ICodeMachine {

  async send (param: ICodeParam) {
    
  }

  async validate (param: ICodeParam) {
    return true
  }
}