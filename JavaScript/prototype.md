# 프로토타입

## 1. 객체 지향 프로그래밍

- 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 독립적 단위인 객체(object)들의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임



#### 추상화(abstraction)란?

다양한 속성 중에서 프로그램에 **필요한 속성만을 간추려** 표현하는 것

사람을 인식할 때 그 사람의 이름과 성별, 나이 등의 속성을 구체적으로 표현하면 특정한 사람을 다른 사람과 구별하여 인식할 수 있다.

```javascript
// 이름과 주소 속성을 갖는 객체
const person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
```



#### 객체란?

* **속성을 통해 여러 개의 값을 하나의 논리적인 단위로 구성한 복합적인 자료 구조**
* 객체의 **상태(state)**를 나타내는 데이터와 상태 데이터를 조작할 수 있는 **동작(behavior)**을 하나의 논리적인 단위로 생각함
  * 객체의 상태 데이터 : 프로퍼티(property)
  * 동작 : 메소드(method)
* 따라서 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료 구조라고 할 수 있음
* 자신의 고유한 기능을 수행하며 다른 객체와 관계성을 갖음
* 다른 객체와 메시지를 주고 받거나 데이터를 처리할 수도 있음
* 다른 객체의 상태 데이터 또는 동작을 상속 받아 사용하기도 함





## 2. 상속과 프로토타입

* 상속(inheritance)
  * 객체의 프로퍼티 또는 메소드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
  * 코드의 재사용이란 관점에서 매우 유용함
* **자바스크립트는 프로토타입(prototype)을 기반으로 상속을 구현**함

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    // Math.PI는 원주율을 나타내는 상수다.
    return Math.PI * this.radius ** 2;
  };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

생성자 함수는 동일한 프로퍼티(메서트 포함) 구조를 갖는 객체를 여러 개 생성할 때 유용하나 위 예제에서는 Circle 생성자 함수가 인스턴스를 생성할 때마다 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다는 문제 점이 있다. 

이는 메모리를 불필요하게 낭비하며 인스턴스를 생성할 때마다 메서드를 생성하므로 퍼포먼스에도 악영향을 준다.



상속을 통한 중복 제거

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

![img](https://poiemaweb.com/assets/fs-images/19-2.png)



#### 상속

- 코드의 재사용
- 생성자 함수가 생성할 모든 인스턴스는 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현에 놓으면 별도의 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있다.





## 3. 프로토타입 객체

* 프로토타입 객체란?
  * 객체간 상속(inheritance)을 구현하기 위해 사용됨
  * 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메소드 포함)를 제공함
  * 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용함
  
  
  
* [[Prototype]] 내부 슬롯

  * 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가짐

  * [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정됨

  * 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고

    [[Prototype]]에 저장됨 ([[Prototype]] 내부 슬롯의 값이 null인 객체의 경우 프로토타입이 없음)

  * 모든 프로토타입은 생성자 함수와 연결돼 있음

  * 객체 - 프로토타입 - 생성자 함수 



![img](https://poiemaweb.com/assets/fs-images/19-3.png)





* 객체는 __ _proto_ _ _ 접근자 프로퍼티를 통해 자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근이 가능함

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
const person = { 
	name: 'Lee' 
};

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티이다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

* [[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함임



> Object.prototype
>
> 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다. 자바스크립트 엔진은 객체의 프로퍼티(메소드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 __proto__ 접근자 프로퍼티가 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 Object.prototype이며 이 객체의 프로퍼티와 메소드는 모든 객체에게 상속된다.



* **__ _proto_ _ _ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유**

[[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유 = 상호 참조에 의해 프로토타입 체인이 생성되는 것 방지하기 위함

* 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 함 = 단방향 링크드 리스트

* __ _proto_ _ _ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것 -좋지 않음
  * 모든 객체가 __ _proto_ _ _ 접근자 프로퍼티를 사용할 수 없기 때문



```javascript
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

* 프로토타입 참조를 취득하고 싶은 경우 - Object.getPrototypeOf메소드

* 프로토타입 교체하고 싶은 경우 - Object.setPrototypeOf메소드





### 3.2. 함수 객체의 prototype 프로퍼티

#### 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

* prototype 프로퍼티 : 함수만 가짐
* 생성자 함수가 생성할 인스턴스(객체)의 프로토타입

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log((function () {}).hasOwnProperty('prototype')); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log({}.hasOwnProperty('prototype')); // false
```



* 생성자 함수로서 호출이 불가한 함수(**non-constructor**)는 prototype 프로퍼티 소유하지 않으며, 프로토타입도 생성하지 않는다.
  * **화살표 함수**
  * **ES6 메소드 축약 표현으로 정의한 메소드**

```javascript
// 화살표 함수는 non-constructor다.
const Person = name => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
  foo() {}
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```



생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무런 의미가 없다.



모든 객체가 가지고 있는  __ _proto_ _ _ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다. 하지만 이들을 사용하는 주체는 다르다.

| 구분                      | 소유        | 값                | 사용 주체   | 사용 목적                                                    |
| :------------------------ | :---------- | :---------------- | :---------- | :----------------------------------------------------------- |
| __proto__ 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용      |
| prototype 프로퍼티        | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |



![img](https://poiemaweb.com/assets/fs-images/19-7.png)





### 3.3. 프로토타입의 constructor 프로퍼티와 생성자 함수

* 모든 프로토타입은 constructor 프로퍼티를 갖음
* constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킴
  * 즉, 함수 객체가 생성될 때(생성자 함수가 생성될 때)이 연결이 이뤄짐

▼

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

console.log(me.constructor === Person)
```



![img](https://poiemaweb.com/assets/fs-images/19-8.png)

① Person 생성자함수 - 객체 생성 

​	-> **Person 생성자 함수는 me객체를 생성**



② new 연산자를 사용한 Person 생성자 함수로 me라는 식별자에 변수를 선언(객체) - 인수를 매개변수에 삽입

​	-> **me 객체는 프로토타입의 contructor 프로퍼티를 통해 생성자 함수와 연결됨**



③ me 객체는 name 프로퍼티를 소유

​	-> **me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용**

​	(me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있음.)



④ --proto-- 접근자 프로퍼티로 me 객체의 프로토타입 확인 가능 Person .prototype의 constructor는 Person 생성자 함수임 





## 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

* 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결됨
* constructor 프로퍼티가 가리키는 생성자 함수 = 인스턴스를 생성한 생성자 함수임

```javascript
// obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function('a', 'b', 'return a + b');
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// me 객체를 생성한 생성자 함수는 Person이다.
const me = new Person('Lee');
console.log(me.constructor === Person); // true
```



* 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 존재

```javascript
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function (a, b) { return a + b; };

// 배열 리터럴
const arr = [1, 2, 3];

// 정규표현식 리터럴
const regexr = /is/ig;
```



#### 리터럴 표기법에 의해 생성된 객체 

* 프로토타입 존재함 - 상속을 위해
* 가상적인 생성자 함수를 갖음

* 그러나 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 개체를 생성한 생성자 함수는 아님

```javascript
// 객체 obj는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성하였다.
const obj = {};

// 하지만 객체 obj의 생성자 함수는 Object 생성자 함수이다.--> 가상적이 ㄴ생성자 함수를 갖기 때문????
console.log(obj.constructor === Object); // true
```

* obj는 객체 리터럴에 의해 생성되었음
* 객체 obj는 Object 생성자 함수와 constructor 프로퍼티로 연결되어있음
* 객체 리터럴에 의해 생성된 객체 = Object 생성자 함수로 생성된 것 
  * Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작하기 때문임
  * 인수가 전달되지 않았을 때 **추상 연산 ObjectCreate**을 호출하여 **빈 객체를 생성**
  * 인수가 전달된 경우 = 인수를 객체로 변환



> 추상 연산(abstract operation)
>
> 추상 연산은 ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것이다. ECMAScript 사양에서 설명을 위해 사용되는 함수와 유사한 의사 코드라고 이해하도록 하자.



```javascript
// Object 생성자 함수에 의한 객체 생성
let obj = new Object();
console.log(obj); // {}

// Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다.
// 인수가 전달되지 않았을 때 추상 연산 ObjectCreate을 호출하여 빈 객체를 생성한다.
obj = Object();
console.log(obj); // {}

// 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}
```



#### Object 생성자 함수 호출과 객체 리터럴의 평가

* 공통점 : 추상 연산 ObjectCreate을 호출하여 빈 객체를 생성하는 점
* 차이점 : new.tartget 확인, 프로퍼티를 추가하는 처리 등 세부 내용
* 객체 리터럴에 의해 생성된 객체 != Object 생성자 함수가 생성한 객체



#### 함수 객체 

-> Function 생성자 함수 방식

렉시컬 스코프 생성 X

클로저 생성 X

전역 함수처럼 스코프 생성

* Function 생성자 함수가 아님
* constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수임

```javascript
// 함수 foo는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성하였다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수이다.
console.log(foo.constructor === Function); // true
```



프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성자 함수로 보아도 무방함



* 리터럴 표기법에 의해 생성된 객체의 생성자 함수 / 프로토타입

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| :----------------- | :---------- | :----------------- |
| 객체 리터럴        | Object      | Object.protptype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.protptype   |





## 5. 프로토타입의 생성 시점

* 모든 객체 = 생성자 함수와 연결



> Object.create 메소드와 클래스에 의한 객체 생성
>
> Object.create 메소드와 클래스로 객체를 생성하는 방법도 있다. Object.create 메소드와 클래스로 생성한 객체도 생성자 함수와 연결되어 있다.



* 프로토타입이 생성되는 시점 = 생성자 함수가 생성되는 시점
* 단독으로 존재할 수 없음
* 프로토타입과 생성자 함수는 항상 쌍으로 존재함
* 생성자 함수
  * 사용자 정의 생성자 함수
  * 빌트인 생성자 함수(자바스크립트 기본적으로 제공하는 생성자 함수)





### 5.1. 사용자 정의 생성자 함수와 프로토타입 생성 시점

* 일반 함수(함수 선언문, 함수 표현식)로 정의한 함수 객체는 new 연산자와 함께 생성자 함수로서 호출 가능
* **constructor(생성자 함수로서 호출할 수 있는 함수)는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됨**

*프로토타입이 생성되는 시점 = 생성자 함수가 생성되는 시점*

```javascript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```



#### 생성자 함수로서 호출할 수 없는 함수의 경우 (non-constructor)

```javascript
// 화살표 함수는 non-constructor이다.
const Person = name => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

- 함수 선언문으로 정의된 Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 됨

- 이때 프로토타입도 생성됨

- 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩되며

  오직 constructor 프로퍼티만을 갖는 객체임

![img](https://poiemaweb.com/assets/fs-images/19-12.png)



- 프로토타입 = 객체
- 모든 객체는 프로토타입을 가짐 = 프로토타입도 자신의 프로토타입을 갖음
  - 생성된 프로토타입의 프로토타입은 Object.prototype임



빌트인 생성자 함수가 아닌 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.





### 5.2. 빌트인 생성자 함수와 프로토타입 생성 시점

모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성되며 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.

![img](https://poiemaweb.com/assets/fs-images/19-13.png)

표준 빌트인 객체인 Object도 전역 객체의 프로퍼티이며 전역 객체가 생성되는 시점에 생성된다.  

다시 말해 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. 

**생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다.** 이로써 생성된 객체는 프로토타입을 상속받는다.





## 6.  객체 생성 방식과 프로토타입의 결정

#### 객체 생성 방법

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스 (ES6)

공통점 : 추상 연산에 의해 생성





### 6.1. 객체 리터럴에 의해 생성된 객체의 프로토타입

자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 때, 추상 연산 ObjectCreate를 호출한다. 이때 추상 연산 ObjectCreate에 전달되는 프로토타입은 Object.prototype이다. 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이다.

```javascript
const obj = { x: 1 };
```



위의 객체 리터럴이 평가되면 추상 연산 ObjectCreate에 의해 아래 그림과 같이 Object 생성자 함수와 Object.prototype과 생성된 객체 사이에 연결이 생성된다.



![img](https://poiemaweb.com/assets/fs-images/19-14.png)



객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 프로토타입으로 갖으며 이를 상속받는다. 따라서 Object.prototype의 constructor 프로퍼티와 hasOwnProperty 메서드를 자신의 자산인 것처럼 자유롭게 사용할 수 있다. 이는 obj 객체가 자신의 프로토타입인 Object.prototype 객체를 상속받았기 때문이다.





### 6.2. Object 생성자 함수에 의해 생성된 객체의 프로토타입

Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다.  Object 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산 ObjectCreate가 호출된다. 이때 추상 연산 ObjectCreate에 전달되는 프로토타입은 Object.prototype이다. 즉, Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 Object.prototype이다.

```javascript
const obj = new Object();
obj.x = 1;
```



객체 리터럴에 의해 생성된 객체와 동일한 구조를 갖으며 연결이 만들어 진다.



![img](https://poiemaweb.com/assets/fs-images/19-15.png)



이처럼 Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 프로토타입으로 갖게 되며, 이로써 Object.prototype을 상속받는다.

```javascript
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```

#### 객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이 

**프로퍼티를 추가하는 방식**

객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만 Object 생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야 한다.





### 6.3. 생성자 함수에 의해 생성된 객체의 프로토타입

new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성시 추상 연산 ObjectCreate가 호출된다. 이때 추상 연산 ObjectCreate에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다. 즉, **생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체**이다.

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');
```



추상 연산 ObjectCreate에 의해 다음과 같이 생성자 함수와 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체와 생성된 객체 사이에 연결이 만들어 진다.



![img](https://poiemaweb.com/assets/fs-images/19-16.png)

사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor 뿐이다.

- 프로토타입 = 객체

- 프로토타입에도 프로퍼티의 추가 / 삭제가 가능함

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 Person.prototype에 프로퍼티를 추가하여 하위(자식) 객체가 상속받을 수 있도록 구현
// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello();  // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```



Person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용할 수 있다.



![img](https://poiemaweb.com/assets/fs-images/19-17.png)





## 9. 오버라이딩과 프로퍼티 쉐도잉





> 오버라이딩(Overriding)
>
> 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식이다.
>
> 오버로딩(Overloading)
>
> 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메소드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식이다. 자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수는 있다.





## 10.1. 생성자 함수에 의한 프로토타입의 교체

![img](https://poiemaweb.com/assets/fs-images/19-20.png)







 객체 리터럴이 평가되면 추상 연산 ObjectCreate에 의해 아래와 같이 Object 생성자 함수와 Object.prototype과 생성된 객체 사이에 연결이 만들어 진다.

![img](https://poiemaweb.com/assets/fs-images/19-14.png)













Object.create 메서드

- 첫번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성
-  즉, **객체를 생성하면서** **직접적으로 상속을 구현**함



Object.create 메소드의 장점

- new 연산자가 없이도 객체를 생성할 수 있다.
- 객체 리터럴에 의해 생성된 객체도 특정 객체를 상속받을 수 있다.
- 프로토타입을 지정하면서 객체를 생성할 수 있다.

모든 객체의 프로토타입 체인의 종점(Object.prototype)의 메소드이므로 모든 객체가 상속받아 호출할 수 있음





























![img](https://poiemaweb.com/assets/fs-images/19-18.png)





function Person(name){

​	this.name = name;

}

const me = new Person('Lee');