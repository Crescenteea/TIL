# 데이터 타입(data type)

* 값의 종류

* 자바스크립트의 모든 값은 데이터 타입을 갖음

* 개발자는 명확한 의도를 가지고 타입을 구별하여 값을 생성

  -> **자바스크립트 엔진**은 타입을 **구별**하여 값을 취급할 것

* ES6 : 7개 데이터 타입 제공
  * 원시 타입(primitive type) : 6개의 타입
  
    * 숫자(number) 타입
  
      숫자. 정수와 실수 구분없이 하나의 숫자 타입만 존재
  
    * 문자열(string) 타입
  
      문자열
  
    * 불리언(boolean) 타입
  
      논리적 참(true)과 거짓(false)
  
    * undefined 타입
  
      var 키워드로 선언된 변수에 암묵적으로 할당되는 값
  
    * null 타입
  
      값이 없다는 것을 의도적으로 명시할 때 사용하는 값
  
    * Symbol 타입
  
      ES6에서 새롭게 추가된 7번째 타입
  
  * 객체 타입(object/reference type) : 1개의 타입
  
    * 객체, 함수, 배열 등



### 1. 숫자 타입

* 하나의 숫자 타입만 존재(정수와 실수 구분X)

* 숫자 타입 값 : 배정밀도 64비트 부동소수점 형식의 2진수
* **모든 수**를 **실수**로 처리, 정수 표현을 위한 데이터 타입 부재

```javascript
// 모두 숫자 타입
var integer = 10;    // 정수
var double = 10.12;  // 실수
var negative = -20;  // 음의 정수
```



* 2진수, 8진수, 16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 해석

```javascript
var binary = 0b01000001; // 2진수
var octal = 0o101;       // 8진수
var hex = 0x41;          // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65
```



* 정수로 표시되도 사실은 실수

  정수로 표시되는 수 끼리 나누어도 실수 출력

  ```javascript
  console.log(1 === 1.0); // true
  console.log(4 / 2);     // 2
  console.log(3 / 2);     // 1.5
  ```



* 숫자 타입은 추가적으로 3가지 특별한 값들도 표현 가능
  * Infinity : 양의 무한대
  * -Infinity : 음의 무한대
  * NaN : 산술 연산 불가(not-a-number)

```javascript
console.log(10 / 0);       // Infinity
console.log(10 / -0);      // -Infinity
console.log(1 * 'String'); // NaN
```



* 대소문자를 구별(case-sensitive)
  * NaN의 표기에 주의(NAN, Nan, nan : 에러 발생)

```javascript
var x = nan; // ReferenceError: nan is not defined
```



### 2. 문자열 타입

* 문자열(string) 

  * 텍스트 데이터를 나타냄

  * 0개 이상의 16비트 유니코드 문자(UTF-16)들의 집합

  * **작은 따옴표('')**, 큰 따옴표("") 또는 백틱(``)으로 감쌈

    * 왜? 토큰(키워드나 식별자 등)과 구분하기 위함

    * 감싸지 않는다면 자바스크립트 엔진은 토큰으로 인식함

      공백 문자 포함이 어려움

```javascript
var string;
string = '문자열'; // 작은 따옴표
string = "문자열"; // 큰 따옴표
string = `문자열`; // 백틱 (ES6)

string = '작은 따옴표로 감싼 문자열 내의 "큰 따옴표"는 문자열로 인식된다.';
string = "큰 따옴표로 감싼 문자열 내의 '작은 따옴표'는 문자열로 인식된다.";
```



### 3. 템플릿 리터럴

* Template literal
* ES6부터 도입된 新 문자열 표기법
* 편리한 문자열 처리 기능 제공
  * 멀티라인 문자열(Multi-line string)
  * 표현식 삽입(Expression interpolation)
  * 태그드 템플릿(Tagged template) 등
* 백틱(backtick) `을 사용

```javascript
var template = `Template literal`;
console.log(template); // Template literal
```



#### 3.1. 멀티라인 문자열

* 일반 문자열 내 줄바꿈(개행) 불허

```javascript
var str = 'Hello
world.';
// SyntaxError: Invalid or unexpected token
```



* 일반 문자열 내 줄바꿈
  * 백슬래시(\)로 시작하는 이스케이프 시퀀스(Escape sequence)를 사용

| 이스케이프 시퀀스 | 의미                                                         |
| :---------------- | :----------------------------------------------------------- |
| \0                | Null                                                         |
| \b                | 백스페이스                                                   |
| \f                | 폼 피드(Form Feed): 프린트 출력시 다음 페이지의 시작으로 이동한다. |
| \n                | 개행(LF, Line Feed): 다음 행으로 이동                        |
| \r                | 개행(CR, Carriage Return): 커서를 처음으로 이동              |
| \t                | 탭(수평)                                                     |
| \v                | 탭(수직)                                                     |
| \uXXXX            | 유니코드. 예를 들어 ‘\u0041’은 ‘A’, ‘\uD55C’는 ‘한’, ‘\u{1F600}’는 😀이다. |
| \’                | 작은 따옴표                                                  |
| \”                | 큰 따옴표                                                    |
| \\                | 백슬래시                                                     |



* 템플릿 리터럴 내 줄바꿈
  * 이스케이프 시퀀스 사용 없이도 허용
  * 모든 공백(white space)도 있는 그대로 적용

```javascript
//일반 문자열 내 이스케이프 시퀀스 사용한 줄바꿈 예시
var template = '<ul>\n\t<li><a href="#">Home</a></li>\n</ul>';

console.log(template);
/*
<ul>
  <li><a href="#">Home</a></li>
</ul>
*/


//템플릿 리터럴 내 줄바꿈 예시
var template = `<ul>
  <li><a href="#">Home</a></li>
</ul>`;

console.log(template);
/*
<ul>
  <li><a href="#">Home</a></li>
</ul>
*/
```



#### 3.2. 표현식 삽입

* 문자열은 문자열 연산자 +를 사용해 연결 가능
* \+ 연산자는 피연산자 중 하나 이상이 문자열인 경우, 문자열 연결 연산자로 동작
* 그 외의 경우 덧셈 연산자로 동작

```javascript
var first = 'Timothee';
var last = 'Chalemet';

// ES5: 문자열 연결
console.log('His name is ' + first + ' ' + last + '.');
// His name is Timothee Chalemet.
```



* **표현식 삽입**(Expression interpolation)을 통해 간단히 문자열 삽입 가능
* 문자열 연산자보다 간편하고 가독성이 좋음

```javascript
var first = 'Timothee';
var last = 'Chalemet';

// ES6: 표현식 삽입
console.log(`His name is ${first} ${last}.`);
// His name is Timothee Chalemet.
```



* 표현식 삽입 : `${  }`로 감쌈

  표현식의 평가 결과가 **문자열이 아니더라도** 문자열로 **강제 타입 변환**되어 삽입



```javascript
//템플릿 리터럴 내 표현식 삽입의 경우
console.log(`1 + 2 = ${1 + 2}`); // 1 + 2 = 3

//템플릿 리터럴이 아닌 일반 문자열에서 표현식 삽입의 경우
console.log('1 + 2 = ${1 + 2}'); // 1 + 2 = ${1 + 2}
```



### 4. 불리언 타입

* 값 : 논리적 **참(true)**과 **거짓(false)**

```javascript
var foo = true;
console.log(foo); // true

foo = false;
console.log(foo); // false
```



* 참과 거짓으로 구분되는 조건에 의해 프로그램의 흐름을 제어하는 조건문에서 자주 사용



### 5. undefined 타입

* 값 : undefined(유일)

* var 키워드로 선언한 변수 - undefined로 초기화

  즉, 변수 선언에 의해 확보된 메모리 공간을 처음 할당이 이뤄지기 전까지 빈 상태로 내버려두지 않고 자바스크립트 엔진이 undefined를 부여해줌

```javascript
var foo;
console.log(foo); // undefined
```



* 개발자는 자바스크립트 엔진이 변수 초기화에 사용하는 undefined를 의도적으로 변수에 할당하지 않도록 주의
  * 변수에 값이 없음을 명시할 때 : **null** 할당
  * 

### 6. null 타입

* 값 : null(유일)
* 자바스크립트는 대소문자를 구별(case-sensitive)
* null은 Null, NULL등과 다름
* null 할당 = 변수가 이전에 참조하던 값을 더이상 참조하지 않음을 의미
  - **이전**에 할당되어 있던 **값**에 대한 참조를 명시적으로 **제거**
  - 자바스크립트 엔진은 누구도 참조하지 않는 메모리 공간에 대해 가비지 콜렉션을 수행

* 함수가 유효한 값을 반환할 수 없는 경우, 명시적으로 null을 반환



### 7. symbol 타입

* ES6에서 추가된 7번째 타입
* 원시 타입 값
* 변경 불가

* 이름의 충돌 위험이 없는 객체의 유일한 프로퍼티 키(property key) 생성위해 사용

* 심볼은 **Symbol 함수**를 **호출**해 생성

* 생성된 심볼 값은 노출되지 않으며 **다른 값과 절대 중복되지 아니 함**



### 8. 객체 타입

* 자바스크립트 = 객체 기반 언어
* 자바스크립트를 이루고 있는 거의 모든 것 = 객체



### 9. 데이터 타입의 필요성

#### 9.1. 데이터 타입에 의한 메모리 공간의 확보와 참조

* 메모리 공간의 확보
  * 컴퓨터는 숫자 값 100을 저장하기 위해 메모리 공간을 확보
  * 확보된 메모리에 해당 숫자 값을 2진수화 시켜 저장
  * 자바스크립트 엔진은 값의  종류에 따라 이 때 필요한 메모리 공간의 크기를 값의 종류에 따라 확보한다.
  * 변수에 할당되는 값의 데이터 타입에 따라 확보해야 할 메모리 공간의 크기가 결정 
* 식별자를 통해 숫자 타입의 값이 저장되어 있는 메모리 공간의 주소를 찾을 수 있음

* 값의 참조
  * 값을 참조하려면 메모리 셀의 개수(byte 수)를 알아야 함
    * 메모리 셀의 개수 = 한번에 읽어 들여야 할 메모리 공간의 크기



#### 9.2. 데이터 타입에 의한 값의 해석

* 데이터 타입이필요한 이유
  * 값을 저장할 때 확보해야 하는 **메모리 공간의 크기**를 결정하기 위해
  * 값을 참조할 때 한번에 읽어 들여야 할 **메모리 공간의 크기**를 결정하기 위해
  * 메모리에서 읽어 들인 **2진수를 어떻게 해석**할 지를 결정하기 위해



### 10. 동적 타이핑

#### 10.1. 동적 타입 언어와 정적 타입 언어

* 정적 타입(Static/Strong type) 언어 = 명시적 타입 선언(explicit type declaration)

  * 변수 선언시 변수에 할당할 수 있는 값의 종류, 

    즉 데이터 타입을 사전에 선언해야 함 

  * 대표적 정적 타입 언어 : C, C++, Java, Kotlin, Go, Haskell, Rust, Scala 등

* **동적 타입(Dynamic/Weak type) 언어**
  * **변수**는 선언이 아닌 **할당**에 의해 **타입이 결정**됨
  * **재할당**에 의해 **변수의 타입은** 언제든지 **동적**으로 변할 수 있음 
  * 대표적 동적 타입 언어 : **자바스크립트**, Python, PHP, Ruby, Lisp, Perl 등



#### 10.2. 동적 타입 언어와 변수

**동적 타입 언어**

* 변수에 어떤 데이터 타입의 값이라도 자유롭게 할당 가능(데이터 타입)
* 유연성(flexibility) ↑ / 신뢰성(reliability) ↓



**변수**

* 변수 값, 재할당에 의해 항시 변경 가능하여 자바스크립트가 타입을 예측하는데 오류가 발생할 가능성이 크므로,  변수는 필요한 경우에 한해 제한적으로 사용해야 함
* 동적 타입 언어의 변수는 값을 확인하기 전에는 타입을 확신할 수 없음
* 변수의 유효 범위(스코프)는 최대한 좁게 만들어야 함
  * 넓은 스코프는 오류 발생 확률을 높임
* 전역 변수는 사용 자제할 것
  * 전역 변수는 의도치 않게 값이 변경될 가능성이 높음
  * 타 코드에 영향을 줄 가능성 높음
  * 복잡성을 증가시킴
  * 처리의 흐름을 추적하기 어려움
  * 오류 원인 특정이 어려움

* 변수 이름은 변수의 목적, 의미를 파악할 수 있어야 함

