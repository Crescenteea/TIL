# Number

# 1. Number 생성자 함수

- 표준 빌트인 객체이며 생성자 함수 객체임

  new 연산자와 함께 호출해 Number 인스턴스 생성 가능

- Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 호출시

  [[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼 객체 생성

- Number 생성자 함수에 숫자를 인수로 전달하면 [[Number]] 내부 슬롯에 인수로 전달받은 숫자를 할당한 Number 래퍼 객체를 생성

- 숫자로 변환이 어려운 인수를 전달 받았을 경우 

  NaN을 [[NumberData]] 내부 슬롯에 할당한 Number 래퍼 객체 생성

```javascript
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]: 0}

const numObj = new Number(10);
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

let numObj = new Number('10');
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

numObj = new Number('Hello');
console.log(numObj); // Number {[[PrimitiveValue]]: NaN}
```



- 연산자 없이 Number 생성자 함수 호출 시 Number 인스턴스가 아닌 숫자 반환

```javascript
// 문자열 타입 => 숫자 타입
Number('0');     // -> 0
Number('-1');    // -> -1

// 불리언 타입 => 숫자 타입
Number(true);    // -> 1
Number(false);   // -> 0
```





# 2. Number 프로퍼티

## 2.1. Number.EPSILON

- ES6,  1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이
- Number.EPSILON = 약 2.2204460492503130808472633361816 x 10-16 

```javascript
function isEqual(a, b){
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.3 + 0.2, 0.5));
```



## 2.2. Number.MAX_VALUE

- 가장 큰 양수 값(1.7976931348623157 x 10308)
- Number.MAX_VALUE 보다 큰 수 = Infinity

```javascript
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Infinity > Number.MAX_VALUE); // true
```



## 2.3. Number.MAX_SAFE_INTEGER

- 안전하게 표현할 수 있는 가장 큰 정수 값(9007199254740991)

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```



## 2.4. Number.MIN_VALUE

- 가장 작은 양수 값(5 x 10-324)
- Number.MIN_VALUE보다 작은 숫자 = 0

```javascript
console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.MIN_VALUE > 0); // true
```



## 2.5. Number.MIN_SAFE_INTEGER

- 안전하게 표현할 수 있는 가장 작은 정수 값( -9007199254740991)

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```



##  2.6. Number.POSITIVE_INFINITY

- 양의 무한대를 나타내는 숫자값 Infinity와 동일함

```javascript
console.log(Number.POSITIVE_INFINITY); // Infinity
```



##  2.7. Number.NEGATIVE_INFINITY

- 음의 무한대를 나타내는 숫자값 -Infinity와 동일함

```javascript
console.log(Number.NEGATIVE_INFINITY); // -Infinity
```



## 2.8. Number.NaN

- 숫자가 아님(Not-a-Number)을 나타내는 숫자값
- Number.NaN = window.NaN

```javascript
console.log(Number.NaN); // NaN
```





# 3. Number 메소드

## 3.1. Number.isFinite

- ES6,  인수로 전달된 숫자값이 정상적인 유한수인지 검사하여

  그 결과를 불리언 값으로 반환

```javascript
// 인수가 유한수이면 true를 반환한다.
Number.isFinite(0);                // -> true
Number.isFinite(Number.MAX_VALUE); // -> true
Number.isFinite(Number.MIN_VALUE); // -> true

// 인수가 무한수이면 false를 반환한다.
Number.isFinite(Infinity);  // -> false
Number.isFinite(-Infinity); // -> false
```

- 함수 isFinite -> 전달받은 인수를 숫자로 암묵적 타입 변환하여 검사를 수행함
- Number.isFinite -> 전달받은 인수를 숫자로 암묵적 타입 변환하지 않음 
  - **숫자가 아닌 인수 값**이 전달되었을 때 = **false**

```javascript
// Number.isFinite는 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isFinite(NaN); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다.
isFinite(null); // -> true (null => 0)
```



## 3.2. Number.isInteger

- ES6, 인수로 전달된 값이 정수인지 검사 후 불리언 값으로 반환
- 검사전 인수의 암묵적 타입 변환 X

```javascript
t
t
f Number.isInteger(-123)  // -> true // -값이어도 정수임
f
t Number.isInteger('123') // -> false // 타입변환 하지 않음
false // 숫자로 타입변환 하지 않으니까 false = false
t Number.isInteger(Infinity) // -> false
f // infinity, -infinity는 정수가 아니다!
```



## 3.3. Number.isNaN

- ES6, 인수로 전달된 값이 NaN인지 검사 후 불리언 값 반환

- 검사전 인수의 암묵적 타입 변환 X

  - 인수가 숫자가 아닌 값 -> false

  ```javascript
  // 인수가 NaN이면 True
  Number.isNaN(NaN); // true
  
  // Number.isNaN은 인수를 숫자로 암묵적 타입 변환하지 않는다.
  Number.isNaN(undefined); // -> false
  ```



## 3.4. Number.isSafeInteger

- 인수로 전달된 값이 안전한 정수값인지 검사, 불리언 결과값 반환
- 안전한 정수값은 -(253 - 1)와 253 - 1 사이의 정수값임
- 검사전 인수의 암묵적 타입 변환 X



##  3.5. Number.prototype.toExponential

- 전달받은 인수를 지수 표기법으로 변환하여 문자열로 반환
  - 지수 표기법 : e(Exponent) 앞에 있는 숫자에 10의 n승을 곱하는 형식으로 수를 나타냄

```javascript
----
```



## 3.6. Number.prototype.toFixed

- 대상 숫자를 반올림하여 문자열로 반환
- 인수 = 반올림하는 소숫점 이하 자릿수를 나타내는 0~20 사이의 정수값

```javascript
// 소숫점 이하 반올림. 인수를 전달하지 않으면 기본값 0이 전달된다.
(12345.6789).toFixed(); // -> "12346"
// 소숫점 이하 1자리수 유효, 나머지 반올림
(12345.6789).toFixed(1); // -> "12345.7"
// 소숫점 이하 2자리수 유효, 나머지 반올림
(12345.6789).toFixed(2); // -> "12345.68"
// 소숫점 이하 3자리수 유효, 나머지 반올림
(12345.6789).toFixed(3); // -> "12345.679"
```



## 3.7. Number.prototype.toPrecision

- 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환

```javascript
// 전체 자리수 유효. 인수를 전달하지 않으면 기본값 0이 전달된다.
(12345.6789).toPrecision(); // -> "12345.6789"
// 전체 1자리수 유효, 나머지 반올림
(12345.6789).toPrecision(1); // -> "1e+4"
// 전체 2자리수 유효, 나머지 반올림
(12345.6789).toPrecision(2); // -> "1.2e+4"
// 전체 6자리수 유효, 나머지 반올림
(12345.6789).toPrecision(6); // -> "12345.7"
```



## 3.8. Number.prototype.toString

- 숫자를 문자열로 변환하여 반환
- 인수 =  2~36 사이의 정수값(진법을 나타냄)
- 인수는 옵션임

```javascript
// 인수를 생략하면 10진수 문자열을 반환한다.
(10).toString(); // -> "10"
// 2진수 문자열을 반환한다.
(16).toString(2); // -> "10000"
// 8진수 문자열을 반환한다.
(16).toString(8); // -> "20"
// 16진수 문자열을 반환한다.
(16).toString(16); // -> "10"
```