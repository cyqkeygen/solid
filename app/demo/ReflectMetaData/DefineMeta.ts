import 'reflect-metadata'

function classDecorator (): ClassDecorator {
  return target => {
    Reflect.defineMetadata('classMetaData', 'a', target)
  }
}

function methodDecorator (): MethodDecorator {
  return (target, key, descriptor) => {
    console.log(key)
    console.log(descriptor)
    Reflect.defineMetadata('methodMetaData', 'b', target, key)
  }
}


@classDecorator()
class Test {
  @methodDecorator()
  say () {
    
  }
}

console.log(Reflect.getMetadata('classMetaData', Test))
console.log(Reflect.getMetadata('methodMetaData', new Test(), 'say'))


export {}