# Math

생성자 함수가 아니므로 정적 프로퍼티와 메소드만을 제공함



# 1. Math 프로퍼티

## 1.1. Math.PI

- PI 값(π ≈ 3.141592653589793)을 반환



# 2. Math 메소드

## 2.1. Math.abs

- 인수의 절댓값(absolute value)을 반환
- 절댓값 = 0 또는 양수 

```javascript
Math.abs('');       // -> 0
Math.abs([]);       // -> 0
Math.abs({});       // -> NaN
Math.abs();         // -> NaN
```



## 2.2 Math.round

- 인수의 소수점 이하를 반올림한 정수 반환

```javascript
Math.round(1.5;)  // 2
Math.round(1.2;)  // 1
Math.round(-2.4)  // -2
Math.round(-3.7)  // -4
Math.round(1);    // -> 1
Math.round();     // -> NaN
```



## 2.3 Math.ceil

- 인수의 소수점 이하를 올림한 정수를 반환

```javascript
Math.ceil(1.2);  // 2
Math.ceil(-2.4); // -2
Math.ceil(1);    // -> 1
Math.ceil();     // -> NaN
```



## 2.4 Math.floor

- 인수의 소수점 이하를 내림한 정수를 반환

  (Math.ceil 반대 개념)

```javascript
Math.floor(9.1);  // -> 9
Math.floor(-1.9); // -> -2
Math.floor(1);    // -> 1
Math.floor();     // -> NaN
```



## 2.5 Math.sqrt

- 인수의 제곱근을 반환

```javascript
Math.sqrt(9);  // -> 3
Math.sqrt(-9); // -> NaN
Math.sqrt(2);  // -> 1.414213562373095
Math.sqrt(1);  // -> 1
Math.sqrt(0);  // -> 0
Math.sqrt();   // -> NaN
```



## 2.6 Math.random

- 임의의 부동 소수점 반환
- 반환된 부동 소수점 = 0부터 1미만

```javascript
Math.random();

const random = Math.floor(Math.random() * 10) + 1);
console.log(random);
```



## 2.7. Math.pow

- 첫번째 인수를 밑(base), 두번째 인수를 지수(exponent)로하여 거듭제곱을 반환

```javascript
Math.pow(2, 4); // 16
Math.pow(3, 3); // 27
Math.pow(4);    // NaN
```



## 2.8 Math.max

- 인수 중 가장 큰 수 반환

```javascript
Math.max(2, 5, 8); // 8

const arr = [8, 5, 1, 3];
const number = Math.max.apply(null, arr);
console.log(number); // 8

// ES6 스프레드 문법
Math.max(...arr);
```



## 2.9 Math.min

- 인수 중 가장 작은 수 반환

```javascript
Math.max(2, 5, 8); // 2

const arr = [8, 5, 1, 3];
const number = Math.min.apply(null, arr);
console.log(number); // 2

// ES6 스프레드 문법
Math.min(...arr);
```

