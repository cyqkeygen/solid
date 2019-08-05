import 'reflect-metadata'

@Reflect.metadata('inClass', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  say () {
    console.log('say...')
    return 'test say'
  }
}

console.log(Reflect.getMetadata('inClass', Test))
console.log(Reflect.getMetadata('inMethod', new Test(), 'say'))

export {}