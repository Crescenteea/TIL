# 4. 변수

### 변수(variable)란 무엇인가?

메모리에 저장되어 있는 해당 값에 접근 가능하도록 주소를 만들어 준 것

즉, 메모리 공간을 식별(기억)하기 위한 이름

### 왜 이름으로 기억할까?

각 사용자의 브라우저에서 어느 메모리에 할당될 지 알 수 없으므로 이름을 지정하는 것 (pointing)



### 식별자(identifier)

* 변수 이름 = 어떤 값을 구별하여 식별해낼 수 있는 고유한 이름 = 메모리 주소에 붙인 이름

* 값X - 메모리 주소를 기억
  * 즉, 식별자가 기억하고 있는 메모리 주소를 통해 메모리 공간에 저장된 값에 접근할 수 있음



### 선언(statement)

자바스크립트 엔진에 식별자의 존재를 알리는 것. 즉, 변수를 생성하는 것

값의 저장을 위한 메모리 확보, 변수 이름과 확보된 메모리 공간의 주소를 연결, 값을 저장할 수 있도록하는 준비. 

(확보된 메모리 공간은 해제(release) 되기 이전까지는 보호됨)



* 변수 선언의 단계
  * 선언 단계(Declaration phase)

    * 변수 이름을 등록하여 자바스크립트 엔진에 변수의 존재를 알림

  * 초기화 단계(Initialization phase)

    * 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined 할당



* 초기화(Initialization)

  * 변수가 선언된 이후 최초로 값을 할당하는 것

  * var 키워드 변수는 암묵적인 초기화가 자동 수행됨

  * 선언 이후 어떠한 값을 할당하지 않아도 자동적으로 undefined라는 값을 갖음



* 변수 포함 모든 식별자, 선언 必
* 선언하지 않은 식별자 접근 시, ReferenceError(참조에러)발생



### 변수 선언의 실행 시점과 변수 호이스팅

자바스크립트는 런타임 이전 코드의 평가 과정을 수행하기 때문에 변수 선언문보다 변수를 참조하는 코드가 앞에 있더라도 참조 에러가 발생하지 않고 undefined가 출력됨

**왜?** 변수 선언이 런타임(소스 코드가 순차적으로 실행되는 시점) 이전 단계에서 먼저 실행되기 때문임



이처럼 변수 선언보다 변수를 참조하는 코드가 앞에 있음에도 레퍼런스 에러가 나지 않고 undefined가 출력 되는 것. 



따라서

#### 호이스팅(hoisting)이란

*변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징*



* 모든 선언문은 런타임 이전 단계에서 선행됨

  * var, let, const, function, function*, class 키워드로 선언된 모든 식별자

    (변수, 함수, 클래스 등)

    

(코드의 평가 과정 : 코드 실행을 위한 준비 단계, 자바스크립트 엔진은 변수 선언을 포함한 모든 선언문(변수 선언문, 함수 선언문 등)을 소스 코드에서 찾아내어 선행)



### 값의 할당

* 할당 (assignment 대입, 저장)
* 표현식 = 값 (동치)
* 변수에 값 뿐만 아니라 값이 될 수 있는 모든 것(ex.표현식) 할당 가능
  * `x = 11 + 22;` (여기서 '='은 할당되어 진다는 표현) 
  * `11 + 22` 가 먼저 실행된 후 -> `x = 11 + 22` 실행(논리상)
  * `x` ->  키워드
  * 
* `var x = 1;` 사람을 위한 표현이라면,

컴퓨터는 이렇게 인식함

* `var x;` 변수 선언

  `x = 1;` 변수 값의 할당



### 값의 재할당

* 기존 값이 할당되어 있는 변수에 새로운 값을 또 다시 할당하는 것
* var 키워드로 선언한 변수 - 값의 재할당 가능
* 현재 저장하고 있는 값을 버리고 새로운 값을 저장하는 것
* 초기화, undefined이 부여되는 것 역시 재할당임
* 변수의 값을 변경할 수 없다면 '상수'(constant)라 칭함
* 더 이상 필요하지 않게된 값은 가비지 컬렉터에 의해 메모리에서 자동 해제(실행 시점은 불명확)

```javascript
var score = 70;
score = 80;
```



### 값의 교환

```javascript
var x = 1;
var y = 2;
x = 2;
y = 1;

console.log(x, y);
```



### 식별자 네이밍 규칙

* 변수 이름 또한 식별자. 따라서 네이밍 규칙 따라야 함 
* 쉼표로 구분 가능, 하나의 문 내 여러 변수 선언 가능하나 비권장
* 네이밍 규칙
  *  포함 가능 : 문자, 숫자, underscore(_), 달러 기호($) 
  * 포함 불가능 : 특수문자
  * 불허용 : 숫자로 시작
  * 사용 불가능 : 예약어
* 대·소문자 구분
* 변수 이름은 의미를 명확히 할 것(가독성)
* 별도 주석을 요하는 변수명 = 목적 불분명
* 네이밍 컨벤션

  * **카멜 케이스(camelCase)** : 변수나 함수의 이름(일반적)
  * **파스칼 케이스(PascalCase)** : 생성자 함수, 클래스 이름
    * ECMAScript 사양의 표준 빌트인 객체, 전역 함수들이 사용

  * 스네이크 케이스(snake_case)
  * 헝가리언 케이스(typeHungarianCase)



#### 키워드와 예약어

* **키워드(keyword)**

```javascript
- break - case - catch - continue - debugger* - default - delete - do - else - finally - for - function - if - in - instanceof - new - return - switch - this - throw - try - typeof - var - void - while - with
```



* **예약어(reserved word)**

  미래에 키워드로 쓸 가능성이 있어서 예약해 둔 것 

  ```javascript
  await - abstract - boolean - byte - char - class - const - debugger - double - enum - export - extends - final - float - goto - implements - import - int - interface - long - native - package - private - protected - public - short - static - super - synchronized - throws - transient - volatile
  ```



* **5판**, 예약어 규칙의 변동으로 인해 모드에 따른 예약어 상이

  * **일반모드**

  ```javascript
  - class - const - enum - export - extends - import - super
  ```

  

  * **스트릭트 모드**

  ```javascript
  - implements - interface - let - package - private - protected - public - static - yield
  ```

  