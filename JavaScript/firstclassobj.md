# 함수와 일급객체

## 1. 일급 객체

* 일급 객체의 조건

1. 무명의 리터럴로 생성 가능 = 런타임에 생성 가능
2. 변수나 자료 구조(객체, 배열 등)에 저장 가능
3. 함수의 매개 변수에게 전달 가능
4. 함수의 결과값으로 반환 가능



## 2. 함수 객체의 프로퍼티

```javascript
function square(number) {
    return number * number;
}

console.log(Object.getOwnPropertyDesciptors(square)); // square 함수의 모든 프로퍼티 어트리뷰트를 Object.getOwnPropertyDesciptors 메소드로 확인시 

/*
{
  length: {value: 1, writable: false, enumerable: false, configurable: true},
  name: {value: "square", writable: false, enumerable: false, configurable: true},
  arguments: {value: null, writable: false, enumerable: false, configurable: false},
  caller: {value: null, writable: false, enumerable: false, configurable: false},
  prototype: {value: {...}, writable: true, enumerable: false, configurable: false}
}
*/

// __proto__는 square 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptor(square, '__proto__'));
// undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티이다.
// square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```



### 2.1. arguments 프로퍼티

* 함수 객체의 arguments 프로퍼티 값 = arguments 객체

  * 전달된 인수(argument)들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체(array-like object)

  * 함수 내부에서 지역 변수처럼 사용됨
  * 함수 외부에서 참조 불가



* 자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않음

* 함수 호출 시 매개변수 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않음



```javascript
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply());        // NaN
console.log(multiply(1));       // NaN
console.log(multiply(1, 2));    // 2
console.log(multiply(1, 2, 3)); // 2
```



함수 호출 시,

* 함수 몸체 내, 암묵적으로 매개변수 선언
* undefined로 초기화
* 인수 할당



* 매개변수의 개수 < 인수의 개수 경우

초과된 인수가 그냥 버려지는 것이 아님. 모든 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관됨

![img](https://poiemaweb.com/assets/fs-images/18-2.png)



* arguments 객체
  * 인수를 프로퍼티 값으로 소유
  * 프로퍼티 키 - 인수의 순서
  * callee 프로퍼티는 호출되어 arguments 객체를 생성한 함수(자기 자신)를 가리킴
  * arguments 객체의 length 프로퍼티 - 인수의 개수를 가리킴

```javascript
function multiply(x, y) {
  // 이터레이터
  const iterator = arguments[Symbol.iterator]();

  // 이터레이터의 next 메소드를 호출하여 이터러블 객체 arguments를 순회
  console.log(iterator.next()); // {value: 1, done: false}
  console.log(iterator.next()); // {value: 2, done: false}
  console.log(iterator.next()); // {value: 3, done: false}
  console.log(iterator.next()); // {value: undefined, done: true}

  return x * y;
}

multiply(1, 2, 3);
```



* 함수가 호출되면 인수 개수를 확인하고 이에 따라 함수의 동작을 달리 정의할 수 있는데 arguments 객체가 유용함
* arguments 객체는 매개변수 개수를 확정할 수 없는 **가변 인자 함수**를 구현시 유용함

```javascript
function sum() {
  let res = 0;

  // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum());        // 0
console.log(sum(1, 2));    // 3
console.log(sum(1, 2, 3)); // 6
```



* arguments 객체 = 배열의 형태 -> 인자 정보 담고 있으나

  실제 배열이 아닌 유사 배열 객체임

* 유사 배열 객체란? 

  * length 프로퍼티를 가진 객체로
  * for 문으로 순회할 수 있는 객체



### 2.2. caller프로퍼티

* 비표준 프로퍼티
* 함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 말함



### 2.3. length 프로퍼티

* 함수 객체의 length 프로퍼티는 함수 정의 시 선언한 매개변수의 개수를 말함

```javascript
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
```

* arguments 객체의 length 프로퍼티 = 인자의 개수
* 함수 객체의 length 프로퍼티 = 매개변수의 개수



### 2.4. name 프로퍼티

* 함수 이름을 나타냄
* (주의) ES5와 ES6에서 동작을 달리함

* **익명 함수 표현식** = **ES5**에서 name 프로퍼티는 **빈 문자열을 값**으로 갖지만 *ES6*에서는 *함수 객체를 가리키는 변수 이름을 값*으로 갖음

```javascript
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function() {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```

* 함수 호출 시 -> 함수 객체를 가리키는 변수 이름으로 호출



### 2.5. __proto__ 접근자 프로퍼티

* 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖음

* 이는 객체 지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 말함

* **[[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티**
* proto 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티임
* 내부 슬롯에는 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근 가능함
*  [[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 __proto__ 접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근 가능

```javascript
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메소드는 Object.prototype의 메소드이다.
console.log(obj.hasOwnProperty('a'));         // true
console.log(obj.hasOwnProperty('__proto__')); // false
```



> hasOwnProperty 메소드
>
> hasOwnProperty 메소드는 이름에서 알 수 있듯이 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환



### 2.6. prototype 프로퍼티

* 함수 객체만이 소유하는 프로퍼티
* 일반 객체에는 prototype 프로퍼티가 없음

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log((function() {}).hasOwnProperty('prototype')); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log(({}).hasOwnProperty('prototype')); // false
```

* 함수가 객체를 생성하는 생성자 함수로 사용될 때, 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킴