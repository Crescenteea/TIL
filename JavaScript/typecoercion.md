# 타입 변환과 단축 평가

## 1. 타입 변환이란?

* 모든 값은 타입을 갖음
* **명시적 타입 변환(Explicit coercion)** 또는 **타입 캐스팅(Type casting)** : 개발자의 의도에 의해 다른 타입으로 변환 가능
* **암묵적 타입 변환(Implicit coercion)** 또는 **타입 강제 변환(Type coercion)** : 개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환

```javascript
var x = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
var str = x.toString();
console.log(typeof str, str); // string 10

// 변수 x의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10



// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
var str = x + '';
console.log(typeof str, str); // string 10

// 변수 x의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```



* 명시적 타입 변환이나 암묵적 타입 변환, 기존 원시값(위 예제의 경우, 변수 x의 값)을 직접 변경하는 것 X
* 원시값 = 변경 불가능한 값(imuutable value)

* 타입 변환 = **기존 원시값**을 사용, **다른 타입의 새로운 원시값**을 생성하는 것

```javascript
// 원시값 1이 '1'로 직접 변경되는 것이 아니다.
// 1을 사용해 타입이 다른 '1'을 새롭게 생성하여 '1' + ''을 평가한다.
1 + '' // '1'
```





## 2. 암묵적 타입 변환

* 자바스크립트 엔진은 코드의 문맥을 고려하여 암묵적으로 데이터 타입을 강제 변환(암묵적 타입 변환)하기도 함
* 가급적 에러를 발생시키지 않게하기 위함

```javascript
// 피연산자가 모두 문자열 타입이여야 하는 문맥
'10' + 2  // '102'

// 피연산자가 모두 숫자 타입이여야 하는 문맥
5 * '10'  // 50

// 피연산자 또는 표현식이 불리언 타입이여야 하는 문맥
!0 // true
if (1) { }
```



### 2.1. 문자열 타입으로 변환

```javascript
1 + '2' // "12"
```

* \+ 연산자는 **피연산자 중 하나 이상**이 **문자열**이므로 문자열 연결 연산자로 동작

* **문자열 연결 연산자**의 모든 피연산자는 코드의 문맥 상 **모두 문자열 타입이여야** 함
* 따라서 암묵적 타입 변환이 이루어 짐

```javascript
// 숫자 타입
0 + ''              // "0"
-0 + ''             // "0"
1 + ''              // "1"
-1 + ''             // "-1"
NaN + ''            // "NaN"
Infinity + ''       // "Infinity"
-Infinity + ''      // "-Infinity"

// 불리언 타입
true + ''           // "true"
false + ''          // "false"

// null 타입
null + ''           // "null"

// undefined 타입
undefined + ''      // "undefined"

// 심볼 타입
(Symbol()) + ''     // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''           // "[object Object]"
Math + ''           // "[object Math]"
[] + ''             // ""
[10, 20] + ''       // "10,20"
(function(){}) + '' // "function(){}"
Array + ''          // "function Array() { [native code] }"
```



### 2.2. 숫자 타입으로 변환

```javascript
1 - '1'    // 0
1 * '10'   // 10
1 / 'one'  // NaN
```

* 자바스크립트 엔진은 산술 연산자 표현식을 평가하기 위해 산술 연산자의 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환함



```javascript
'1' > 0   // true
```

* 비교 연산자의 역할 = 불리언 값 산출
* 자바스크립트 엔진은 비교 연산자 표현식을 평가하기 위해 비교 연산자의 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환함



* \+ 단항 연산자는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환 수행

```javascript
// 문자열 타입
+''             // 0
+'0'            // 0
+'1'            // 1
+'string'       // NaN

// 불리언 타입
+true           // 1
+false          // 0

// null 타입
+null           // 0

// undefined 타입
+undefined      // NaN

// 심볼 타입
+Symbol()       // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}             // NaN
+[]             // 0
+[10, 20]       // NaN
+(function(){}) // NaN
```



### 2.3. 불리언 타입으로 변환

```javascript
if ('') console.log(x);


// if 문이나 for 문과 같은 제어문 또는 삼항 조건 연산자의 조건식(conditional expression)은 불리언 값을 반환해야 하는 표현식임
if ('')    console.log('1');
if (true)  console.log('2');
if (0)     console.log('3');
if ('str') console.log('4');
if (null)  console.log('5');

// 2 4
```

* **자바스크립트 엔진은 불리언 타입이 아닌 값을 두가지로 분류**
  * **Truthy 값(참으로 평가되는 값)**
  * **Falsy 값(거짓으로 평가되는 값)**
* 제어문의 조건식과 같이 불리언 값으로 평가되어야 할 문맥에서  Truthy → true, Falsy → false 암묵적 타입 변환



* false로 평가되는 Falsy 값
  * false
  * undefined
  * null
  * 0, -0
  * NaN
  * "(빈문자열)
* Falsy 값 이외의 모든 값은 모두 true로 평가되는 Truthy 값임

```javascript
// 아래의 조건문은 모두 코드 블록을 실행한다.
if (!false)     console.log(false + ' is falsy value');
if (!undefined) console.log(undefined + ' is falsy value');
if (!null)      console.log(null + ' is falsy value');
if (!0)         console.log(0 + ' is falsy value');
if (!NaN)       console.log(NaN + ' is falsy value');
if (!'')        console.log('' + ' is falsy value');
```



```javascript
// Truthy/Falsy 값을 판별하는 함수

// 주어진 인자가 Falsy 값이면 true, Truthy 값이면 false를 반환한다.
function isFalsy(v) {
  return !v;
}

// 주어진 인자가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
function isTruthy(v) {
  return !!v;
}

// 모두 true를 반환한다.
console.log(isFalsy(false));
console.log(isFalsy(undefined));
console.log(isFalsy(null));
console.log(isFalsy(0));
console.log(isFalsy(NaN));
console.log(isFalsy(''));

// 모두 true를 반환한다.
console.log(isTruthy(true));
// 빈 문자열이 아닌 문자열은 Truthy 값이다.
console.log(isTruthy('0'));
console.log(isTruthy({}));
console.log(isTruthy([]));
```





## 3. 명시적 타입 변환

* 명시적으로 타입을 변경하는 방법
  * 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출
  * 자바스크립트에서 제공하는 빌트인 메소드를 사용
  * 암묵적 타입 변환을 이용



### 3.1. 문자열 타입으로 변환

문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법은 아래와 같다.

1. String 생성자 함수를 new 연산자 없이 호출하는 방법
2. Object.prototype.toString 메소드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법

```javascript
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
console.log(String(1));        // "1"
console.log(String(NaN));      // "NaN"
console.log(String(Infinity)); // "Infinity"
// 불리언 타입 => 문자열 타입
console.log(String(true));     // "true"
console.log(String(false));    // "false"

// 2. Object.prototype.toString 메소드를 사용하는 방법
// 숫자 타입 => 문자열 타입
console.log((1).toString());        // "1"
console.log((NaN).toString());      // "NaN"
console.log((Infinity).toString()); // "Infinity"
// 불리언 타입 => 문자열 타입
console.log((true).toString());     // "true"
console.log((false).toString());    // "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
console.log(1 + '');        // "1"
console.log(NaN + '');      // "NaN"
console.log(Infinity + ''); // "Infinity"
// 불리언 타입 => 문자열 타입
console.log(true + '');     // "true"
console.log(false + '');    // "false"
```



### 3.2. 숫자 타입으로 변환

숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법은 아래와 같다.

1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
3. \+ 단항 산술 연산자를 이용하는 방법
4. \* 산술 연산자를 이용하는 방법

```javascript
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
console.log(Number('0'));     // 0
console.log(Number('-1'));    // -1
console.log(Number('10.53')); // 10.53
// 불리언 타입 => 숫자 타입
console.log(Number(true));    // 1
console.log(Number(false));   // 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
console.log(parseInt('0'));       // 0
console.log(parseInt('-1'));      // -1
console.log(parseFloat('10.53')); // 10.53

// 3. + 단항 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
console.log(+'0');     // 0
console.log(+'-1');    // -1
console.log(+'10.53'); // 10.53
// 불리언 타입 => 숫자 타입
console.log(+true);    // 1
console.log(+false);   // 0

// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
console.log('0' * 1);     // 0
console.log('-1' * 1);    // -1
console.log('10.53' * 1); // 10.53
// 불리언 타입 => 숫자 타입
console.log(true * 1);    // 1
console.log(false * 1);   // 0
```



### 3.3. 불리언 타입으로 변환

불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법은 아래와 같다.

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. ! 부정 논리 연산자를 두번 사용하는 방법

```javascript
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
console.log(Boolean('x'));       // true
console.log(Boolean(''));        // false
console.log(Boolean('false'));   // true
// 숫자 타입 => 불리언 타입
console.log(Boolean(0));         // false
console.log(Boolean(1));         // true
console.log(Boolean(NaN));       // false
console.log(Boolean(Infinity));  // true
// null 타입 => 불리언 타입
console.log(Boolean(null));      // false
// undefined 타입 => 불리언 타 입
console.log(Boolean(undefined)); // false
// 객체 타입 => 불리언 타입
console.log(Boolean({}));        // true
console.log(Boolean([]));        // true

// 2. ! 부정 논리 연산자를 두번 사용하는 방법
// 문자열 타입 => 불리언 타입
console.log(!!'x');       // true
console.log(!!'');        // false
console.log(!!'false');   // true
// 숫자 타입 => 불리언 타입
console.log(!!0);         // false
console.log(!!1);         // true
console.log(!!NaN);       // false
console.log(!!Infinity);  // true
// null 타입 => 불리언 타입
console.log(!!null);      // false
// undefined 타입 => 불리언 타입
console.log(!!undefined); // false
// 객체 타입 => 불리언 타입
console.log(!!{});        // true
console.log(!![]);        // true
```





## 4. 단축 평가

* 논리합(`||`), 논리곱(`&&`) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가됨
* **단축 평가(short-circuit evaluation)** 
  * **논리 연산의 결과를 결정한 피연산자를 타입 변환하지 않고 그대로 반환하는 것**
  * 이는 표현식을 평가하는 도중에 평가 결과가 확정된 경우, 나머지 평가 과정을 중단함
  * 대부분의 프로그래밍 언어는 단축 평가를 통해 논리 연산을 수행



```javascript
// 논리곱(&&) 예제
'Cat' && 'Dog' // 'Dog'
```

* 논리곱(`&&`) 연산자는 두개의 피연산자가 모두 true로 평가될 때 true를 반환, 대부분의 연산자가 그렇듯이 논리곱 연산자도 왼쪽에서 오른쪽으로 평가함
* 첫번째 피연산자 ‘Cat’은 Truthy 값이므로 true로 평가
* 두번째 피연산자까지 평가해 보아야 위 표현식을 평가 가능
* 즉, 두번째 피연산자가 위 논리곱 연산자 표현식의 평가 결과를 결정하게 됨
* **논리곱 연산자는 논리 연산의 결과를 결정한 두번째 피연산자 즉, 문자열 ‘Dog’를 그대로 반환**



```javascript
// 논리합(||) 예제
'Cat' || 'Dog' // 'Cat'
```

* 논리합(`||`) 연산자는 두개의 피연산자 중 하나만 true로 평가되어도 true를 반환
* 논리합 연산자도 왼쪽에서 오른쪽으로 평가함
* 첫번째 피연산자 ‘Cat’은 Truthy 값이므로 true로 평가
* 두번째 피연산자까지 평가해 보지 않아도 위 표현식을 평가 가능
* **논리합 연산자는 논리 연산의 결과를 결정한 첫번째 피연산자 즉, 문자열 ‘Cat’를 그대로 반환**



* 단축 평가의 규칙

| 단축 평가 표현식    | 평가 결과 |
| :------------------ | :-------- |
| true \|\| anything  | true      |
| false \|\| anything | anything  |
| true && anything    | anything  |
| false && anything   | false     |

```javascript
// 논리합(||) 연산자
'Cat' || 'Dog'  // 'Cat'
false || 'Dog'  // 'Dog'
'Cat' || false  // 'Cat'

// 논리곱(&&) 연산자
'Cat' && 'Dog'  // Dog
false && 'Dog'  // false
'Cat' && false  // false
```



* **단축 평가** 사용시 **if 문 대체** 가능
* 조건이 Truthy 값(참으로 평가되는 값)이면, 논리곱(`&&`) 연산자 표현식으로 if문을 대체 가능

```javascript
var done = true;
var message = '';

// 주어진 조건이 true일 때
if (done) message = '완료';

// if문은 단축 평가로 대체 가능하다.
message = done && '완료';
console.log(message); // 완료
```



* 조건이 Falsy 값(거짓으로 평가되는 값)이면, 논리합(`||`) 연산자 표현식으로 if문을 대체 가능

```javascript
var done = false;
var message = '';

// 주어진 조건이 false일 때
if (!done) message = '미완료';

// if문은 단축 평가로 대체 가능하다.
message = done || '미완료';
console.log(message); // 미완료
```



* 삼항 조건 연산자는 if…else문을 대체 가능

```javascript
var done = true;
var message = '';

// if...else문
if (done) message = '완료';
else      message = '미완료';
console.log(message); // 완료

// if..else문은 삼항 조건 연산자로 대체 가능하다.
message = done ? '완료' : '미완료';
console.log(message); // 완료
```

