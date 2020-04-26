# 제어문

* 주어진 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용
* 코드의 실행 흐름(위에서 아래 방향)을 인위적으로 제어 가능
* 직관적인 코드의 흐름을 방해

* 단점 - 코드의 흐름을 이해하기 어렵게 만들어 가독성을 해침 = 오류 발생 원인






## 1. 블록문

* 블록문(Block statement/Compound statement)
* 0개 이상의 문을 중괄호로 묶은 것
* 코드 블록 또는 블록이라 불림
* 하나의 실행 단위(자바스크립트)
* 단독 사용 가능, 제어문 또는 함수 정의시 사용(일반적)
* 블록문의 끝에는 세미콜론을 붙이지 않음

```javascript
// 블록문
{
  var foo = 10;
  console.log(foo);
}

// 제어문
var x = 0;
while (x < 10) {
  x++;
}
console.log(x); // 10

// 함수 선언문
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2)); // 3
```





## 2. 조건문

* 조건문(conditional statement)
* 조건식(conditional expression)의 평가 결과에 따라 코드 블럭(블록문)의 실행을 결정
  * 조건식 = 불리언 값으로 평가될 수 있는 표현식

*  2가지, `if…else` 문 / `switch` 문




### 2.1. if…else 문

* 주어진 조건식의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정

```javascript
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행된다.
}
```



* if 문의 조건식은 불리언 값으로 평가돼야 함

* 불리언 값이 아닌 값으로 평가되면 자바스크립트 엔진에 의해 암묵적 데이터 타입 변환되어 실행할 코드 블록이 결정됨

* 조건식을 추가하여 조건에 따라 실행될 코드 블록을 늘리고 싶으면 `else if` 문 사용

* else if 문 / else 문 - 옵션

  * if 문, else 문(2번 이상 사용불가) 

  * else if 문(여러번 사용 가능)

```javascript
if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
  // 조건식2이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}


var num = 2;
var kind;

// if 문
if (num > 0) {
  kind = '양수'; // 음수를 구별할 수 없다
}
console.log(kind); // 양수

// if…else 문
if (num > 0) {
  kind = '양수';
} else {
  kind = '음수'; // 0은 음수가 아니다.
}
console.log(kind); // 양수

// if…else if 문
if (num > 0) {
  kind = '양수';
} else if (num < 0) {
  kind = '음수';
} else {
  kind = '영';
}
console.log(kind); // 양수
```

* 코드 블록 내 문이 하나뿐일 경우, 중괄호 생략 가능

```javascript
var num = 2;
var kind;

if (num > 0)      kind = '양수';
else if (num < 0) kind = '음수';
else              kind = '영';

console.log(kind); // 양수
```

* if else 문은 삼항 조건 연산자로 변경 가능

```javascript
var num = 3;
var kind = num > 0 ? '양수' : '음수'

console.log(kind); // 양수
```

* 세가지 경우의 수를 갖는 예제

```javascript
var num = 2;

// 0은 false로 취급된다.
var kind = num ? (num > 0 ? '양수' : '음수') : '영';

console.log(kind); // 양수
```

* 삼항 조건 연산자는 값으로 평가되는 표현식을 만드므로 변수에 할당 가능하나, if...else 문은 값처럼 사용할 수 없기 때문에 변수 할당 불가능



### 2.2. switch 문

* 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 순서를 이동시킴
  * case 문은 상황(case)을 의미하는 표현식을 지정하고 콜론으로 마침, 그 뒤에 실행할 문이 위치
  * switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없다면 실행 순서는 default 문으로 이동
  * default = 옵션
*  switch 문의 표현식은 불리언 값보다는 문자열, 숫자 값인 경우가 많음

```javascript
switch (표현식) {
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없을 때 실행될 문;
}
        
        
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
  case 2:
    monthName = 'February';
  case 3:
    monthName = 'March';
  case 4:
    monthName = 'April';
  case 5:
    monthName = 'May';
  case 6:
    monthName = 'June';
  case 7:
    monthName = 'July';
  case 8:
    monthName = 'August';
  case 9:
    monthName = 'September';
  case 10:
    monthName = 'October';
  case 11:
    monthName = 'November';
  case 12:
    monthName = 'December';
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // Invalid month
```

* 폴스루(fall through) : switch 문의 표현식의 평가 결과와 일치하는 case 문으로 실행 순서가 이동하여 문을 실행한 것은 맞지만, 문을 실행한 후 switch 문을 탈출하지 않고 switch 문이 끝날 때까지 이후의 모든 case 문과 default 문을 실행

* 상위 예제에서 변수 monthName에 ‘November’가 할당된 후 switch 문을 탈출하지 않고 연이어 ‘December’가 재할당되고 마지막으로 ‘Invalid month’가 재할당됨

```javascript
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
    break;
  case 2:
    monthName = 'February';
    break;
  case 3:
    monthName = 'March';
    break;
  case 4:
    monthName = 'April';
    break;
  case 5:
    monthName = 'May';
    break;
  case 6:
    monthName = 'June';
    break;
  case 7:
    monthName = 'July';
    break;
  case 8:
    monthName = 'August';
    break;
  case 9:
    monthName = 'September';
    break;
  case 10:
    monthName = 'October';
    break;
  case 11:
    monthName = 'November';
    break;
  case 12:
    monthName = 'December';
    break;
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // November
```

* default 문에는 break 문을 생략하는 것이 일반적이다. default 문은 switch 문의 가장 마지막에 위치하므로 default 문의 실행이 종료하면 switch 문을 빠져나간다. 따라서 별도로 break 문이 필요 없다.





## 3. 반복문

* 반복문(Loop statement)

* 주어진 조건식의 평가 결과가 참인 경우 코드 블럭을 실행
* 이후, 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행
* 조건식이 거짓일 때까지 반복
* 3가지의 반복문
  * for 문
  * while 문
  * do...while 문



### 3.1. for 문

* 조건식이 거짓으로 판별될 때까지 코드 블록을 반복 실행

* iteration의 i를 사용

```javascript
for (변수 선언문 또는 할당문; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}

for (var i = 0; i < 2; i++) {
  console.log(i);
}

// 위 예제를 역으로 반복
// 변수 i가 1으로 초기화된 상태에서 시작하여 i가 0보다 같거나 커질 때까지 코드 블록을 2번 반복 실행한다.
for (var i = 1; i >= 0; i--) {
  console.log(i);
}
```

* for 문의 변수 선언문, 조건식, 증감식은 모두 옵션임



## 3.2. while 문

* 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행

* 조건문의 평가 결과가 거짓이 되면 실행을 종료
* 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변환되어 논리적 참, 거짓을 구별

```javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count);
  count++;
} // 0 1 2
```

* 조건식의 평가 결과가 언제나 참이면 무한루프가 됨

```javascript
// 무한루프
while (true) { ... }
```

* 무한루프 탈출

  1. 코드 블럭 내에 if 문으로 탈출 조건을 만듦

  2. break 문으로 코드 블럭을 탈출함

```javascript
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
```



### 3.3. do...while 문

* 코드 블록을 먼저 실행하고 조건식을 평가
* 코드 블록은 무조건 한번 이상 실행됨

```javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2
```





## 4. break 문

* 코드 블록을 탈출하기 위해 사용
* 정확히 레이블 문(식별자가 붙은 문), 반복문(for, for…in, for…of, while, do…while) 또는 switch 문의 코드 블록을 탈출

```javascript
if (true) {
  break; // Uncaught SyntaxError: Illegal break statement
}
```

* 레이블 문
  * 프로그램의 실행 순서를 제어하기 위해 사용
  * switch 문의 case 문과 default 문도 레이블 문임
  * 레이블 문 탈출 : break 문에 레이블 식별자를 지정

```javascript
// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log('foo');

// foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo; // foo 레이블 블록문을 탈출한다.
  console.log(2);
}

console.log('Done!');
```

* 중첩된 for 문의 내부 for 문에서 break 문을 실행하면 내부 for 문을 탈출하여 외부 for 문으로 진입
* 내부 for 문이 아닌 외부 for 문을 탈출하려면 레이블 문을 사용

```javascript
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log('inner ' + j);
  }
}

console.log('Done!');
```





## 5. continue 문

* 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 이동
* break 문처럼 반복문을 탈출 X

```javascript
var string = 'Hello World.';
var search = 'l';
var count = 0;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== search) continue;
  count++; // continue 문이 실행되면 이 문은 실행되지 않는다.
}

console.log(count); // 3

// 참고로 String.prototype.match 메소드를 사용해도 같은 동작을 한다.
const regexp = new RegExp(search, 'g');
console.log(string.match(regexp).length); // 3
```

