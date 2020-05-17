# 배열

## 1. 배열이란?

여러 개의 값을 순차적으로 나열한 자료 구조

### 요소

배열이 가지고 있는 값

* 모든 값은 배열의 요소가 될 수 있음
  * 원시값, 객체, 함수, 배열 등



### 인덱스

배열에서 자신의 위치를 나타내는 0 이상의 정수를 말하며 인덱스를 통해 요소에 접근 가능하며 대부분의 프로그래밍 언어에서 인덱스는 0부터 시작함

▼ 요소에 접근시 대괄호 표기법 사용

```javascript
arr[0] // -> 'apple'
arr[1] // -> 'banana'
arr[2] // -> 'orange'
```



* length 프로퍼티
  * 배열은 반복문을 통해 순차적으로 값에 접근하기 적합
* 배열이라는 타입은 없으며 배열은 객체임
* 배열 리터럴 또는 Array 생성자 함수로 생성 가능

- 프로토타입 객체 : Array.prototype
  - 배열을 위한 빌트인 메소드 제공



▼ 객체와 배열의 비교

| 구분                |           객체            |     배열      |
| :------------------ | :-----------------------: | :-----------: |
| 구조                | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
| 값의 참조           |        프로퍼티 키        |    인덱스     |
| **값의 순서**       |           **x**           |     **○**     |
| **length 프로퍼티** |           **x**           |     **○**     |







## 2. 자바스크립트 배열

* 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 됨
* 비연속적으로 이어짐
  * 희소 배열(sparse array)
* **일반적인 배열의 동작을 흉내낸 특수한 객체**

- 해시 테이블로 구현된 객체
  -  인덱스로 배열 요소에 접근시 일반적인 배열보다 성능적인 면에서 느림
  - 특정 요소를 탐색 / 삽입 / 삭제하는 경우, 일반적인 배열보다 빠른 성능 기대 가능

- 단점 보완을 위해 모던 자바스크립트 엔진은 배열을 일반 객체와 구별하여 보다 배열처럼 동작하도록 최적화하여 구현함







## 3. length 프로퍼티와 희소 배열

- length 프로퍼티의 값 : 요소의 개수(배열의 길이를 나타내는 정수)

```javascript
[].length // 0
[1, 2, 3].length // 3
```

- length 프로퍼티의 값은 배열에 요소를 추가 / 삭제시 자동 갱신됨

```javascript
const arr = [1, 2, 3];

console.log(arr.length); // 3

// length 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.
// 요소 추가
arr.push(4);
console.log(arr.length); // 4

// 요소 삭제
arr.pop();
console.log(arr.length); // 3
```

- length 프로퍼티의 값은 임의의 숫자 값을 명시적으로 할당 가능

```javascript
const arr = [1, 2, 3, 4, 5];

// length 프로퍼티에 현재 length 프로퍼티 값보다 작은 숫자 값을 할당
arr.length = 3;

// 배열의 길이가 줄어든다.
console.log(arr); // [1, 2, 3]
```

- 주의) 현재 length 프로퍼티 값보다 큰 숫자 값을 할당하는 경우

  length 프로퍼티 값은 변경되나 배열의 길이가 늘어나진 않음

  값이 없이 비어있는 요소를 위해 메모리 공간을 확보하거나 빈 요소를 생성하지 않음

```javascript
const arr = [1];

// length 프로퍼티에 현재 length 프로퍼티 값보다 큰 숫자 값을 할당
arr.length = 3;

// length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
console.log(arr.length); // 3
console.log(arr); // [1, empty × 2]
```



▼ 희소 배열

```javascript
// 희소 배열
const sparse = [, 2, , 4];

// 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]

// 배열 arr에는 인덱스가 0, 2인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(sparse));
/*
{
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '3': { value: 4, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false, configurable: false }
}
*/
```

- 자바스크립트는 희소 배열을 문법적으로 허용함
- length와 배열 요소의 개수가 불일치
- 희소 배열의 length > 배열의 실제 요소 개수
- 사용 비추천
- 배열 생성시 희소 배열 생성에 주의할 것
- 배열, 같은 타입의 요소를 연속적으로 위치시키는 것이 좋음







## 4. 배열 생성

### 4.1. 배열 리터럴

- 일반적인 배열 생성 방식
- 0개 이상의 요소를 쉼표로 구분, 대괄호([])로 묶음
  - **배열 리터럴** : 프로퍼티 이름X, **프로퍼티 값만 존재**
- 배열 리터럴에 요소를 하나도 추가하지 않을 경우, 빈 배열(lenght 프로퍼티 값=0)이 됨
- 배열 리터럴에 요소 생략시 희소 배열 생성됨

```javascript
// 배열 리터럴
const arr = [1, 2, 3];
console.log(arr.length); // 3


// 빈 배열
const arr = []
console.log(arr.length); // 0


// 희소 배열
const arr = [1, ,3]; 
console.log(arr.length); // 3
console.log(arr); // [1, empty, 3]
console.log(arr[1]); // undefined
```





### 4.2. Array 생성자 함수

- Array 생성자 함수로 배열 생성 가능
- 전달된 인수의 개수에 따라 다르게 동작함
- 인수는 0 ~ 232-1(4294967295) 사이의 정수일 것
  - 범위를 벗어날 경우 RangeError 발생
- 인수가 없는 경우, 빈 배열 생성 = 배열 리터럴 []
- 인수가 2개 이상이거나 숫자가 아닌 경우, 인수를 요소로 갖는 배열 생성
- Array 생성자 함수는 함수로 호출하더라도 배열을 생성하는 생성자 함수로 동작함
  - Array 생성자 함수 내부에서 new.target 확인하기 때문임





### 4.3. Array.of

- ES6, 전달된 인수를 요소로 갖는 배열을 생성
- 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성

```javascript
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
const arr1 = Array.of(1);
console.log(arr1); // [1]

const arr2 = Array.of(1, 2, 3);
console.log(arr2); // [1, 2, 3]

const arr3 = Array.of('string');
console.log(arr3); // ['string']
```





### 4.4. Array.from

- 유사 배열 객체 또는 이터러블 객체를 변환하여 새로운 배열을 생성

```javascript
// 문자열은 이터러블이다.
const arr1 = Array.from('Hello');
console.log(arr1); // ['H', 'e', 'l', 'l', 'o']

// 유사 배열 객체를 새로운 배열을 변환하여 반환한다.
const arr2 = Array.from({ length: 2, 0: 'a', 1: 'b' });
console.log(arr2); // ['a', 'b']

// Array.from의 두번째 인수로 배열의 모든 요소에 대해 호출할 함수를 전달할 수 있다.
// 이 함수는 첫번째 인수에 의해 생성된 배열의 요소값괴 인덱스를 순차적으로 전달받아 호출된다.
const arr3 = Array.from({ length: 5 }, function (_, i) { return i; });
console.log(arr3); // [0, 1, 2, 3, 4]

// 유사 배열 객체
const arrayLike = {
  '0': 'apple',
  '1': 'banana',
  '2': 'orange',
  length: 3
};

// 유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있다.
// 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수도 있다.
for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]); // apple banana orange
}
```

> 유사 배열 객체와 이터러블 객체
>
> 유사 배열 객체(array-like Object)는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다. 유사 배열 객체는 마치 배열처럼 인덱스를 통해 프로퍼티에 접근할 수 있으며 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수도 있다.







## 5. 배열 요소의 참조

- 배열 요소 참조시 대괄호 표기법 사용
- [] 내 인덱스가 올 것
  - 인덱스는 값을 참조할 수 있기 때문에 객체의 프로퍼티 키와 같은 역할을 함
-  희소 배열의 존재하지 않는 요소를 참조하여도 undefined가 반환됨

```javascript
const arr = [1, 2];

// 인덱스가 0인 요소를 참조
console.log(arr[0]); // 1
// 인덱스가 1인 요소를 참조
console.log(arr[1]); // 2


// 존재하지 않는 요소에 접근시
const arr = [1, 2];

// 인덱스가 2인 요소를 참조
// 배열 arr에 인덱스가 2인 요소는 존재하지 않는다.
console.log(arr[2]); // undefined
```







## 6. 배열 요소의 추가와 갱신

- 요소의 동적 추가 가능

- 요소가 존재하지 않는 인덱스의 배열 요소에 값을 할당하면 새로운 요소가 추가됨

  -> length 프로퍼티 값은 자동 갱신

-  현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가시 희소 배열이됨

![](C:\Users\soarm\OneDrive\사진\array.jpg)



- 인덱스로 요소에 접근하여 명시적으로 값을 할당하지 않은 요소는 생성되지 않음
- 정수 이외의 값을 인덱스처럼 사용할 경우 요소 생성X, 프로퍼티가 생성됨

```javascript
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr[1.1] = 4;
arr[-1] = 5;

console.log(arr); // [1, 2, foo: 3, 1.1: 4, -1: 5]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2
```







## 7. 배열 요소의 삭제

- 배열은 객체이므로 delete 연산자 사용이 가능함
- delete 연산자는 객체의 프로퍼티를 삭제하는데 이때 배열은 희소 배열이 되며 length 프로퍼티 값은 변하지 않는다. 따라서 희소 배열을 만드는 delete 연산자는 사용하지 않는 것이 좋음
- **배열의 특정 요소 완전히 삭제 : Array.prototype.slice 메소드**

```javascript
const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티에 변경이 반영된다.
console.log(arr.length); // 2
```







## 8. 배열 메소드

- Array.prototype : 배열을 다룰 때 필요한 메소드를 제공
  - 원본 배열을 직접 변경하는 메소드(mutator method)
    - 주의) 외부 상태를 직접 변경하는 부수효과 있음
  - 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메소드(accessor method)





### 8.1. Array.isArray

- Array 생성자 함수의 정적 메소드
- 주어진 인수가 배열일시 true 배열이 아닐시 false 반환

```javascript
// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());

// false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ 0: 1, length: 1 })
```





### 8.2. Array.prototype.indexOf

- 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환
  - 중복되는 요소가 있는 경우, **첫번째 인덱스** 반환
  - 해당하는 요소가 없는 경우, **-1** 반환

```javascript
const arr = [1, 4, 5, 7, 4];

// 배열 arr에서 요소 5를 검색하여 첫번째 인덱스를 반환
arr.indexOf(5);    // -> 2
// 배열 arr에서 요소 4가 없으므로 -1을 반환
arr.indexOf(2);    // -1
// 두번째 인수는 검색을 시작할 인덱스이다. 두번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(4, 2); // 4
```



▼ 배열에 특정 요소가 존재하는지 확인

```javascript
const foods = ['apple', 'blueberry', 'Mango'];

// foods 배열에 'orange' 요소가 존재하는지 확인
if (foods.indexOf('orange') === 1) {
  foods.push('orange');
}

console.log(foods); // [ 'apple', 'blueberry', 'Mango', 'orange' ]
```



▼  ES7에서 새롭게 도입된 Array.prototype.includes 메소드 

```javascript
const foods = ['apple', 'banana'];

// ES7: Array.prototype.includes
// foods 배열에 'orange' 요소가 존재하는지 확인
if (!foods.includes('orange')) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가
  foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]
```





### 8.3. Array.prototype.push

- 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 값을 반환
- 원본 배열을 직접 변경함

```javascript
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.push(3, 4);
console.log(result); // 4

// push 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 2, 3, 4]
```



- 성능면에서 좋지 않음
- length 프로퍼티로 요소를 직접 추가하는 방법이 push 메소드보다 빠름

```javascript
const arr = [1, 2];

// arr.push(3)과 동일한 처리를 한다. 이 방법이 push 메소드보다 빠르다.
arr[arr.length] = 3;

console.log(arr); // [1, 2, 3]
```





### 8.4. Array.prototype.pop

- 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환
- 원본 배열이 빈배열이면 undefined 반환
- 원본 배열을 직접 변경함

```javascript
const arr = [1, 2];

// 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.pop();
console.log(result); // 2

// pop 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1]
```



#### pop메소드와 push메소드를 통한 스택 구현



![img](https://poiemaweb.com/assets/fs-images/27-3.png)



- 스택(stack) : 후입 선출(LIFO - Last In First Out) 방식의 자료 구조
- 가장 마지막에 밀어 넣은 최신 데이터를 취득
- push : 스택에 데이터를 밀어 넣는 것
- pop : 스택에서 데이터를 꺼내는 것





### 8.5. Array.prototype.unshift

- 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환
- 원본 배열을 직접 변경함

```javascript
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.unshift(3, 4);
console.log(result); // 4

// unshift 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 4, 1, 2]
```





### 8.6. Array.prototype.shift

- shift 메소드는 원본 배열에서 첫번째 요소를 제거하고 제거한 요소를 반환

```javascript
const arr = [1, 2];

// 원본 배열에서 첫번째 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.shift();
console.log(result); // 1

// shift 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [2]
```





### 8.7. Array.prototype.concat

- 인수로 전달된 값들(배열 또는 원시값)을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환
- 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가
- 원본 배열은 변경되지 않음

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
// 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가한다.
let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4]

// 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(3);
console.log(result); // [1, 2, 3]

// 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(arr2, 5);
console.log(result); // [1, 2, 3, 4, 5]

// 원본 배열은 변경되지 않는다.
console.log(arr1); // [1, 2]
```

- push와 unshift 메소드 → concat 메소드로 대체 가능

- push와 unshift 메소드는 원본 배열을 직접 변경하지만 **concat 메소드는 원본 배열을 변경하지 않고 새로운 배열을 반환**함
  - push와 unshift 메소드를 사용할 경우, 원본 배열을 반드시 변수에 저장해야 함
  - concat 메소드를 사용할 경우, 반환값을 반드시 변수에 할당 받아야 함

```javascript
const arr1 = [3, 4];

// unshift 메소드는 원본 배열을 직접 변경한다.
// 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
arr1.unshift(1, 2);
// unshift 메소드를 사용할 경우, 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4]

// push 메소드는 원본 배열을 직접 변경한다.
// 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
arr1.push(5, 6);
// pus 메소드를 사용할 경우, 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4, 5, 6]

// unshift와 push 메소드는 concat 메소드로 대체할 수 있다.
const arr2 = [3, 4];

// concat 메소드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다.
// arr1.unshift(1, 2)를 아래와 같이 대체할 수 있다.
let result = [1, 2].concat(arr2);
console.log(result); // [1, 2, 3, 4]

// arr1.push(5, 6)를 아래와 같이 대체할 수 있다.
result = result.concat(5, 6);
console.log(result); // [1, 2, 3, 4, 5, 6]
```





### 8.8. Array.prototype.splice

- push, pop, unshift, shift 메소드는 모두 원본 배열을 직접 변경하는 메소드(mutator method)이며 원본 배열의 처음이나 마지막에 요소를 추가하거나 제거함

![img](https://poiemaweb.com/assets/fs-images/27-5.png)



- splice 메소드 
  - 원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 사용
  - 3개 매개변수가 있고 원본 배열을 직접 변경함



- start : 원본 배열의 요소를 제거하기 시작할 인덱스이다. start 만을 지정하면 원본 배열의 start부터 모든 요소를 제거한다. start가 음수인 경우, 배열의 끝에서의 인덱스를 나타낸다. 만약 start가 -1이면 마지막 요소를 가리키고 -n이면 마지막에서 n번째 요소를 가리킨다.
- deleteCount : 원본 배열의 요소를 제거하기 시작할 인덱스인 start부터 제거할 요소의 개수이다. deleteCount가 0인 경우, 아무런 요소도 제거되지 않는다. (옵션)
- items : 제거한 위치에 삽입될 요소들의 목록이다. 생략할 경우, 원본 배열에서 지정된 요소들을 제거만 한다. (옵션)

```javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거한다.
const result = arr.splice(1, 2);

// 원본 배열이 변경된다.
console.log(arr); // [1, 4]
// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3]
```



![img](https://poiemaweb.com/assets/fs-images/27-7.png)



- splice 메소드의 두번째 인수, 즉 제거할 요소의 개수를 생략하면 첫번째 인수로 전달된 시작 인덱스부터 모든 요소를 제거함

```javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 모든 요소를 제거한다.
const result = arr.splice(1);

// 원본 배열이 변경된다.
console.log(arr); // [1]
// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3, 4]
```



- 배열에서 특정 요소를 제거하려면 indexOf 메소드를 통해 특정 요소의 위치를 취득한 다음 splice 메소드를 사용 가능

```javascript
const arr = [1, 2, 3, 1, 2];

// 배열 array에서 v 요소를 제거한다. v 요소가 여러 개 존재하더라도 하나만 제거한다.
function remove(array, v) {
  // 제거할 요소의 인덱스
  const index = array.indexOf(v);

  // 제거할 요소가 있다면 제거한다.
  if (index !== -1) array.splice(index, 1);

  return array;
}

console.log(remove(arr, 2)); // [1, 3, 4, 1, 2]
console.log(remove(arr, 10)); // [1, 3, 4, 1, 2]
```



- filter 메소드를 사용하여 특정 요소를 제거 가능하나 특정 요소가 중복된 경우, 모두 제거됨

```javascript
const arr = [1, 2, 3, 1, 2];

// 배열 array에서 모든 item 요소를 제거한다.
function remove(array, item) {
  return array.filter(v => v !== item);
}

console.log(remove(arr, 2)); // [1, 3, 1]
```





### 8.9. Array.prototype.slice

- 인수로 전달된 범위의 요소들을 복사하여 반환
- **원본 배열은 변경되지 않음** (splice와의 차이점)

- 매개변수 2개
  - start : 복사를 시작할 인덱스

    음수인 경우, 배열의 끝에서의 인덱스를 나타냄 

    예를 들어 slice(-2)는 배열의 마지막 2개의 요소를 반환

  - end : 복사를 종료할 인덱스

    이 인덱스에 해당하는 요소는 복사되지 않음

    옵션이며 **기본값**은 **length 값**

```javascript
const arr = [1, 2, 3];

// arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환한다.
let result = arr.slice(0, 1);
console.log(result); // [1]

// arr[1]부터 arr[2] 이전(arr[2] 미포함)까지 복사하여 반환한다.
result = arr.slice(1, 2);
console.log(result); // [2]

// 원본은 변경되지 않는다.
console.log(arr); // [1, 2, 3]
```



- 첫번째 매개변수 start에 해당하는 인덱스를 갖는 요소부터 매개변수 end에 해당하는 인덱스를 가진 요소 이전(end 미포함)까지 요소들을 복사하여 반환

![img](https://poiemaweb.com/assets/fs-images/27-8.png)



- 두번째 인수 생략시 첫번째 인수에 해당하는 인덱스부터 모든 요소를 복사하여 반환

```javascript
const arr = [1, 2, 3];

// arr[1]부터 이후의 모든 요소를 복사하여 반환한다.
const result = arr.slice(1);
console.log(result); // [2, 3]

// slice 메소드의 첫번째 인수가 음수인 경우, 배열의 끝부터 요소를 복사하여 반환한다.
const arr = [1, 2, 3];

// 전달된 인수가 음수인 경우, 배열의 끝부터 요소를 복사하여 반환한다.
let result = arr.slice(-1);
console.log(result); // [3]

result = arr.slice(-2);
console.log(result); // [2, 3]
```



- 인수를 모두 생략하면 얕은 복사를 통해 원본 배열의 새로운 복사본을 생성하여 반환함

- 복사본을 생성하는 것을 이용하여 arguments, HTMLCollection, NodeList와 같은 유사 배열 객체(array-like object)를 배열로 변환 가능함

```javascript
function sum() {
  // 유사 배열 객체를 배열로 변환(ES5)
  var arr = Array.prototype.slice.call(arguments);
  console.log(arr); // [1, 2, 3]

  return arr.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3)); // 6
```





### 8.10. Array.prototype.join

-  구분자(separator)로 연결한 문자열을 반환
- 구분자는 생략 가능, 기본 구분자 → ‘ , ’ 

```javascript
const arr = [1, 2, 3, 4];

// arr의 모든 요소를 문자열로 변환한 후 기본 구분자 ','로 연결한 문자열을 반환
let result = arr.join();
console.log(result); // '1,2,3,4';

// arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환
result = arr.join('');
console.log(result); // '1234'

// arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환
result = arr.join(':');
console.log(result); // '1:2:3:4'
```





### 8.11. Array.prototype.reverse

- 원본 배열의 요소 순서를 반대로 변경함

```javascript
const arr = [1, 2, 3];
const result = arr.reverse();

// reverse 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 2, 1]
// 반환값은 변경된 배열이다.
console.log(result); // [3, 2, 1]
```





### 8.12. Array.prototype.fill

- ES6~, 인수로 전달 받은 값을 요소로 배열의 처음부터 끝까지 채움

```javascript
const arr = [1, 2, 3];

// 인수로 전달 받은 값 0을 요소로 배열의 처음부터 끝까지 채운다.
arr.fill(0);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [0, 0, 0]
```

- 두번째 인수 = 요소 채우기를 시작할 인덱스

```javascript
const arr = [1, 2, 3];

// 인수로 전달 받은 값 0를 요소로 배열의 인덱스 1부터 끝까지 채운다.
arr.fill(0, 1);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0]
```

- 세번째 인수 = 요소 채우기를 멈출 인덱스

```javascript
const arr = [1, 2, 3, 4, 5];

// 인수로 전달 받은 값 0를 요소로 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 채운다.
arr.fill(0, 1, 3);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0, 4, 5]
```

- 배열을 생성하면서 특정 값으로 요소를 채울 수 있음

```javascript
const arr = new Array(3);
console.log(arr); // [empty × 3]

// 인수로 전달 받은 값 1을 요소로 배열의 처음부터 끝까지 채운다.
const result = arr.fill(1);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 1, 1]

// fill 메소드는 변경된 원본 배열을 반환한다.
console.log(result); // [1, 1, 1]
```





### 8.13. Array.prototype.includes

- ES7~, 배열 내에 특정 요소가 포함되어 있는지 확인하여 불리언 값을 반환
- 첫번째 인수로 검색할 대상을 지정

```javascript
const arr = [1, 2, 3];

// 배열에 요소 2가 포함되어 있는지 확인한다.
let result = arr.includes(2);
console.log(result); // true

// 배열에 요소 100이 포함되어 있는지 확인한다.
result = arr.includes(100);
console.log(result); // false
```



- 두번째 인수 = 검색을 시작할 인덱스

- 생략할 경우, 기본값 0이 설정

- 음수를 전달하면 length와 음수 인덱스를 합산하여(length + index) 검색 시작 인덱스를 설정함

```javascript
const arr = [1, 2, 3];

// 배열에 요소 1가 포함되어 있는지 인덱스 1부터 확인한다.
result = arr.includes(1, 1);
console.log(result); // false

// 배열에 요소 3가 포함되어 있는지 인덱스 2(arr.length - 1)부터 확인한다.
result = arr.includes(3, -1);
console.log(result); // true
```



### 8.14. Array.prototype.flat

- ES10(ECMAScript 2019)에서 새롭게 도입된 flat 메소드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화함

```javascript
console.log([1, [2, 3, 4, 5]].flat()); // [1, 2, 3, 4, 5]
```

- 인수로 중첩 배열을 평탄화할 깊이를 전달할 수 있다. 생략할 경우, 기본값은 1이다. Infinity를 전달하면 중첩 배열 모두를 평탄화함

```javascript
// 중첩 배열을 평탄화하기 위한 깊이 값의 기본값은 1이다.
console.log([1, [2, [3, [4]]]].flat()); // [1, 2, [3, [4]]]
console.log([1, [2, [3, [4]]]].flat(1)); // [1, 2, [3, [4]]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 2로 지정하여 2단계 깊이까지 평탄화한다.
console.log([1, [2, [3, [4]]]].flat(2)); // [1, 2, 3, [4]]
// 2번 평탄화한 것과 동일하다.
console.log([1, [2, [3, [4]]]].flat().flat()); // [1, 2, 3, [4]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 Infinity로 지정하여 끝까지 평탄화한다.
console.log([1, [2, [3, [4]]]].flat(Infinity)); // [1, 2, 3, 4]
```





## 9. 배열 고차 함수

#### 고차 함수(Higher-Order Function, HOF)란?

- 함수를 인자로 전달받거나 함수를 반환하는 함수
-  함수형 프로그래밍을 기반으로 외부 상태 변경이나 가변(mutable) 데이터를 피하고 **불변성(immutability)을 지향**함
  - 함수형 프로그래밍 : **조건문과 반복문을 제거하여 복잡성을 해결**하고 **변수의 사용을 억제**하여 상태 변경을 피하려는 프로그래밍 패러다임





### 9.1. Array.prototype.sort

- 배열의 요소를 정렬, 본 배열을 직접 변경하여 정렬된 배열을 반환하는데 기본적으로 오름차순으로 정렬함

- 따라서 내림차순으로 요소를 정렬하려면 sort 메소드로 오름차순으로 정렬한 후, reverse 메소드를 사용하여 요소의 순서를 뒤집는다.

- 문자열 요소들로 이루어진 배열의 정렬은 문제가 없지만 숫자 요소들로 이루어진 배열은 주의해야 함

```javascript
const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();

// 숫자 요소들로 이루어진 배열은 의도한 대로 정렬되지 않는다.
console.log(points); // [1, 10, 100, 2, 25, 40, 5]
```



▶ sort 메소드의 기본 정렬 순서는 문자열 Unicode 코드 포인트 순서를 따르므로 배열의 요소가 숫자 타입이라 할지라도 배열의 요소를 일시적으로 문자열로 변환한 후, 정렬함

따라서 **숫자 요소를 정렬**하기 위해서는 sort 메소드에 **정렬 순서를 정의하는 비교 함수를 인수로 전달**함

비교 함수를 생략할 경우, 배열의 각 요소는 일시적으로 문자열로 변환되어 Unicode 코드 포인트 순서에 따라 정렬됨

```javascript
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열 오름차순 정렬
// 비교 함수의 반환값이 0보다 작은 경우, a를 우선하여 정렬한다.
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소값 취득
console.log(points[0]); // 1

// 숫자 배열 내림차순 정렬
// 비교 함수의 반환값이 0보다 큰 경우, b를 우선하여 정렬한다.
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100
```





