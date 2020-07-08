# 전역 변수의 문제점

## 1. 변수의 생명 주기

### 1.1. 지역 변수의 생명 주기

* 변수
  * 선언에 의해 생성
  * 할당을 통해 값을 갖음
  * 소멸
  * 만약 생성되고 소멸하는 생명주기가 없다면? 
    * 한번 선언된 변수는 프로그램을 종료하지 않는 한 영원히 메모리 공간을 점유함



* 함수 내부에서 선언된 지역 변수는 함수가 호출되면 생성되고 함수가 종료하면 소멸함



```javascript
function foo() {
  var x = 'local';
  console.log(x); // local
  return x;
}

foo();
console.log(x); // ReferenceError: x is not defined
```

* 함수 내부에서 선언한 변수 -> **함수가 호출된 직후**에 함수 몸체의 다른 코드가 실행되기 이전에 **자바스크립트 엔진에 의해 먼저 실행**됨
* 함수 내부에서 선언된 지역 변수 x는 foo 함수가 호출되어 실행되는 동안에만 유효 = **지역 변수의 생명 주기는 함수의 생명 주기와 일치**



![img](https://poiemaweb.com/assets/fs-images/14-1.png)

* 지역 변수가 함수보다 오래 생존하는 경우도 있음
* **변수의 생명 주기 = 메모리 공간이 확보(allocate)된 시점부터 메모리 공간이 해제(release)되어 가용 메모리 풀(memory pool)에 반환되는 시점**



### 1.2. 전역 변수의 생명 주기

* 전역 코드는 명시적인 호출없이 실행됨
* 전역 코드는 이를 실행하는 특별한 진입점(entry point)이 없고 코드가 로드되자마자 곧바로 해석되고 실행됨

> 진입점(entry point)
>
> C나 Java으로 작성된 코드를 실행하면 가장 먼저 main 함수가 호출된다. 이 main 함수는 프로그램이 시작되는 지점이므로 이를 진입점 또는 시작점이라고 한다.

* 함수는 함수 몸체의 마지막 문 또는 반환문이 실행되면 종료

  하지만 전역 코드에는 반환문을 사용할 수 없으므로 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료

* var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 됨

  즉, 전역 변수의 생명 주기가 전역 객체의 생명 주기와 일치



> 전역 객체
>
> **전역 객체(global object)**는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체다.
>
> 전역 객체는 클라이언트 사이드 환경(브라우저) - **window 객체**
>
> 서버 사이드 환경(Node.js) - **global 객체**
>
> 전역 객체에는 표준 빌트인 객체(Object, String, Number, Function, Array…)와 환경에 따른 호스트 객체(클라이언트 web API 또는 Node.js의 호스트 API), 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.



브라우저 환경에서 전역 객체는 window이므로 브라우저 환경에서 var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다. 전역 객체 window는 웹페이지를 종료하기 전까지 유효하므로 브라우저 환경에서 var 키워드로 선언한 전역 변수도 웹페이지를 종료할 때까지 유효하다. 즉, var 키워드로 선언한 전역 변수의 생명주기와 전역 객체의 생명주기는 일치한다.

![img](https://poiemaweb.com/assets/fs-images/14-2.png)







## 2. 전역 변수의 문제점

#### 암묵적 결합

전역에 선언한 전역 변수는 암묵적 결합이 허용된다. 즉, 모든 코드가 전역 변수를 참조하고 변경할 수 있다. 변수의 유효 범위가 클수록 코드의 가독성은 나빠지고 의도치 않게 상태가 변경될 수 있는 위험성도 높아진다.



#### 긴 생명 주기

**전역 변수는 생명 주기가 길고 메모리 리소스도 오랜 기간 소비한다.** 

전역 변수의 상태를 변경할 수 있는 시간도 길고, 모든 함수가 참조할 수 있기 때문에 상태를 변결할 기회도 많다.

**반면에 지역 변수는 전역 변수보다 생명 주기가 훨씬 짧다.** 

지역 변수의 상태를 변경할 수 있는 시간도 짧고 기회도 적다. 이는 전역 변수보다 상태 변경에 의한 오류가 발생할 확률이 작다는 것을 의미한다. 또한 메모리 리소스도 짧은 기간만 소비한다.



#### 스코프 체인 상에서 종점에 존재

전역 변수는 스코프 체인 상에서 종점에 존재하며 변수 검색시 가장 마지막에 검색된다.

즉, 전역 변수의 검색 속도가 가장 느리다. 검색 속도의 차이는 그다지 크지 않지만 속도의 차이는 분명히 있다.



#### 네임스페이스 오염

자바스크립트에서는 분리되어 있는 파일일지라도 하나의 전역 스코프를 공유한다. 따라서 다른 파일 내에서 동일한 이름으로 명명된 변수나 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과를 가져올 수 있다.





## 3. 전역 변수 사용 문제점

변수의 스코프는 좁을수록 좋으므로 전역 변수를 반드시 사용해야 할 이유를 찾지 못한다면 지역 변수를 사용하자.



**전역 변수의 사용을 억제할 수 있는 방법**

① 즉시 실행 함수

② 네임 스페이스 객체

③ 모듈 패턴

④ ES6 모듈



### 3.1. 즉시 실행 함수







### 3.1. 즉시 실행 함수

### 3.1. 즉시 실행 함수

### 3.2. 네임 스페이스 객체

### 3.3. 모듈 패턴

### 3.4. ES6 모듈