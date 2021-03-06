# 원시 값과 객체의 비교

* 원시 타입과 객체 타입의 차이점
  * 원시 값은 변경 불가능한 값(immutable value), 객체는 변경 가능한 값(mutable value)한 값
  * **원시 값**을 변수에 할당하면 변수에는 **실제 값**이 저장됨
  * **객체**를 변수에 할당하면 변수에는 **참조 값**이 저장됨
  * **값에 의한 전달**(Pass by value) : 원시 값을 갖는 변수를 다른 변수에 할당하면 원본의 원시 값(값 자체)이 복사되어 전달
  * **참조에 의한 전달**(Pass by reference) : 객체를 가리키는 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달





## 1. 원시 값

### 1.1. 변경 불가능한 값

* **원시 타입(primitive type)의 값, **

  **즉 원시 값은 변경 불가능한 값(immutable value)**을 말함

* 원시 값은 읽기 전용(= read only)의 값이므로 변경할 수 없음 = 데이터의 신뢰성 보장!

  -> 원시 값 자체를 변경X - 변수 값은 변경(재할당을 통한 교체) 가능

```javascript
var str = 'string';
// 문자열은 유사 배열로서 인덱스를 사용해 각 문자에 접근 가능
// 하지만 문자열은 원시 값이므로 변경 할 수 없다.
str[0] = 'S';
console.log(str); // string
```



- 반대 개념, '상수'는 재할당이 금지된 변수



![img](https://poiemaweb.com/assets/fs-images/11-1.png)

- 변수 값의 변경을 위해 원시 값 재할당시 
  - 새로운 메모리 공간을 확보 -> 재할당한 값 저장 -> 변수가 참조하던 메모리 공간의 주소 변경 이뤄짐

- 재할당 이외에 예기치 않게 원시 값인 변수의 값이 변경된다면 상태 변경 추적이 어려움





### 1.2. 문자열과 불변성

- 문자열 : 0개 이상의 문자(character)들로 이뤄진 집합
  - 1개의 문자 : 2byte 메모리 공간에 저장됨
- 따라서 문자열은 몇 개의 문자로 이뤄졌느냐에 따라 필요한 메모리 공간의 크기가 다름
- 숫자 값은 어느 값이나 8byte의 동일한 공간이 필요함

```javascript
var str1 = '';
var str2 = 'Hello';
```



- 자바스크립트는 원시 타입(변경 불가능)인 문자열 타입을 제공

```javascript
var str = 'Hello';
str = 'world';
```

두번째 문 실행시 첫번째 문 실행시 생성된 문자열 'Hello'를 수정하는 것이 아니라 새 문자열 'world'를 메모리에 생성한다. 즉, 문자열 'Hello'와 'world' 모두 메모리에 존재한다. 식별자 str은 문자열 'Hello'를 카리키고 있다가 문자열 'world'를 가리키도록 변경된 것이다.



### 1.3. 값에 의한 전달

```javascript
var score = 50;
var copy = score;

console.log(score); // 50
console.log(copy); // 50

score = 30;

console.log(score); //30
console.log(copy); // 50
```

- score 변수에 값 30이 재할당 되기 전 변수 값 50이 할당되어 있었으므로 copy 변수에는 새로운 숫자 값 50이 생성되어 할당된다.



#### 변수에 원시 값을 갖는 변수 할당 시 

할당받는 변수(copy)에는 할당되는 변수(score)의 원시 값이 복사되어 전달된다.

-> 값에 의한 전달(Pass by value)



#### 식별자는 값이 아닌 메모리 주소를 기억

엄격하게 표현하면 변수에는 값이 전달되는 것이 아니라 메모리 주소가 전달되는 것이므로 '값에 의한 전달' 이라는 용어는 자바스크립트를 위한 용어가 아니다. (ECMAScript 사양에 등장하지 않음)

식별자가 기억하고 있는 메모리 주소를 통해 메모리 공간에 저장된 값에 접근할 수 있다. 즉, 식별자는 메모리 주소에 붙인 이름이라 할 수 있다.



결국, 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한쪽에서 재할당을 통해 값을 변경 하더라도 서로 간섭할 수 없다.





## 2. 객체

- 프로퍼티의 개수가 정해져 있지 않음

- 프로퍼티는 동적으로 추가 및 삭제할 수 있음

- 프로퍼티의 값에 제약이 없으므로 객체는 원시 값과 같이 확보해야 할 메모리 공간의 크기를 사전에 정해 둘 수 없음



### 2.1. 변경 가능한 값

객체(객체 타입의 값)는 변경 가능한 값(mutable value)이다.

```javascript
var person = {
    name: 'Kim'
};
```



원시 값을 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 원시 값에 접근할 수 있다.

즉, 원시 값을 할당한 변수는 원시 값 자체를 값으로 갖는다.



하지만 객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 참조 값(reference value)에 접근할 수 있다. 즉 변수는 해당 참조 값을 통해 객체에 접근할 수 있다.

참조 값은 생성된 객체가 저장된 메모리 공간의 주소를 말한다.

```javascript
var person = {
    name: 'Kim'
};

console.log(person); // {name: "Kim"}
```

- 객체를 할당한 변수의 경우, "변수는 객체를 참조하고 있다" / "변수는 객체를 가리키고(point) 있다"라고 표현
- *person 변수는 객체 {name: "Kim"}를 가리키고(참조하고) 있다.*



객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다.  이때 객체를 할당한 변수에 재할당을 하지 않았으므로 객체를 할당한 변수의 참조 값은 변경되지 않는다.

즉, 재할당 없이 프로퍼티를 동적으로 추가하거나 프로퍼티 값을 갱신 또는 프로퍼티 자체를 삭제할 수도 있다.

```javascript
var person = {
    name: 'Kim'
};

person.name = 'Park';

person.address = 'Seoul';

console.log(person); // {name: "Park", address: "Seoul"}
```



#### 객체의 구조적 단점에 따른 부작용

여러 개의 식별자가 하나의 객체를 공유할 수 있다는 것





### 2.2. 참조에 의한 전달

```javascript
var person = {
    name: 'Lee'
};

// 객체를 가리키는 변수를 다른 변수에 할당
// 즉, 참조 값을 복사하여 전달
var copy = person;
```



![img](https://poiemaweb.com/assets/fs-images/11-9.png)



- 원본 person을 사본 copy에 할당하였으므로 원본 person의 참조 값을 복사해서 copy에 저장한 것이므로 서로 다른 메모리 주소를 갖고 있으나 참조 값은 동일함
-  즉, 모두 동일한 객체를 가리킴-> 두 개의 식별자가 하나의 객체를 공유하는 것
- 원본 또는 사본 중 한쪽에서 객체의 프로퍼티 값을 변경하면 서로 영향을 주고 받음



"값에 의한 전달"과 "참조에 의한 전달"은 변수에 저장되어 있는 값이 원시 값이냐 참조 값이냐의 차이만 있을 뿐, 식별자가 기억하는 메모리 공간에 저장되어 있는 값을 복사해서 전달한다는 면에서 동일하다. 