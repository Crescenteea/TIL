# 스프레드 문법

하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서(전개, 분산하여, spread) 개별적인 값들의 목록으로 만드는 문법이다.

사용 대상 : Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), Arguments와 같이 for…of 문으로 순회할 수 있는 이터러블에 한정됨



값이 오는 자리에 쓸 수 없다

...[2,3,4] => 2,3,4

사용가능한 자리 - 객체 리터럴 몸체 내부

 totos = [newTodo, ... todos];

함수를 쓰지 않고 리터럴로 쓸 수 있다

```javascript
// concat

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const arr3 = arr1.concat(...arr2)

console.log(arr3); // [1, 2, 3, 4, 5, 6]
      

// push

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const array = [...arr1,...arr2];

console.log(arr1) // [1, 2, 3, 4, 5, 6]


// splice

const arr1 = [2, 4, 6];
const arr2 = [1, 3, 5];

arr1.splice(0, 2, ...arr2);

console.log(arr1); // [1, 3, 5, 6]


// slice
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

console.log(arr2); // [1, 2, 3]
arr1 === arr2 // false

// apply
function sum() {
  // 유사 배열 객체인 arguments를 배열로 변환
  const args = [...arguments];

  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6

```
