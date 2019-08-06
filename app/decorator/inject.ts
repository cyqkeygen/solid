// filename: ioc.ts


// 导入元数据支持
import "reflect-metadata"
import { inject, injectable, Container } from 'inversify'

const container = new Container()

export function provider (key) {
  return function (...args) {
    console.log(args)
    // container.bind<>(key).to(constructor)
    // return 
  }
}

export * from 'inversify'
