# 실행 컨텍스트

## 1. 소스 코드의 타입

| 소스 코드의 타입         | 설명                                                         |
| :----------------------- | :----------------------------------------------------------- |
| 전역 코드(global code)   | 전역에 존재하는 소스 코드를 말한다. 전역에 정의된 함수, 클래스 등의 내부 코드는 포함되지 않는다. |
| 함수 코드(function code) | 함수 내부에 존재하는 소스 코드를 말한다. 함수 내부에 중첩된 함수, 클래스 등의 내부 코드는 포함되지 않는다. |
| eval 코드(eval code)     | 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스 코드를 말한다. |
| 모듈 코드(module code)   | 모듈 내부에 존재하는 소스 코드를 말한다. 모듈 내부의 함수, 클래스 등의 내부 코드는 포함되지 않는다. |

실행 컨텍스트도 프로퍼티다 JS의 관점에서





1. 전역 코드 : 전역 변수 / 전역 함수는 전역 스코프에 등록되어 관리돼야 함

   전역 스코프 = 실체가 존재. 

   실체가 있어야 등록이 될 수 있음

   "키"로 "값"을 관리해야 함.

   전역 스코프 = 전역 실행 컨텍스트 - 렉시컬 환경의 선언적 환 레

   

## 2. 소스 코드의 평가와 실행

소스 코드는 평가 과정을 거친 후 실행됨

* 소스 코드의 **평가**

  * 실행 컨텍스트 생성

  * 변수, 함수 등 **선언문 만을 먼저 실행** 후

    생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프에 등록

* 소스 코드의 **실행**

  * 런타임에 선언문을 제외한 소스 코드가 순차적으로 실행됨
  * 실행 컨텍스트가 관리하는 스코프에서 변수나 함수의 참조 가능
  * 변수 값의 변경과 같은 소스 코드의 실행 결과는 실행 컨텍스트가 관리하는 스코프에 등록됨





## 3. 실행 컨텍스트의 역할

전역 코드와 함수 코드의 평가 



① 전역 코드 평가

전역 코드 실행 전, 변수/함수 선언문이 먼저 실행됨

이후 생성된  

②



③



④







## 4. 실행 컨텍스트 스택

* = 콜 스택

* 코드의 실행 순서를 관리함

* 실행컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트

  = 현재 실행 중인 코드의 실행 컨텍스트

```javascript
const x = 1;

function foo () {
  const y = 2;

  function bar () {
    const z = 3;
    console.log(x + y + z);
  }
  bar();
}

foo(); // 6
```









## 5. 렉시컬 환경

* 식별자와 식별자에 바인딩된 값과 상위 스코프에 대한 참조를 기록하는 환경
* 렉시컬 환경은 스코프와 식별자를 관리함

![img](https://poiemaweb.com/assets/fs-images/23-6.png)

* 객체 형태의 스코프(전역, 함수, 블록 스코프)를 생성하고

  식별자를 키로 등록하고 식별자에 바인딩된 값을 관리함

* 즉, **스코프를 구분하여 식별자를 등록 및 관리하는 저장소 역할**을 함





![img](https://poiemaweb.com/assets/fs-images/23-7.png)

▲생성 초기의 실행 컨텍스트와 렉시컬 환경



* 실행 컨텍스트의 구성
  * LexicalEnvironment 컴포넌트
  * VariableEnvironment 컴포넌트

생성 초기 - L.E.와 V.E.는 동일한 렉시컬 환경을 참조함

이후, 특정 상황을 만나게 되면 V.E. 컴포넌트를 위한 새로운 렉시컬 환경을 생성 -> V.E. 컴포넌트와 L.E. 컴포넌트는 내용이 달라지기도 함



![img](https://poiemaweb.com/assets/fs-images/23-8.png)

* 렉시컬 환경의 구성 컴포넌트

1.  환경 레코드

   스코프에 포함된 식별자를 등록 & 등록된 식별자에 바인딩된 값을 관리하는 저장소

   

2.  외부 렉시컬 환경에 대한 참조

   이는 상위 스코프를 말함.

   상위 스코프란 외부 렉시컬 환경, 즉 해당 실행 컨텍스트를 생성한 소스 코드를 포함하는 상위 코드의 렉시컬 환경을 말함.

   외부 렉시컬 환경에 대한 참조를 통해 단방향 링크드 리스트린 스코프 체인을 구현함.





## 6. 실행 컨텍스트의 생성과 식별자 검색 과정

```javascript
var x = 1;
const y = 2;

function foo (a) {
  var x = 3;
  const y = 4;

  function bar (b) {
    const z = 5;
    console.log(a + b + x + y + z);
}
  bar(10);
}

foo(20); // 42
```



### 6.1. 전역 객체 생성

* 코드 평가되기 이전에 생성
* 전역 객체에 빌트인 전역 프로퍼티, 빌트인 전역 함수, 표준 필트인 객체 추가
* 동작 환경에 따라 호스트 객체 포함함
* 전역 객체 - Object.prototype 상속 O

```javascript
window.toString(); // "[object Window]"
window.__proto__.__proto__.__proto__ === Object.prototype; // true
```





### 6.2. 전역 코드 평가

1. 전역 실행 컨텍스트 생성

2. 전역 렉시컬 환경 생성

   2.1. 전역 환경 레코드 생성

   ​	2.1.1. 객체 환경 레코드 생성

   ​	2.1.2. 선언적 환경 레코드 생성

   2.2. 외부 렉시컬 환경에 대한 참조 할당

   2.3. this 바인딩

   

### 6.3. 전역 코드 실행

### 6.4. foo 함수 코드 평가

### 6.5. foo 함수 코드 실행

### 6.6. bar 함수 코드 평가

### 6.7. bar 함수 코드 실행

### 6.8. bar 함수 코드 실행 종료

### 6.9. foo 함수 코드 실행 종료

### 6.10. 전역 코드 실행 종료



# 7. 실행 컨텍스트와 블록 레벨 스코프











```javascript
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>

  <script>
    const $counter = document.querySelector('.counter');

    // 버튼이 클릭되면 자유 변수 num을 1 증가 시킨다.
    const increase = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      return function () {
        $counter.textContent = ++num; // 상태 변경
      };
    }());

    document.querySelector('.increase').onclick = increase;
  </script>
</body>
</html>
```

전역 변수 하나 만듬 

누구든지 고칠수 있어 암묵적 결합

 전역 변수 안쓰면서 변경하고 싶다

지역으로 옯겨야 돼

호출될때마다 재선언 - 문제야

클로저 써야할 타이밍



공식

1. 즉시실행함수 만든다

2. 즈실함 안에 유지고픈 별수 선언 ㄷㅌ넘

3. 즉실함안에 상태변경 함수 만들고

   걔를 리턴해서 받아줘라

4. 그리고 외부에서 호출하라









```javascript
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>
  <button class="decrease">-</button>

  <script>
    const $counter = document.querySelector('.counter');

    const counter = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      // 클로저를 메소드로 갖는 객체를 반환한다.
      // 객체 리터럴은 스코프를 만들지 않는다.
      // 따라서 아래 메소드 들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
      return {
        // num: 0, // 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
        increase() {
          $counter.textContent = ++num; // 상태 변경
        },
        decrease() {
          if (num <= 0) return;
          $counter.textContent = --num; // 상태 변경
        }
      };
    }());

    document.querySelector('.increase').onclick = counter.increase;
    document.querySelector('.decrease').onclick = counter.decrease;
  </script>
</body>
</html>
```







객체에 담아서리턴

메소드 두개를 갖고 있는 객체를 리턴



객체가 만들어지면 평가됨, 그 때 실행되고 있는 실행컨은 즉실행의 실행컨텍스트이다. 