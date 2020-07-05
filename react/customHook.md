## Custom Hook

- 함수명 : 키워드 use + 구현할 기능에 대한 단어
  - ex. useInputs

```react
// useInputs.js
import { useState, useCallback } from 'react';

// useInputs 함수에서 관리할 form에 대한 초기값을 파라미터로 받는다
function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // useInputs가 반환하는 onChange를 사용해서 input의 change event관리
  // 상태는 form에서 조회
  // 초기화를 위해 reset 호출
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value })); 
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
};

export default useInputs;
```



```react
// App.js
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length
}

const initialState = {
  // inputs 객체 삭제
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
    // reducer에서 'CHANGE_INPUT'을 관리해줄 필요가 없으므로 삭제
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
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;
  const nextId = useRef(4);
  const { users } = state;
 // state.inputs 디스트럭처링 할당 삭제

 // onChange 삭제

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
    // reset은 onCreate시 호출
    reset();
    // useCallback에서 사용하는 것은 deps에 포함시켜줄 것
  }, [username, email, reset]);

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

