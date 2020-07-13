# Immer

## Immer를 사용하여 불변성 지키기

Immer 사용을 위해 해당 프로젝트에서 Immer 설치

`$ yarn add immer`

코드 상단에서 immer를 불러온다. 

```react
import produce from 'immer';
```



#### produce 함수 사용

전역에 `window.produce = produce;`

produce(수정하고 싶은 상태, 업데이트 내용)

![](C:\Users\soarm\OneDrive\Desktop\immer.jpg)



produce 함수를 사용하므로서 기존 배열을 지키면서 새로운 배열을 생성할 수 있다.



## Immer로 리듀서 구현

```react
// App.js
function reducer(state, action) {
  switch (action.type) {
      case 'CREATE_USER':
        // ★ immer 사용
        return produce(state, draft => {
          draft.users.push(action.user);
        })
        // return {
        //   users: state.users.concat(action.user)
        // };
      case 'TOGGLE_USER':
        // ★ immer 사용
        return produce(state, draft => {
          const user = draft.users.find(user => user.id === action.id);
          user.active = !user.active;
        })
        // return {
        //   users: state.users.map(user =>
        //     user.id === action.id
        //     ? { ...user, active: !user.active }
        //     : user
        //     )
        // };
      case 'REMOVE_USER':
        // ★ immer 사용
        return produce(state, draft => {
          const index = draft.users.findIndex(user => user.id === action.id);
          draft.users.splice(index, 1);
        });
        // return {
        //   users: state.users.filter(user => user.id !== action.id)
        // }
      default:
        throw new Error('Unhandled action');
  }
}
```



- immer의 경우 자바스크립트 엔진이 proxy라는 기능을 사용함 
  - 구형 브라우저 / 리액트 네이티브에서는 작동하지 않음
  - 최신 버전 리액트 네이티브에서 proxy 사용 가능  