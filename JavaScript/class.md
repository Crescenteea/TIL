# 클래스

* 클래스 = 새로운 객체 생성 메커니즘
* 클래스는 함수이다
* 클래스 / 생성자 함수는 프로토타입 기반의 인스턴스를 생성
* 클래스 - 엄격하며 생성자 함수에서 제공하지 않는 기능도 제공

1. new 연산자 사용해야함
2. 상속을 지원하는 extends / super 키워드 제공
3. 호이스팅이 발생하지 않는 것처럼 동작
4. 모든 코드에 암묵적으로 strict 모드가 지정되어 실행, 해지불가
5. constructor, 프로토타입 메소드, 정적 메소드 = 프로퍼티 어트리뷰트 [[Enumerable]] 값 = false (열거되지 않음)





## 클래스 정의

* class 키워드 사용
* 파스칼 케이스 사용(일반적)
* 표현식으로 클래스 정의 가능 = 값으로 사용할 수 있는 일급 객체라는 것을 의미
* 이름을 가질 수도, 갖지 않을 수도 있음

* **클래스** 몸체 - **0개 이상의 메소드**만 정의
  * **constructor(생성자)**
  * **프로토타입 메소드**
  * **정적 메소드**



#### 클래스 : 일급 객체로서의 특징

* 무명의 리터럴로 생성 O = 런타임에 생성 가능
* 변수, 자료구조에 저장 O
* 함수의 매개 변수에 전달 O
* 함수의 반환값으로 사용 O



![img](https://poiemaweb.com/assets/fs-images/25-1.png)





## 클래스 호이스팅

* 클래스 정의 이전에 참조 불가
* let, const 키워드로 선언한 변수처럼 호이스팅됨
* 클래스 선언문 = 일시적 사각지대에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작 





## 인스턴스 생성

* 클래스 = 함수로 평가
* new 연산자와 함께 호출, 인스턴스 생성
* new 연산자 없을 시 - TypeError

```javascript
class Person {}
console.log(typeof Person); // function

class Person {}
const me = new Person();
console.log(me); // Person {}

class Person {}
const me = Person();
// TypeError: Class constructor Foo cannot be invoked without 'new'
```



* 표현식으로 정의된 클래스 : 기명 클래스 표현식의 클래스이름을 사용해 인스턴스 생성시 에러 발생

* 기명 함수 표현식과 마찬가지, 

  클래스 표현식에서 사용한 클래스 이름은 외부 코드에서 접근 불가능

```javascript
const Person = class MyClass {};

const me = new Person();

console.log(MyClass); 
// ReferenceError: MyClass is not defined

const you = new MyClass();
// ReferenceError: MyClass is not defined
```





## 메소드

- 클래스 몸체, 0개 이상의 메소드 만을 선언 가능
- 클래스 몸체에서 정의할 수 있는 메소드 
  - constructor(생성자)
  - 프로토타입 메소드
  - 정적 메소드



#### constructor

- 인스턴스를 생성 및 초기화하기 위한 특수한 메소드
- constructor 이름 변경 불가

```javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}
// 클래스는 함수이다.
console.log(typeof Person); // function
console.dir(Person);
```

실행 결과

![img](https://poiemaweb.com/assets/fs-images/25-2.png)



- 클래스는 평가되어 객체가 됨

- 클래스 = 함수 객체 고유의 프로퍼티 소유

- 프로토타입과 연결되어 있음(함수처럼)

- 자신의 스코프체인을 구성함

- 모든 함수 객체가 가지는 prototype 프로퍼티가 가리키는 

  프로토타입 객체의 constructor 프로퍼티-> 클래스 자신

  ▶ 클래스 : 인스턴스를 생성하는 생성자 함수라는 의미 = new 연산자와 함께 클래스 호출 시, 클래스는 인스턴스를 생성함



```javascript
// 인스턴스 생성
const me = new Person('Lee');
console.log(me);
```

![img](https://poiemaweb.com/assets/fs-images/25-3.png)



* constructor 내부의 this : 클래스가 생선한 인스턴스

```javascript
// 클래스
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}

// 생성자 함수
function Person(name) {
  // 인스턴스 생성 및 초기화
  this.name = name;
}
```



> 클래스의 constructor 메소드와 Person.prototype.constructor
>
> 이름이 같아 혼동할 수 있으나 클래스 몸체에 정의한 constructor와 Person.prototype.constructor는 직접적인 관련이 없다. 프로토타입의 constructor 프로퍼티는 모든 프로토타입이 가지고 있는 프로퍼티이며 생성자 함수를 가리킨다.



* constructor
  * 메소드로 해석 X
  * 클래스가 평가되어 생성한 함수 객체 코드의 일부
* 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성됨



▼ constructor 클래스 내 최대 한 개만 존재할 수 있다.

```javascript
class Person {
  constructor() {}
  constructor() {}
}
// SyntaxError: A class may only have one constructor
// 2개 이상의 constructor 포함시 문법 에러 발생
```



▼ constructor 생략 가능

```javascript
class Person {}
```



▼ constructor를 생략하면 클래스에 아래와 같이 디폴트 constructor가 암묵적으로 정의됨

```javascript
class Person {
  // constructor를 생략하면 아래와 같이 디폴트 constructor가 암묵적으로 정의된다.
  constructor() {}
}

// 빈 객체가 생성된다.
const me = new Person();
console.log(me); // Person {}
```



▼ constructor를 생략한 클래스는 디폴트 constructor에 의해 빈 객체를 생성함

​		프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가함

```javascript
class Person {
  constructor() {
    // 고정값으로 인스턴스 초기화
    this.name = 'Lee';
    this.address = 'Seoul';
  }
}

// 인스턴스 프로퍼티가 추가된다.
const me = new Person();
console.log(me); // Person {name: "Lee", address: "Seoul"}
```

