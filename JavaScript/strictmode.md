# strict mode

## strict mode란?

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

#### 암묵적 전역(implicit global)

선언되지 않은 x 변수의 선언을 스코프 체인을 통해 검색하여 foo 함수 컨텍스트의 상위 스코프에서 x 변수의 선언을 검색한다. (위 예제의 경우 전역 스코프)

전역 스코프에도 x 변수의 선언이 존재하지 않지만 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성하여 전역 객체의 x 프로퍼티를 마치 전역 변수처럼 사용할 수 있게 된다. 



- 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 큼
- 반드시 var, let, const 키워드를 사용하여 변수 선언 후 사용할 것



### strict mode의 추가

- ES5부터 추가됨
- 잠재적인 오류 발생을 억제할 수 있는 개발 환경을 위한 역할
- 자바스크립트 언어의 문법을 엄격히 적용하여 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러 처리



### ESLint

- 린트 도구 사용시 strict mode와 유사한 효과를 얻을 수 있음
- 정적 분석(static analysis)기능을 통해 소스코드를 실행하기 전 소스코드를 스캔하여 문법적 오류와 잠재적 오류를 찾아내고 이유를 리포팅해 줌

- 린트 도구는 strict mode가 제한하는 오류와 코딩 컨벤션을 설정 파일 형태로 정의 / 강제할 수 있음





##  strict mode의 적용

strict mode를 적용하려면 전역의 선두나 함수 몸체의 선두에 `'use strict';`를 추가

```javascript
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용됨

```javascript
function foo() {
  'use strict';

  x = 10; // ReferenceError: x is not defined
}
foo();
```

코드의 선두에 `'use strict';`를 위치시키지 않으면 strict mode가 제대로 동작하지 않음

```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  'use strict';
}
foo();
```



## strict mode 적용시 주의할 점

1. 전역에 strict mode를 적용하는 것

- 전역에 적용한 strict mode는 스크립트 단위로 적용되며 스크립트 단위로 적용된 strict mode는 다른 스크립트에 영향을 주지 않고 자신의 스크립트에 한정되어 적용된다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>
```



2. 함수 단위로 strict mode를 적용하는 것

어떤 함수는 strict mode를 적용하고 어떤 함수는 strict mode를 적용하지 않는 것은 바람직하지 않으며 모든 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이다. 그리고 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다. 따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

```javascript
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```





## strict mode가 발생시키는 에러

strict mode를 적용했을 때 에러가 발생하는 사례



#### 암묵적 전역

```javascript
// 선언하지 않은 변수를 참조할시 ReferenceError 발생

(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```



#### 변수, 함수, 매개변수의 삭제

```javascript
// delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생

(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```



#### 매개변수 이름의 중복

```javascript
// 중복된 매개변수 이름을 사용시 SyntaxError 발생

(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```



#### with 문의 사용

- with 문을 사용시 SyntaxError 발생

  with 문은 전달된 객체를 스코프 체인에 추가하고 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지나 성능과 가독성이 나빠지므로 사용하지 않는 것이 좋음

```javascript
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }
}());
```





## strict mode 적용에 의한 변화

### 일반 함수의 this

 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없으므로 strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩됨

```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```



### arguments 객체

strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경하여도 arguments 객체에 반영되지 않음

```javascript
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1));
```

