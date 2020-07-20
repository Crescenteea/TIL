# this

## 1. this 키워드

#### this란?

자신이 속한 객체 또는 생성할 인스턴스를 가리키는 자기 참조 변수

- 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조
- 자바스크립트 엔진에 의해 암묵적으로 생성
- 코드 어디서든 참조 가능
- 함수 호출시
  - arguments 객체와 this가 암묵적으로 함수 내부에 전달됨
  - 함수 내부에서 this도 arguments 객체와 마찬가지로 지역 변수처럼 사용 가능

#### this가 가리키는 값(this 바인딩)은 함수 호출 방식에 의해 동적으로 결정된다.



## 2. 함수 호출 방식과 this 바인딩

### 1. 일반 함수 호출 

- this = 전역 객체

- 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함)



### 2. 메서드 호출

- this = 메서드를 호출한 객체

  메서드 호출시 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체가 바인딩 됨

  **메서드 내부의 this**는 메서드를 소유한 객체가 아닌 **메서드를 호출한 객체**에 바인딩됨



### 3. 생성자 함수 호출

- this = 생성자 함수가 미래에 생성할 인스턴스

  생성자 함수는 객체를 생성하므로 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작함

  

### 4. Function.prototype.apply / call / bind 메서드에 의한 간접 호출

Function.prototype의 메서드로 모든 함수가 상속받아 사용 가능



![img](https://poiemaweb.com/assets/fs-images/22-4.png)





### apply와 call 메서드

this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출함

```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```



### bind 메서드

Function.prototype.bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않고 this로 사용할 객체만 전달함

```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 함수에 this로 사용할 객체를 전달한다.
// bind 메서드는 함수를 호출하지는 않는다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

- bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용함