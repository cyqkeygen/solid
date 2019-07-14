import { injectable , create } from './IOC'


@injectable
class E {
    dance () {
        console.log('She is dancing.')
    }
}

@injectable
class B {
    public constructor(public a: E) {

    }

    speak () {
        this.a.dance()
        console.log('She is speaking.')
    }
}

@injectable
class C {
    run () {
        console.log('She is runing.')
    }
}

@injectable
class D {

}


@injectable
class A {
    public constructor(public b: B, public c: C, public d: D) {

    }

    runWithSpeak () {
        this.b.speak()
        this.c.run()
    }
}

// 仅需要一行代码
let a = create(A)
a.runWithSpeak()
//对比之前的代码 ， 如果依赖增加差距将更大
//var e = new E();
//var b = new B(e);
//var c = new C();
//var d = new D();
//var a = new A(b,c,d);
