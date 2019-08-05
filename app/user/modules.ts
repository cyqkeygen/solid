import * as decorator from '../decorator'
import * as IUser from './interface/IUser'
import UserService from './service/user'

export default {
  UserService,
  interface: IUser,
  decorator
}