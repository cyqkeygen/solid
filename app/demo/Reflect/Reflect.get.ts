const obj = {
  foo: 1,
  bar: 2,
  get baz () {
    return this.foo + this.bar
  }
}

console.log(Reflect.get(obj, 'foo')) // 1
console.log(Reflect.get(obj, 'bar')) // 2
console.log(Reflect.get(obj, 'baz')) // 3

const otherObj = {
  foo: 4,
  bar: 5
}

console.log(Reflect.get(obj, 'foo', otherObj)) // 1
console.log(Reflect.get(obj, 'bar', otherObj)) // 2
console.log(Reflect.get(obj, 'baz', otherObj)) // 9

export {}


