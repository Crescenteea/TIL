# 객체 리터럴

## 1. 객체란?

* 자바스크립트를 이루고 있는 거의 “모든 것”
* 원시 값을 제외한 나머지 값들(함수, 배열, 정규표현식 등)
* 다양한 타입의 값(원시 값 또는 다른 객체)들을 하나의 단위로 구성한 복합적인 자료 구조(Data structure)
* **객체는 변경 가능한 값(mutable value)**



![img](https://poiemaweb.com/assets/fs-images/10-1.png)



* 객체의 구성 : 프로퍼티 + 메소드
  * **프로퍼티** : **객체의 상태**를 나타내는 값(data)
  * **메소드** : 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 **동작**(behavior)





## 2. 객체 리터럴에 의한 객체 생성

* 자바스크립트는 프로토타입 기반 객체지향 언어

* 객체 생성 방법

  * **객체 리터럴(일반적인 방법)** : 객체를 생성하는 표기법
    * 중괄호({…}) 내에 0개 이상의 프로퍼티를 정의
    *  변수에 할당이 이루어지는 시점, 자바스크립트 엔진은 객체 리터럴을 해석
    * 객체 생성

  * Object 생성자 함수
  * 생성자 함수
  * Object.create 메소드
  * 클래스 (ES6)

* 객체 리터럴의 중괄호는 코드 블록이 아님
* 코드 블록의 닫는 {...} 뒤에는 세미 콜론 X
* 객체 리터럴 = 표현식, 값으로 평가됨
*  객체 리터럴의 } 뒤에는 세미 콜론 O
* 숫자 값이나 문자열을 만드는 것과 유사하게 리터럴로 객체를 생성
* 객체 리터럴에 프로퍼티를 포함시켜 객체 생성과 동시에 프로퍼티 생성 가능 
  * 객체 생성 이후 프로퍼티를 동적으로 추가도 가능

* 객체 리터럴 이외의 객체 생성 방식은 모두 함수 사용





## 3. 프로퍼티

* **객체 : 프로퍼티(Property)들의 집합**

* **프로퍼티 : 키(key)와 값(value)**

```javascript
var person = {
  // 프로퍼티 키는 name, 프로퍼티 값은 'Lee'
  name: 'Lee',
  // 프로퍼티 키는 age, 프로퍼티 값은 20
  age: 20
};
```



* 프로퍼티 키와 값으로 사용 가능한 값
  * 프로퍼티 **키** : 빈 문자열을 포함하는 모든 문자열 또는 symbol 값
  * 프로퍼티 **값** : 자바스크립트에서 사용할 수 있는 모든 값
* 프로퍼티 키
  * 프로퍼티 값에 접근 가능
  * 식별자 역할
  * 식별자 네이밍 규칙 필요 없음
  * 그러나 네이밍 규칙을 준수한 프로퍼티 키와 준수하지 않은 프로퍼티 키는 차이 有
* 문자열 사용(일반적)
* ‘…’ 또는 “…”로 묶어야 함
* 자바스크립트에서 사용 가능한 유효한 이름 = 따옴표 생략 O
* **식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 함**

```javascript
var person = {
  firstName: 'Ung-mo', // 유효한 이름
  'last-name': 'Lee'   // 유효하지 않은 이름
    //네이밍 규칙에 어긋남
    //자바스크립트 엔진은 따옴표를 생략한 last-name을 - 연산자가 있는 표현식으로 해석
};

console.log(person); // {firstName: "Ung-mo", last-name: "Lee"}
```



* 프로퍼티 키 동적 생성
  * 문자열 또는 문자열로 평가할 수 있는 표현식 사용
  * 프로퍼티 키로 사용할 표현식을 대괄호([…])로 묶음
  * **계산된 프로퍼티 이름**

```javascript
var obj = {};
var key = 'hello';

// ES5: 프로퍼티 키 동적 생성
obj[key] = 'world';
// ES6: 프로퍼티 키 동적 생성
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}
```



* 빈 문자열 사용 = 에러 발생 X
* 그러나 키로서의 의미 X

```javascript
var foo = {
  '': ''  // 빈문자열도 프로퍼티 키로 사용할 수 있다.
};

console.log(foo); // {"": ""}
```



* 프로퍼티 키로 숫자 리터럴을 사용하면 따옴표는 붙지 않지만 내부적으로는 암묵적 타입 변환을 통해 문자열로 변환됨

```javascript
var foo = {
  0: 1,
  1: 2,
  2: 3
};

console.log(foo); // {0: 1, 1: 2, 2: 3}
```



* 예약어(Reserved word)를 프로퍼티 키로 사용해도 에러가 발생하지 않음(권장사항 아님)

```javascript
var foo = {
  var: '',
  function: ''
};

console.log(foo); // {var: "", function: ""}
```



* 기존 프로퍼티 키의 중복 선언시 후에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어씀

```javascript
var foo = {
  name: 'Lee',
  name: 'Kim'
};

console.log(foo); // {name: "Kim"}
```





## 4. 메소드

*  자바스크립트의 함수 = 객체

* 함수는 값으로 취급 가능, 따라서 프로퍼티 값으로 사용할 수 있음
* 일반 함수와 구분하기 위해 메소드(method)라 칭함
* **메소드** : **객체에 제한되어 있는 함수**

```javascript
var circle = {
  radius: 5, // ← 프로퍼티

  // 원의 지름
  getDiameter: function () { // ← 메소드
    return 2 * this.radius; // this는 circle(객체 자신을 가리키는 참조변수)를 가리킨다.
  }
};

console.log(circle.getDiameter());  // 10
```





## 5. 프로퍼티 접근

* 프로퍼티 값에 접근
  * **마침표 표기법(Dot notation)**  
  * **대괄호 표기법(Bracket notation)**

* 프로퍼티 키가 식별자 네이밍 규칙을 따르는 이름이면 위의 두 표기법 모두 사용 가능
* **대괄호 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열**을 씀

```javascript
var person = {
  name: 'Lee'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee

// . 또는 [] 의 좌측에는 객체로 평가할 수 있는 표현식
// .의 우측 또는 [] 내부에는 프로퍼티 키를 지정 
```



* 대괄호 내의 따옴표로 감싸지 않은 이름을 쓴다면 자바스크립트 엔진은 식별자로 해석함
* 식별자 name을 평가하기 위해 선언된 name을 찾았지만 찾지 못하여 ReferenceError 발생 ↓

```javascript
var person = {
  name: 'Lee'
};

console.log(person[name]); // ReferenceError: name is not defined
```



* 객체에 존재하지 않는 프로퍼티에 접근시 undefined를 반환
* ReferenceError 발생하지 않음에 주의

```javascript
var person = {
  name: 'Lee'
};

console.log(person.age); // undefined
```



* 식별자 네이밍 규칙에 어긋나는 프로퍼티 키 = [ ] 표기법 必
* [ ]내 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 함
* 숫자로 이루어진 프로퍼티 키 = 따옴표 생략 가능 

```javascript
var person = {
  'last-name': 'Lee',
  1: 10
};

person.'last-name';  // -> SyntaxError: Unexpected string
person.last-name;    // -> 브라우저 환경: NaN
                     // -> Node.js 환경: ReferenceError: name is not defined
person[last-name];   // -> ReferenceError: last is not defined
person['last-name']; // -> Lee

// 프로퍼티 키가 숫자로 이루어진 문자열인 경우, 따옴표를 생략 가능하다.
person.1;     // -> SyntaxError: Unexpected number
person.'1';   // -> SyntaxError: Unexpected string
person[1];    // -> 10 : person[1] -> person['1']
person['1'];  // -> 10
```





## 6. 프로퍼티 값 갱신

* 기존 프로퍼티에 값 할당 시 - 프로퍼티 값이 갱신됨

```javascript
var person = {
  name: 'Lee'
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
person.name = 'Kim';

console.log(person);  // {name: "Kim"}
```





## 7. 프로퍼티 동적 생성

* 존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당됨

```javascript
var person = {
  name: 'Lee'
};

// person 객체에는 age 프로퍼티가 존재하지 않는다.
// 따라서 person 객체에 age 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.age = 20;

console.log(person); // {name: "Lee", age: 20}
```





## 8. 프로퍼티 삭제

* delete 연산자 = 객체의 프로퍼티 삭제
* delete 연산자의 피연산자는 표현식이어야 함
* 존재하지 않는 프로퍼티 삭제시 무시됨(에러X)

```javascript
var person = {
  name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

// person 객체에 age 프로퍼티가 존재한다.
// 따라서 delete 연산자로 age 프로퍼티를 삭제할 수 있다.
delete person.age;

// person 객체에 address 프로퍼티가 존재하지 않는다.
// 따라서 delete 연산자로 address 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.address;

console.log(person); // {name: "Lee"}
```





## 9. ES6에서 추가된 객체 리터럴의 확장 기능

### 9.1. 프로퍼티 축약 표현

* 프로퍼티의 값은 변수에 할당된 값, 즉 식별자 표현식일 수도 있음

* ES6, 프로퍼티 값으로 변수를 사용하는 경우, 변수 이름과 프로퍼티 키가 동일한 이름일 때, 프로퍼티 키를 생략(Property shorthand) 가능

  ```javascript
  // ES5
  var x = 1, y = 2;
  
  var obj = {
    x: x,
    y: y
  };
  
  console.log(obj); // {x: 1, y: 2}
  
  
  // ES6
  let x = 1, y = 2;
  
  // 프로퍼티 축약 표현
  const obj = { x, y };
  // 프로퍼티 키는 변수 이름으로 자동 생성됨
  console.log(obj); // {x: 1, y: 2}
  
  ```



### 9.2. 프로퍼티 키 동적 생성

* 문자열 또는 문자열로 평가할 수 있는 표현식 사용
* 프로퍼티 키로 사용할 표현식을 대괄호([…])로 묶음
* **계산된 프로퍼티 이름**(Computed property name) 이라 함
* ES5에서는 객체 리터럴 외부에서 대괄호([…]) 표기법을 사용해야 함

```javascript
// ES5
var prefix = 'prop';
var i = 0;

var obj = {};

// 프로퍼티 키 동적 생성
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```



* ES6에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성 가능 

```javascript
// ES6
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 프로퍼티 키 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```



### 9.3. 메소드 축약 표현

* ES5에서 메소드를 정의하려면 프로퍼티 값으로 함수를 할당
* 메소드를 정의시, function 키워드를 생략한 축약 표현 사용 가능

```javascript
// ES5
var obj = {
  name: 'Lee',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee


// ES6
const obj = {
  name: 'Lee',
  // 메소드 축약 표현
  sayHi() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

