import 'reflect-metadata'

function Prop () {
  return function (target, key: string) {
    console.log(key)
    const type = Reflect.getMetadata('design:type', target, key)
    console.log(`${key}type: ${type.name}`)
  }
}

function Method () {
  return function (target, key: string) {
    const paramtypes = Reflect.getMetadata('design:paramtypes', target, key)
    const returntype = Reflect.getMetadata('design:returntype', target, key)
    console.log(`paramtypes: ${paramtypes}`)
    console.log(`returntype: ${returntype}`)
  }
}


class Test {
  @Prop()
  public Aprop!: string

  @Method()
  say (a: string, b: number): string {
    console.log(`first: ${a}, second: ${b}`)
    return a
  }
}

const t = new Test()
const prototype = Object.getPrototypeOf(t)
console.log('prototype: ', prototype['say'])

export {}