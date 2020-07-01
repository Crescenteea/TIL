## props를 통해 컴포넌트에게 값 전달하기

```react
{/* App.js */}
import React from 'react';
import Hello from './Hello';
import Wrapper from './wrapper';

function App() {
    return (
      <>
      <Wrapper>
      <Hello name="react" color="green" isSpecial={true} />
      <Hello color="pink" />
      </Wrapper>
      </>
    );
  }
  
  export default App;
```



```react
{/* Hello.js */}

import React from 'react';
function Hello({ color, name, isSpecial }) {
   return (
    <div style={{
      color
    }}>
      {/* {isSpecial ? <b>*</b> : <b>#</b>} */}
      {isSpecial && <b>*</b>}
      Hello! {name}
      </div>
   );
}

Hello.defaultProps = {
    name: 'No name'
};

export default Hello;
```



```react
{/* Wrapper.js */}
import React from 'react';

function Wrapper({ children }) {
    const style = {
        border: '2px solid red',
        padding: 16
    };
return <div style={style}>{children}</div>
}

export default Wrapper;
```

