# 스코프

## 1. 스코프란?

* 스코프(Scope) : 유효범위
* 변수, 함수와 밀접한 연관



```javascript
function add(x, y) {
  // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
  // 즉, 매개변수의 스코프(유효범위)는 함수 몸체 내부이다.
  console.log(x, y); // 2 5
  return x + y;
}

add(2, 5);

// 매개변수는 함수 몸체 외부에서 참조할 수 없다.
console.log(x, y); // ReferenceError: x is not defined



// 변수는 코드의 가장 바깥 영역뿐만 아니라 코드 블록이나 함수 몸체 내에서도 선언 가능함
var var1 = 1; // 코드의 가장 바깥 영역에서 선언된 변수

if (true) {
  var var2 = 2; // 코드 블록 내에서 선언된 변수
  if (true) {
    var var3 = 3; // 중첩된 코드 블록 내에서 선언된 변수
  }
}

function foo() {
  var var4 = 4; // 함수 내에서 선언된 변수

  function bar() {
    var var5 = 5; // 중첩된 함수 내에서 선언된 변수
  }
}

console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3
console.log(var4); // ReferenceError: var4 is not defined
console.log(var5); // ReferenceError: var5 is not defined

```



* **모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)** - 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정됨

* **스코프 = 식별자가 유효한 범위**



```javascript
var x = 'global';

function foo() {
  var x = 'local';
  console.log(x); // ① local
}

foo();

console.log(x); // ② global
```

![img](https://poiemaweb.com/assets/fs-images/13-1.png)

* **스코프 = 식별자를 검색할 때 사용하는 규칙**

* 코드 실행시 코드의 문맥(Context)를 고려함

* 코드의 실행 위치와 주변에 위치한 코드들에 따라 달리 출력



> 코드의 문맥(Context)과 환경(Environment)
>
> “코드가 어디서 실행되며 주변에 어떤 코드들이 있는지”를 환경(Environment)이라고 부른다. 즉, 코드의 문맥(Context)은 환경들로 이루어진다. 이를 구현한 것이 “실행 컨텍스트(Execution context)”이며 모든 코드는 실행 컨텍스트에서 평가되고 실행된다. 스코프는 실행 컨텍스트와 깊은 관련이 있다. 이에 대해서는 [“23. 실행 컨텍스트”](https://poiemaweb.com/fastcampus/execution-context)에서 자세히 살펴보도록 하자.



* 스코프는 같은 이름을 갖는 변수의 충돌을 막아줌
* 변수 / 함수의 이름 = 어떤 값을 구별하여 식별 가능한 고유 이름
* **하나의 값**은 **유일한 식별자**에 연결(Name binding)되어야함
* 스코프 내에서 식별자는 유일해야 하지만 다른 스코프에는 같은 이름의 식별자를 사용할 수 있음



#### **var 키워드로 선언한 변수의 중복 선언**

```javascript
function foo() {
  var x = 1;
  // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
  // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
  var x = 2;
  console.log(x); // 2
}
foo();
```

* var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언이 허용
* 그러나 변수값이 재할당되어 변경되는 부작용 유발



```javascript
function bar() {
  let x = 1;
  // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
  let x = 2; // SyntaxError: Identifier 'x' has already been declared
}
bar();
```

* let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언 불허용





## 2. 스코프의 종류

* 코드 전역(global)과 지역(local)으로 구분

| 구분 | 설명                  | 스코프      | 변수      |
| :--: | :-------------------- | :---------- | :-------- |
| 전역 | 코드의 가장 바깥 영역 | 전역 스코프 | 전역 변수 |
| 지역 | 함수 몸체 내부        | 지역 스코프 | 지역 변수 |



### 2.1. 전역과 전역 스코프

![img](https://poiemaweb.com/assets/fs-images/13-2.png)

* 전역 : 코드의 가장 바깥 영역
* 전역에 선언된 변수 =  전역스코프를 갖는 전역 변수(global variable)
  * 전역 변수 = 어디서든지 참조 가능
* 위 예제상 x, y가 전역 변수, 이는 함수 내부에서도 참조 가능



### 2.2. 지역과 지역 스코프

* 지역 : 함수 몸체 내부

* 지역 = 지역 스코프(local scope) 생성
* 지역에 변수 선언시 -> 지역 스코프를 갖는 **지역 변수**(local variable)
* **지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서 유효**





# 3. 스코프 체인

* **스코프 : 함수의 중첩에 의해 계층적 구조를 갖음**
* 함수의 중첩 : 함수 몸체 내부에서 함수가 정의된 것

* **중첩 함수**(nested function) : 함수 몸체 내부에서 정의한 함수 
* **외부 함수**(outer function) : 중첩 함수를 포함하는 함수



![img](https://poiemaweb.com/assets/fs-images/13-3.png)



* 모든 스코프는 하나의 계층적 구조로 연결되며 모든 지역 스코프의 최상위 스코프는 전역 스코프임
* **스코프 체인**(Scope chain) : 스코프가 계층적으로 연결된 것

* **변수를 참조할 때, 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색**



> 렉시컬 환경(Lexical Environment)
>
> 스코프 체인은 실행 컨텍스트(Execution Context)의 렉시컬 환경(Lexical Environment)을 단방향으로 연결(Channing)한 것이다. 전역 렉시컬 환경은 코드가 로드되면 곧바로 생성되고 함수의 렉시컬 환경은 함수가 호출되면 곧바로 생성



### 3.1. 스코프 체인에 의한 변수 검색

* **상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 참조할 수 있지만 하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없음**



### 3.2. 스코프 체인에 의한 함수 검색

```javascript
// 전역 함수
function foo() {
  console.log('global function foo');
}

function bar() {
  // 중첩 함수
  function foo() {
    console.log('local function foo');
  }

  foo(); // ①
}

bar();
```

* 함수 선언문으로 함수를 정의하면 자바스크립트 엔진에 의해 다른 코드가 실행되기 이전에 함수 객체가 먼저 생성됨
* **자바스크립트 엔진은 함수 이름과 동일한 이름의 식별자를 암묵적으로 선언하고 생성된 함수 객체를 할당**
* 위 예제의 모든 함수는 자바스크립트 엔진에 의해 암묵적으로 선언된 함수 이름과 동일한 이름의 식별자에 할당된다. ①에서 함수 foo를 호출하면 자바스크립트 엔진은 함수를 호출하기 위해 먼저 함수를 가리키는 식별자 foo를 검색
* 함수는 식별자에 함수 객체가 할당된 것 외에는 일반 변수와 동일
* **스코프 = "식별자를 검색하는 규칙"**





## 4. 함수 레벨 스코프

* **함수 레벨 스코프**(Function level scope)
  * var 키워드로 선언된 변수는 오로지 **함수의 코드 블록** 만을 **지역 스코프**로 인정

예제 1)

```javascript
var x = 1;

if (true) {
  // var 키워드로 선언된 변수는 함수의 코드 블록 만을 지역 스코프로 인정한다.
  // 함수 밖에서 선언된 변수는 코드 블록 내에서 선언되었다 할 지라도 모두 전역 변수이다.
  // 따라서 x는 전역 변수이다. 이미 선언된 전역 변수 x가 있으므로 변수 x는 중복 선언된다.
  // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
  var x = 10;
}

console.log(x); // 10

```

예제 2)

```javascript
var i = 10;

// for문에서 선언한 i는 전역 변수이다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

// 의도치 않게 변수의 값이 변경되었다.
console.log(i); // 5
```

* for 문의 변수 i가 전역 변수가 되어 전역 변수 i가 중복 선언되고 결과적으로 전역 변수의 값이 재할당 됨
  * var 키워드로 선언된 변수는 블록 레벨 스코프를 인정하지 않기 때문





## 5. 렉시컬 스코프

```javascript
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

* 동적 스코프(Dynamic scope)
  * 함수가 호출되는 시점에 동적으로 상위 스코프를 결정
* 렉시컬 스코프(Lexical scope) = 정적 스코프(Static scope)
  * 동적 스코프 방식처럼 상위 스코프가 동적으로 변하지 않고 함수 정의가 평가되는 시점에 상위 스코프가 정적으로 결정
* 자바스크립트는 렉시컬 스코프를 따르므로 **함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위 스코프를 결정함** 