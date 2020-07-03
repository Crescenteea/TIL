## 배열 렌더링

```react
{/* App.js */}

import React from 'react';
import UserList from './UserList';

function App() {
    return (
    <UserList />
    );
  }
  
  export default App;
```



```react
{/* UserList.js */}

import React from 'react';

// 동일 파일내 여러 컴포넌트 선언 가능
function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'Joy',
      email: 'joy@gmail.com'
    },
    {
      id: 2,
      username: 'Stanley',
      email: 'stanley@example.com'
    },
    {
      id: 3,
      username: 'Soo',
      email: 'soo@example.com'
    }
  ];

  return (
    <div>
     {users.map(user => (
       <User user={user} />
     ))}
    </div>
  );
}

export default UserList;
```



![](C:\Users\soarm\OneDrive\문서\arrayrendering.jpg)



- 배열 렌더링시 `key` prop 설정을 요함
  - key : 각 요소들이 갖고 있는 고유의 값



```react
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'Joy',
      email: 'joy@gmail.com'
    },
    {
      id: 2,
      username: 'Stanley',
      email: 'stanley@example.com'
    },
    {
      id: 3,
      username: 'Soo',
      email: 'soo@example.com'
    }
  ];

  return (
    <div>
     {users.map(user => (
       // key 값 입력
       <User user={user} key={user.id} />
     ))}
    </div>
  );
}

export default UserList;
```



![](C:\Users\soarm\OneDrive\문서\arrayrendering1.jpg)





## useRef 로 컴포넌트 안의 변수 만들기

- useState 상태 변경시 리렌더링됨
- 리렌더링이 필요 없는 값을 관리할 때 useRef 사용 
- 값이 바뀌어도 컴포넌트가 리렌더링 되지 않음
  - setTimeout, setInterval 사용시 주어지는 id 값 기억해야 될 때
  - 외부 라이브러리를 사용하여 생성된 인스턴스
  - Scroll 위치 



```react
{/* App.js */}
import React, {useRef} from 'react';
import UserList from './UserList';

function App() {
  const users = [
    {
      id: 1,
      username: 'Joy',
      email: 'joy@gmail.com'
    },
    {
      id: 2,
      username: 'Stanley',
      email: 'stanley@example.com'
    },
    {
      id: 3,
      username: 'Soo',
      email: 'soo@example.com'
    }
  ];
    
// useRef 사용한 변수
// useRef의 파라미터는 .current 값의 기본값이 됨
  const nextId = useRef(4);

// 추후 배열 항목 추가시 사용할 로직    
  const onCreate = () => {
    nextId.current += 1;
  }

    return (
    <UserList users={users} />
    );
  }
  
  export default App;
```



```react
{/* UserList.js */}
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
     {users.map(user => (
       <User user={user} key={user.id} />
     ))}
    </div>
  );
}

export default UserList;
```



## 배열 항목 추가

```react
{/* App.js */}
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreatUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }
// users 배열을 컴포넌트의 상태로써 관리하기 위해 useState로 감싸줌
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'Joy',
      email: 'joy@gmail.com'
    },
    {
      id: 2,
      username: 'Stanley',
      email: 'stanley@example.com'
    },
    {
      id: 3,
      username: 'Soo',
      email: 'soo@example.com'
    }
  ]);
// useRef 사용한 변수
// useRef의 파라미터는 .current 값의 기본값이 됨
  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    }
    // setUsers([...users, user]);
    setUsers(users.concat(user));
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }

    return (
      <>
      <CreatUser 
        username={username} 
        email={email} 
        onChange={onChange}
        onCreate={onCreate}
        />
      <UserList users={users} />
      </>
    );
  }
  
  export default App;
```





## 배열 항목 제거

```react
{/* App.js */}
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreatUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }
// users 배열을 컴포넌트의 상태로써 관리하기 위해 useState로 감싸줌
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'Joy',
      email: 'joy@gmail.com'
    },
    {
      id: 2,
      username: 'Stanley',
      email: 'stanley@example.com'
    },
    {
      id: 3,
      username: 'Soo',
      email: 'soo@example.com'
    }
  ]);
// useRef 사용한 변수
// useRef의 파라미터는 .current 값의 기본값이 됨
  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    }
    // setUsers([...users, user]);
    setUsers(users.concat(user));
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  }

    return (
      <>
      <CreatUser 
        username={username} 
        email={email} 
        onChange={onChange}
        onCreate={onCreate}
        />
      <UserList users={users} onRemove={onRemove} />
      </>
    );
  }
  
  export default App;
```



```react
{/* UserList.js */}
import React from 'react';

function User({ user, onRemove }) {
  const { username, email, id } = user;
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
      {/* button 클릭시 props로 받아온 onRemove를 id값을 파라미터로 넣어 호출(특정값인 id 삭제) */}
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove }) {
  return (
    <div>
     {users.map(user => (
       <User 
        user={user} 
        key={user.id} 
        onRemove={onRemove}
       />
     ))}
    </div>
  );
}

export default UserList;
```

