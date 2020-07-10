# 프로퍼티 어트리뷰트

## 1. 내부 슬롯과 내부 메소드

* ECMAScript 사양에서 사용하는 의사 프로퍼티(Pseudo property)와 의사 메소드(Pseudo method)를 말함

* ECMAScript 사양에 등장하는 **이중 대괄호([[…]])**로 감싼 이름들

* 자바스크립트 엔진에서 실제로 동작하나 외부로 공개된 객체의 프로퍼티는 아님 (비공개 개발자가 알아야 할 필요가 없어서...)
  * 자바스크립트 엔진의 내부 로직
  * 내부 슬롯과 내부 메소드에 직접적으로 접근하거나 호출할 수 있는 방법 제공하지 않음
* 단, 일부 내부 슬롯과 내부 메소드에 한하여 *간접적으로 접근*할 수 있는 *수단*을 제공





## 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

* 자바스크립트 엔진은 프로퍼티 생성 시,  **프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의**

* 프로퍼티의 상태란?

  * 프로퍼티의 값(value)
  * 값의 **갱신** 가능 여부(writable)
  * **열거** 가능 여부(enumerable)
  * **재정의** 가능 여부(configurable)

* 프로퍼티 어트리뷰트 = 자바스크립트 엔진이 관리하는 

  **내부 상태 값**(meta-property)인 **내부 슬롯**([[Value]], [[Writable]], [[Enumerable]], [[Configurable]])이다

* Object.getOwnPropertyDescriptor 메소드를 사용하여 간접적으로 확인 가능 (직접 접근 어려움)



```javascript
const person = {
  name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true}

----------------------------------------------------

const person = {
  name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

* 메소드 호출 시, 첫번째 매개변수에는 객체의 참조 전달
* 두번째 매개변수, 프로퍼티 키를 문자열로 전달

* Object.getOwnPropertyDescriptor 메소드

  * 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터(PropertyDescriptor) 객체**를 반환

* 존재하지 않는 프로퍼티 / 상속받은 프로퍼티에 대한 

  프로퍼티 디스크립터를 요구하면 undefined 반환

* Object.getOwnPropertyDescriptors 메소드 
  
  * 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환





## 3. 데이터 프로퍼티와 접근자 프로퍼티

#### 데이터 프로퍼티(Data property)

키와 값으로 구성된 일반적인 프로퍼티

(지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티이다)



#### 접근자 프로퍼티(Accessor property)

자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(Accessor function)로 구성된 프로퍼티





### 3.1. 데이터 프로퍼티

데이터 프로퍼티가 갖는 프로퍼티 어트리뷰트

자바스크립트 엔진이 프로퍼티 생성 시 - 기본값으로 자동 정의

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                         |
| :------------------ | :---------------------------------- | :----------------------------------------------------------- |
| [[Value]]           | value                               | - 프로퍼티 키를 통해 프로퍼티 값에 **접근하면 반환되는 값**이다. - 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당한다. 이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성된 프로퍼티의 [[Value]]에 값을 저장한다. |
| [[Writable]]        | writable                            | - 프로퍼티 **값의 변경 가능 여부**를 나타내며 **불리언** 값을 갖는다. - [[Writable]]의 값이 false인 경우, 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다. |
| [[Enumerable]]      | enumerable                          | - 프로퍼티의 **열거 가능 여부**를 나타내며 **불리언** 값을 갖는다. - [[Enumerable]]의 값이 false인 경우, 해당 프로퍼티는 for…in 문이나 Object.keys 메소드 등으로 열거할 수 없다. |
| [[Configurable]]    | configurable                        | - 프로퍼티의 **재정의 가능 여부**를 나타내며 **불리언** 값을 갖는다. - [[Configurable]]의 값이 false인 경우, 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지됨. 단, [[Writable]]이 true인 경우, [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용됨 |



예제)

```javascript
const person = {
  name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 취득한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true} 
// 4가지 프로퍼티 어트리뷰트의 정보를 제공함 (내부슬롯 객체 형태로 제공)
// 객체 리터럴로 만든 모든 데이터 프로퍼티는 읽기 쓰기가 가능하고 열거 가능하며 재정의 가능 
// person = object 'name' = string
```

* Object.getOwnPropertyDescriptor 메소드가 반환한 프로퍼티 디스크립터 객체의 value 프로퍼티의 값은 ‘Lee’
* => 프로퍼티 어트리뷰트 [[Value]]의 값이 ‘Lee’ 를 의미함
* [[Writable]], [[Enumerable]], [[Configurable]]의 값이 모두 true
* 프로퍼티가 생성될 때 [[Value]]의 값 = 프로퍼티 값으로 초기화
* [[Writable]], [[Enumerable]], [[Configurable]]의 기본값 true로 초기화 / 프로퍼티를 동적으로 추가해도 동일

```javascript
const person = {
  name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```



### 3.2. 접근자 프로퍼티

자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(Accessor function)로 구성된 프로퍼티



접근자 프로퍼티가 갖는 프로퍼티 어트리뷰트

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                         |
| :------------------ | :---------------------------------- | :----------------------------------------------------------- |
| [[Get]]             | get                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수이다. 즉, 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 **getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.** (값을 조작해서 줌) |
| [[Set]]             | set                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수이다. 즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 [[Set]]의 값, 즉 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다. |
| [[Enumerable]]      | enumerable                          | 데이터 프로퍼티의 [[Enumerable]]와 같다.                     |
| [[Configurable]]    | configurable                        | 데이터 프로퍼티의 [[Configurable]]와 같다.                   |

* 접근자 함수 = getter/setter 함수라고도 부름

* 접근자 프로퍼티는 getter와 setter 함수를 

  모두 정의하거나 하나만 정의할 수도 있음



```javascript
const person = {
  // 데이터 프로퍼티
  firstName: 'Ungmo',
  lastName: 'Lee',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티이다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭처링 할당
    [this.firstName, this.lastName] = name.split(' ');
  }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// firstName는 데이터 프로퍼티이다.
// 데이터 프로퍼티는 value, writable, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName는 접근자 프로퍼티이다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```



* person 객체의 firstName과 lastName 프로퍼티는 일반적인 데이터 프로퍼티

* get, set이 붙은 메소드 = getter와 setter 함수
* getter/setter 함수의 이름 fullName이 접근자 프로퍼티

* 접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 [[Value]])을 가지지 않음
*  다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여함



**내부 슬롯 / 메소드 관점** : 접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 [[Get]] 내부 메소드가 호출되어 아래와 같이 동작함

1. **프로퍼티 키가 유효한지 확인**한다. 

   프로퍼티 키 = 문자열 또는 심볼이어야 함

   프로퍼티 키 “fullName”은 문자열이므로 유효한 프로퍼티 키임

2. 프로토타입 체인에서 프로퍼티를 검색한다. person 객체에 fullName 프로퍼티가 존재한다.

3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다. fullName 프로퍼티는 접근자 프로퍼티이다.

4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다. 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 Object.getOwnPropertyDescriptor 메소드가 반환하는 프로퍼티 디스크립터(PropertyDescriptor) 객체의 get 프로퍼티 값과 같다.



```javascript
// 일반 객체의 __proto__는 접근자 프로퍼티이다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티이다.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}
```

* 접근자 프로퍼티와 데이터 프로퍼티 디스크립터 객체의 프로퍼티가 다름





## 4. 프로퍼티 정의

- 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하는 것

* 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것
* 객체의 프로퍼티가 어떻게 동작해야 하는지를 명확히 정의할 수 있음
  * ex) 프로퍼티 값을 갱신 가능하도록 할 것인지, 열거 가능하도록 할 것인지, 재정의 가능하도록 할 것인지 등



```javascript
// Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다. 
// 인수로는 객체의 참조와 데이터 프로퍼티의 키인 문자열, 프로퍼티 디스크립터 객체를 전달한다.

const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
  value: 'Ungmo',
  writable: true,
  enumerable: true,
  configurable: true
});

Object.defineProperty(person, 'lastName', {
  value: 'Lee'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Ungmo", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false인 경우,
// 해당 프로퍼티는 for…in 문이나 Object.keys 등으로 열거할 수 없다.
// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ["firstName"]

// [[Writable]]의 값이 false인 경우, 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
// 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = 'Kim';

// [[Configurable]]의 값이 false인 경우, 해당 프로퍼티를 삭제할 수 없다.
// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
// 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;

// [[Configurable]]의 값이 false인 경우, 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
  // getter 함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}

person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}
```



Object.defineProperty 메소드로 프로퍼티 정의할 때 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략 가능

프로퍼티 디스크립터 객체에서 생략된 어트리뷰트는 아래와 같이 기본값이 적용됨

| 프로퍼티 디스크립터 객체의 프로퍼티 | 대응하는 프로퍼티 어트리뷰트 | 디스크립터 객체의 프로퍼티 누락 시의 기본값 |
| :---------------------------------- | :--------------------------- | :------------------------------------------ |
| value                               | [[Value]]                    | undefined                                   |
| get                                 | [[Get]]                      | undefined                                   |
| set                                 | [[Set]]                      | undefined                                   |
| writable                            | [[Writable]]                 | false                                       |
| enumerable                          | [[Enumerable]]               | false                                       |
| configurable                        | [[Configurable]]             | false                                       |



Object.defineProperty 메소드는 한번에 하나의 프로퍼티만 정의할 수 있다.

 Object.defineProperties 메소드를 사용하면 여러 개의 프로퍼티를 한번에 정의할 수 있다.

```javascript
const person = {};

Object.defineProperties(person, {
  // 데이터 프로퍼티 정의
  firstName: {
    value: 'Ungmo',
    writable: true,
    enumerable: true,
    configurable: true
  },
  lastName: {
    value: 'Lee',
    writable: true,
    enumerable: true,
    configurable: true
  },
  // 접근자 프로퍼티 정의
  fullName: {
    // getter 함수
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set(name) {
      [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
  }
});

person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}
```





## 5. 객체 변경 방지

* 객체 = 재할당없이 직접 변경이 가능. 즉, 변경 가능한 값임.
  * 프로퍼티 추가 / 삭제 O
  * 프로퍼티 값 갱신 O
  * Object.defineProperty 또는 Object.defineProperties 메소드를 사용하여 프로퍼티 어트리뷰트를 재정의 O

| 구분           | 메소드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| :------------- | :----------------------- | :-----------: | :-----------: | :--------------: | :--------------: | :------------------------: |
| 객체 확장 금지 | Object.preventExtensions |       ✕       |       ○       |        ○         |        ○         |             ○              |
| 객체 밀봉      | Object.seal              |       ✕       |       ✕       |        ○         |        ○         |             ✕              |
| 객체 동결      | Object.freeze            |       ✕       |       ✕       |        ○         |        ✕         |             ✕              |



### 5.1. 객체 확장 금지

* Object.preventExtensions 메서드는 객체 확장을 금지함 

  이는 프로퍼티 추가 금지를 말한다.

* **확장이 금지된 객체는 프로퍼티 추가가 금지**됨

  * 프로퍼티 동적 추가 금지
  * Object.defineProperty 메서드로 추가 금지



* Object.isExtensible 메서드를 사용하여 확장이 금지된 객체인지 여부 확인 가능함

```javascript
const person = { name: 'Lee' };

// person 객체는 확장이 금지된 객체가 아니다.
console.log(Object.isExtensible(person)); // true

// person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtensions(person);

// person 객체는 확장이 금지된 객체다.
console.log(Object.isExtensible(person)); // false

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 추가는 금지되지만 삭제는 가능하다.
delete person.name;
console.log(person); // {}

// 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
Object.defineProperty(person, 'age', { value: 20 });
// TypeError: Cannot define property age, object is not extensible
```



### 5.2. 객체 밀봉

* Object.seal 메소드 : 객체를 밀봉함
* 객체 밀봉(seal)?
  * 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미
  * **밀봉된 객체는 읽기와 쓰기만 가능!**
* Object.isSealed 메소드로 확인 

```javascript
const person = { name: 'Lee' };

// person 객체는 밀봉(seal)된 객체가 아니다.
console.log(Object.isSealed(person)); // false

// person 객체를 밀봉(seal)하여 프로퍼티 추가, 삭제, 재정의를 금지한다.
Object.seal(person);

// person 객체는 밀봉(seal)된 객체다.
console.log(Object.isSealed(person)); // true

// 밀봉(seal)된 객체는 configurable가 false이다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: false},
}
*/

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신은 가능하다.
Object.defineProperty(person, 'name', { value: 'Kim' });
console.log(person); // {name: "Kim"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name
```



### 5.3. 객체 동결

* Object.freeze 메소드 : 객체를 동결
* 객체 동결(freeze)이란? 
  * 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미
  * **동결된 객체는 읽기만 가능**!

* Object.isFrozen 메소드로 확인 

```javascript
const person = { name: 'Lee' };

// person 객체는 동결(freeze)된 객체가 아니다.
console.log(Object.isFrozen(person)); // false

// person 객체를 동결(freeze)하여 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
Object.freeze(person);

// person 객체는 동결(freeze)된 객체다.
console.log(Object.isFrozen(person)); // true

// 동결(freeze)된 객체는 writable과 configurable가 false이다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: false, enumerable: true, configurable: false},
}
*/

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신이 금지된다.
person.name = 'Kim'; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { value: 'Kim' });
// TypeError: Cannot redefine property: name
```



### 5.4. 불변 객체

* Object.freeze 메소드로 객체를 동결하여도 중첩 객체까지 동결할 수 없음

* **얕은 변경 방지**(Shallow only)로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지는 못하기 때문

```javascript
const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
};

// 얕은 객체 동결
Object.freeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false

person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Busan"}}
```



객체의 중첩 객체까지 동결하여 변경이 불가능한 **읽기 전용의 불변 객체**(immutable object)를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 **Object.freeze 메소드를 호출**해야 함



```javascript
function deepFreeze(target) {
  // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    /*
      모든 프로퍼티를 순회하며 재귀적으로 동결한다.
      Object.keys 메소드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
      ("19.15.2. Object.keys/values/entries 메소드" 참고)
      forEach 메소드는 배열을 순회하며 배열의 각 요소에 대하여 콜백 함수를 실행한다.
      ("27.9.2. Array.prototype.forEach" 참고)
    */
    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
};

// 깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결한다.
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Seoul"}}
```

