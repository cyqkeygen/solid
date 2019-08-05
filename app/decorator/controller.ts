import 'reflect-metadata'
import { isFunction } from 'util'

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

// controller class 装饰器 只跟路径有关
export const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

// controller method 装饰器 和 路径（path） 方法（method）有关
function createMappingDecorator (method)  {
  return (path): MethodDecorator => {
    return (target, key, descriptor) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value)
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value)
    } 
  }
}

export const Get = createMappingDecorator('GET')
export const Post = createMappingDecorator('POST')
export const Put = createMappingDecorator('PUT')
export const Delete = createMappingDecorator('DELETE')
export const Patch = createMappingDecorator('PATCH')

export function mapRoute (instance) {
  const prototype = Object.getPrototypeOf(instance)
  const methodsNames = Object.getOwnPropertyNames(prototype)
    // .filter(item => !isConstructor(item) && isFunction(prototype(item)))
    .filter(item => isFunction(prototype[item]))
  return methodsNames.map(methodsName => {
    const fn = prototype[methodsName]
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)
    return {
      route,
      method,
      fn,
      methodsName
    }
  })
}

export function routerConfigure ({controller, router}) {
  const routes = mapRoute(controller)
  const constructor = routes.find(route => route.methodsName === 'constructor')
  const apis = routes.filter(route => route.methodsName !== 'constructor') 
  const path = constructor ? constructor.route : ''

  for (const api of apis) {
    const method = api.method.toLowerCase()
    router[method](path + api.route, api.fn)
  }
}
