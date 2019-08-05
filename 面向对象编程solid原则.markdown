## SOLID 原则
| 首字母 |     指代     |                                                                             概念 |
| :----- | :----------: | :------------------------------------------------------------------------------- |
| S      | 单一功能原则 |                                           认为对象应该仅具有一种单一功能的概念。 |
| O      |   开闭原则   |                     认为“软件体应该是对于扩展开放的，但是对于修改封闭的”的概念。 |
| L      | 里氏替换原则 | 认为“程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的”的概念。 |
| I      | 接口隔离原则 |                                 认为“多个特定客户端接口要好于一个宽泛用途的接口” |
| D      | 依赖反转原则 |                                   认为一个方法应该遵从“依赖于抽象而不是一个实例” |



### 如何实现

#### 1.声明接口interface
````
// file interfaces.ts

export interface Warrior {
    fight(): string;
    sneak(): string;
}

export interface Weapon {
    hit(): string;
}

export interface ThrowableWeapon {
    throw(): string;
}
````

#### 2.配置type（InversifyJS推荐）
````
// file types.ts

const TYPES = {
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon"),
    ThrowableWeapon: Symbol.for("ThrowableWeapon")
};

export { TYPES };
````

#### 3.业务代码编写（使用@inject @injectable）
1. 引入interface，而非直接引入依赖类，有利于解偶
2. 需要的依赖类实例化交给步骤4的IoC容器
3. 最好遵循接口分离原则，减少因继承而必须在子类中写入空方法
4. 最好遵循里氏替换法则，以便步骤4IoC容器可以随时更换注入依赖类实例化
````
// file entities.ts

// injectable injectable reflect-metadata 需要引入有点多余
import { injectable, injectable } from "inversify";
import "reflect-metadata";
// 引入需要实现的接口
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces"
import { TYPES } from "./types";

@injectable()
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

@injectable()
class Ninja implements Warrior {

    private _katana: Weapon;
    private _shuriken: ThrowableWeapon;

    public constructor(
	    @inject(TYPES.Weapon) katana: Weapon,
	    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
    ) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); }
    public sneak() { return this._shuriken.throw(); }

}

export { Ninja, Katana, Shuriken };
````

如果不想通过构造函数去实现注入，可以使用属性注入，个人认为<font color=red>属性注入可读性好一些</font>
````
@injectable()
class Ninja implements Warrior {
    @inject(TYPES.Weapon) private _katana: Weapon;
    @inject(TYPES.ThrowableWeapon) private _shuriken: ThrowableWeapon;
    public fight() { return this._katana.hit(); }
    public sneak() { return this._shuriken.throw(); }
}
````

#### 4. 编写IoC容器
````
// file inversify.config.ts

import { Container } from "inversify";
import { TYPES } from "./types";
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces";
import { Ninja, Katana, Shuriken } from "./entities";

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };
````

#### 5. 实例化
使用步骤4创建的IoC容器，创建一个实例
````
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { Warrior } from "./interfaces";

// const shuriken = new Shuriken()
// const katana = new Katana()
// const ninja = new Ninja(shuriken, katana)
// 相对于上面代码，少了手动实例化的操作
const ninja = myContainer.get<Warrior>(TYPES.Warrior);

expect(ninja.fight()).eql("cut!"); // true
expect(ninja.sneak()).eql("hit!"); // true
````

### 优点
1. 解偶
2. 遵循开闭原则（即对扩展是开放的，对于修改是封闭的。便于扩展，只需要改动外部注入操作代码，不需要改动主逻辑代码, 便于单元测试)
3. 减少代码量，且业务逻辑清晰
4. 遵循单一职责原则，一切面向对象编程

### 缺点
1. 需要配置IoC容器，即注入类如何实例化，相对繁琐，在容器注入依赖时，引用层级比较混淆，容易循环引用依赖。
2. 经过5个步骤才可以生成一个实例，使用了一些反射机制，给系统运行加入了一些额外的系统开销
3. 还未找到一些质量较好的依赖注入工具包（测试覆盖率高，编写注入容器容易）
4. service类型IDE提示只能到interface,而不能直接到具体功能的实现

### TODO
1. 如何设计项目目录结构
2. 如何对请求数据进行校验Joi
3. 是否有必要有proxy这次第三方api请求代理
4. 如何测试
5. 对比圧测

#### 结论
1. 简单项目可以不使用
2. 在大型程序中，可使用性很高，有减少冗余的代码，提高代码可读性，解偶等好处。基于SOLID原则。产生的额外系统开销实际上可以忽略。

#### 参考
[SOLID 原则 WIKI](https://zh.wikipedia.org/wiki/SOLID_(%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1))
[InversifyJS](https://github.com/inversify/InversifyJS)
[淘宝 TypeScript 多场景框架和方案实践（GMTC 2019 大会分享）](https://developer.aliyun.com/article/708018?spm=5176.8068049.0.0.7f0d6d19zeELgG)
[为什么选择 Typescript | TypeScript体系调研报告](https://juejin.im/post/59c46bc86fb9a00a4636f939)