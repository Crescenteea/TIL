## Context API

- useContext는 context를 컴포넌트 내부에서 조회할 수 있도록 하는 Hook

- Context 생성시 createContext 함수 사용 파라미터는 기본 값 

  즉, provider에 사용된 값이 없을 경우 사용될 값

- MyContext 내 Provider 컴포넌트를 사용하여 직접 원하는  context의 값 value 지정 가능

```react
// ContextSample.js
import React, { createContext, useContext } from 'react';

// value="GOOD"
const MyContext = createContext('defaultValue');

// Child 컴포넌트의 useContext로 MyContext value를 사용
function Child() {
  const text = useContext(MyContext);
  return <div>안녕하세요? {text}</div>
}

function Parent() {
  return <Child />
}

function GrandParent() {
  return <Parent />
}

function ContextSample() {
  return (
    // MyContext에 value 값 설정
    <MyContext.Provider value="GOOD">
      <GrandParent />
    </MyContext.Provider>
  )
}

export default ContextSample;

```



#### 유동적으로 변하는 context 값 설정

```react
// ContextSample.js
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue');

function Child() {
  const text = useContext(MyContext);
  return <div>안녕하세요? {text}</div>
}

function Parent() {
  return <Child />
}

function GrandParent() {
  return <Parent />
}

function ContextSample() {
  const [value, setValue] = useState(true);
  return (
    <MyContext.Provider value={value ? 'GOOD' : 'BAD'}>
      <GrandParent />
      <button onclick={() => setValue(!value)}>Click Me!</button>
    </MyContext.Provider>
  )
}

export default ContextSample;
```



## UserDispatch context

```react
// App.js
import React, { useRef, useReducer, useMemo, useCallback, createContext } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length
}

const initialState = {
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

// UserDispatch라는 context 생성
// 기본값은 필요 없으므로 null
export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;
  const nextId = useRef(4);
  const { users } = state;

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

    reset();

  }, [username, email, reset]);
    
  // onToggle, onRemove 삭제  

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    // context의 값은 useReducer로 받아온 'dispatch'를 value로 넣어준 상태임
    <UserDispatch.Provider value={dispatch}>
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
    </UserDispatch.Provider>
    );
  }
  
  export default App;
```



- onToggle, onRemove 삭제
- useContext 사용
- UserDispatch 불러오기

```react
// UserList.js
import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {
  const { username, email, id, active } = user;
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b style={{
        color: active ? 'blue' : 'black',
        cursor: 'pointer'
      }} onClick={() => dispatch({
        type: 'TOGGLE_USER',
        id
      })}>{username}</b> <span>({email})</span>
      <button onClick={() => dispatch({
        type: 'REMOVE_USER',
        id
      })}>삭제</button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
     {users.map(user => (
       <User 
        user={user} 
        key={user.id} 
       />
     ))}
    </div>
  );
}

export default React.memo(UserList, 
  (prevProps, nextProps) => nextProps.users === prevProps.users
  );
```