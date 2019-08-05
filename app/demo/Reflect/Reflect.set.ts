const obj: any = {
  foo: 1,
  set bar (v) {
    this.foo = v
  }
}

Reflect.set(obj, 'test', 3)
console.log(obj.test)

const objOther = {
  foo: 0
}

Reflect.set(obj, 'foo', 2, objOther)
console.log(obj.foo)
console.log(objOther.foo)

export {}