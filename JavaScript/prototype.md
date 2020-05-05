# 프로토타입

## 1. 객체 지향 프로그래밍

* 독립적인 객체(object)들의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임

* 다양한 속성 중에서 프로그램에 필요한 속성만을 간추려 내어 표현하는 것을 **추상화(abstraction)**
* 객체란?
  * **속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료 구조**
  * 객체의 **상태(state)**를 나타내는 데이터와 상태 데이터를 조작할 수 있는 **동작(behavior)**을 하나의 논리적인 단위로 생각함
    * 객체의 상태 데이터 : 프로퍼티(property)
    * 동작 : 메소드(method)
  * 따라서 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료 구조라고 할 수 있음
  * 자신긔 고유한 기능을 수행하며 다른 객체와 관계성을 갖음
  * 다른 객체와 메시지를 주고 받거나 데이터를 처리할 수도 있음
  * 다른 객체의 상태 데이터 또는 동작을 상속 받아 사용하기도 함





## 2. 상속과 프로토타입

* 상속
  * 객체의 프로퍼티 또는 메소드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
  * 코드의 재사용이란 관점에서 매우 유용함
* **자바스크립트는 프로토타입(prototype)을 기반으로 상속을 구현**함





## 3. 프로토타입 객체

* 프로토타입 객체란?
  * 객체간 상속(inheritance)을 구현하기 위해 사용됨
  * 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메소드 포함)를 제공함
  * 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용함
  * 

* [[Prototype]] 내부 슬롯

  * 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가짐

  * [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정됨

  * 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고

    [[Prototype]]에 저장됨 ([[Prototype]] 내부 슬롯의 값이 null인 객체의 경우 프로토타입이 없음)

  * 모든 프로토타입은 생성자 함수와 연결돼 있음

  * 객체 - 프로토타입 - 생성자 함수 



![img](https://poiemaweb.com/assets/fs-images/19-3.png)





* 객체는 __ _proto_ _ _ 접근자 프로퍼티를 통해 

  자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근이 가능함

* 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근이 가능함

* 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근 가능





### 3.1. __ _proto_ _ _ 접근자 프로퍼티

```javascript
const person = { name: 'Lee' };
```

![img](https://poiemaweb.com/assets/fs-images/19-4.png)



* 빨간 박스 -> person 객체의 프로토타입인 **Object.prototype**
* 내부 슬롯은 프로퍼티가 아님
* 접근자 프로퍼티는 접근자 함수(Accessor function)로 구성된 프로퍼티임
  * 접근자 함수 : 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용



![img](https://poiemaweb.com/assets/fs-images/19-5.png)



* getter/setter 함수를 통해 [[Prototype]] 내부 슬롯의 값, 

  즉 프로토타입을 취득하거나 할당함

* getter 함수 :  get __ _proto_ _ _

* setter 함수 : set __ _proto_ _ _



*  __ _proto_ _ _접근자 프로퍼티는 Object.prototype의 프로퍼티임
*  모든 객체는 상속을 통해 Object.prototype.__ _proto_ _ _접근자 프로퍼티를 사용할 수 있음

```javascript
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티이다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

* [[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함임













![img](https://poiemaweb.com/assets/fs-images/19-18.png)



function Person(name){

​	this.name = name;

}

const me = new Person('Lee');