## useReducer

- action 객체를 기반으로 상태 업데이트
  - 업데이트시 참조하는 객체 : action 객체 
  - type 값을 사용하여 업데이트 내용 명시
  - 업데이트시 참조하고자 하는 값을 넣을 수도 있다
- 컴포넌트 상태 업데이트 로직을 컴포넌트 밖으로 분리 가능하다
- 다른 파일에서 작성한 후 불러올 수 도 있다
- reducer 상태 업데이트 하는 함수 :  
  - 현재 상태, state, 와 action을 파라미터로 받아와 **새로운 상태를 반환한다**



```react
function reducer(state, action) {
    // action type을 읽어옴
    switch (action.type) {
        case 'INCREMENT':
            // 업데이트된 state를 return
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
```

#### useReducer 사용시

```react
const [number, dispatch] = useReducer(reducer, 0);
```

- reducer : reducer 함수, 기본 값 : 숫자, 문자열, 객체, 배열 등이 될 수 있음
- number : 현재 state, dispatch : action을 발생시키는 함수
  - `dispatch({ type: 'INCREMENT' });`



```react
// Counter.js
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      throw new Error('Unhandeled action');
  }
}

function Counter() {

  const [number, dispatch] = useReducer(reducer, 0);
  const increase = () => {
    dispatch({
      type: 'INCREMENT'
    })
  }
  const decrease = () => {
    dispatch({
      type: 'DECREMENT'
    })
  }

   return (
    <div>
      <h1>{number}</h1>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
   )
}

export default Counter;
```



```react
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './Counter';

ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  document.getElementById('root')
);

```





## useState를 사용한 컴포넌트를 useReducer로 구현하기

1.  App 컴포넌트에서 사용할 초기 상태를 컴포넌트 바깥에 선언
2.  App 컴포넌트 내부 로직 삭제

```react
// App.js
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length
}
// 1번
const initialState = {
    const initialState = {
  inputs: {
  username: '',
  email: '',
  },
  users: [
    {
      id: 1,
      username: 'Joy',
      email: 'joy@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'Stanley',
      email: 'stanley@example.com',
      active: false
    },
    {
      id: 3,
      username: 'Soo',
      email: 'soo@example.com',
      active: false
    }
  ]
}
// 2번
function App() {
  return (
    <>
      <CreateUser 
          // 내부 props 설정도 초기화
      />
      <UserList users={[]} />
      <div>활성 사용자 수: 0</div>
    </>
    );
  }
  
  export default App;
```



3. useReducer 불러오기
4. reducer 함수 틀생성

```react
// App.js
// 3번
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

// 4번
function reducer(state, action) {
  return state;
}
function App() {
  return (
    <>
      <CreateUser
      />
      <UserList users={[]} />
      <div>활성 사용자 수: 0</div>
    </>
    );
  }
  
  export default App;
```

5. App 컴포넌트 작업

```react
function App() {
  // 디스트럭처링 할당 후 컴포넌트에 props로 전달
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const {username, email } = state.inputs;

  const onChange = useCallback(e => {
    // name과 value 값을 e.target에서 추출
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  return (
    <>
    {/* 디스트럭처링 할당 후 컴포넌트에 props로 전달 */}
      <CreateUser
        username={username} 
        email={email} 
        // onChange 함수 전달
        onChange={onChange}
      />
      <UserList users={users} />
      <div>활성 사용자 수: 0</div>
    </>
    );
  }
```

6. reducer 함수 생성

```react
function reducer(state, action) {
  // dispatch에 type이 CHANGE_INPUT이므로 
  // initialState에 inputs의 값을 바꿔주도록 생성  
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
      default:
        throw new Error('Unhandled action');
  }
}
```

7.  App 컴포넌트 내 onCreate 생성

```react
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        // 임의의 id 값  
        id: 1,
        username,
        email,
      }
    })
  }, [username, email])
```

8. nextId

```react
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const {username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
  }, [username, email])
```

9. CREATE_USER type action 처리

```react
function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
      case 'CREATE_USER':
        return {
          inputs: initialState.inputs,
          users: state.users.concat(action.user)
        }
      default:
        throw new Error('Unhandled action');
  }
}
```

- useState 사용시 inputs 초기화 작업 / users 업데이트 작업을 별도로 하였으나 'CREATE_USER' 발생시 두가지 작업을 동시에 처리한다.



10.  onCreate props 전달

```react

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const {username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
  }, [username, email])

  return (
    <>
      <CreateUser
        username={username} 
        email={email} 
        onChange={onChange}
        // onCreate 함수 전달
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성 사용자 수: 0</div>
    </>
    );
  }
```



11. onToggle / onRemove 

```react
function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
      case 'CREATE_USER':
        return {
          inputs: initialState.inputs,
          users: state.users.concat(action.user)
        };
      case 'TOGGLE_USER':
        return {
          ...state,
          users: state.users.map(user =>
            user.id === action.id
            ? { ...user, active: !user.active }
            : user
            )
        };
      case 'REMOVE_USER':
        return {
          ...state,
          users: state.users.filter(user => 
            user.id !== action.id)
        }
      default:
        throw new Error('Unhandled action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const {username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
  }, [username, email])

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);
  return (
    <>
      <CreateUser
        username={username} 
        email={email} 
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users}
        onToggle={onToggle}
        onRemove={onRemove}
      />
      <div>활성 사용자 수: 0</div>
    </>
    );
  }
```

12. 활성 사용자수

```react
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const {username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
  }, [username, email])

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <>
      <CreateUser
        username={username} 
        email={email} 
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users}
        onCreate={onCreate}
        onToggle={onToggle}
        onRemove={onRemove}
      />
      <div>활성 사용자 수: {count}</div>
    </>
    );
  }
```



#### App.js

```react
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length
}

const initialState = {
  inputs: {
  username: '',
  email: '',
  },
  users: [
    {
      id: 1,
      username: 'Joy',
      email: 'joy@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'Stanley',
      email: 'stanley@example.com',
      active: false
    },
    {
      id: 3,
      username: 'Soo',
      email: 'soo@example.com',
      active: false
    }
  ]
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
      case 'CREATE_USER':
        return {
          inputs: initialState.inputs,
          users: state.users.concat(action.user)
        };
      case 'TOGGLE_USER':
        return {
          ...state,
          users: state.users.map(user =>
            user.id === action.id
            ? { ...user, active: !user.active }
            : user
            )
        };
      case 'REMOVE_USER':
        return {
          ...state,
          users: state.users.filter(user => 
            user.id !== action.id)
        }
      default:
        throw new Error('Unhandled action');
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email])

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email} 
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users}
        onToggle={onToggle}
        onRemove={onRemove}
      />
      <div>활성 사용자 수: {count}</div>
    </>
    );
  }
  
  export default App;
```

