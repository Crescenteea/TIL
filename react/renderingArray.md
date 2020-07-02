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