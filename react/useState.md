## useState를 통해 컴포넌트에서 바뀌는 값 관리

```react
{/* App.js */}

import React from 'react';
import Counter from './Counter';

function App() {
    return (
    <Counter />
    );
  }
  
  export default App;
```



```react
{/* Counter.js */}

import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);
  const increase = () => {
    // 함수형 업데이트 (ex. prevNumber +1 같은 로직으로 상태를 업데이트 하겠다)
    setNumber(prevNumber => prevNumber + 1);
    // 아예 어떠한 값으로 변경하겠다, 그 다음 상태를 넣어줌 (ex. num - 1)
    // setNumber(number + 1);
  }
  const decrease = () => {
    setNumber(prevNumber => prevNumber - 1);
    // setNumber(number - 1);
  }

   return (
    <div>
      <h1>{number}</h1>
      {/* 함수 타입의 값을 그대로 넣어준다 increase, decrease */}
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
   )
}

export default Counter;
```

- 이벤트 함수 이름은 camelCase로 설정할 것
- 이벤트에 전달하는 값은 함수여야 함 (함수 호출X)





## input 상태 관리

```react
{/* App.js */}

import React from 'react';
import InputSample from './inputSample';

function App() {
    return (
    <InputSample />
    );
  }
  
  export default App;
```



```react
{/* inputSample.js */}

import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
    // console.log(e.target.value);
  }
  const onReset = () => {
    setText('');
  }

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>Reset</button>
      <div>
        <b>Value: </b>
        {text}
      </div>
    </div>
  );
}

export default InputSample;
```





## 여러개의 input 상태 관리

```react
{/* inputSample.js */}

import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });
  const { name, nickname } = inputs;

  const onChange = e => {
    // e.target에서 name, value를 추출하여 디스트럭처링 할당
    const { name, value } = e.target;
      
  	// 객체 상태를 업데이트할 때, 스프레드 문법을 사용하여 
    // 객체를 복사한 후 특정 값을 덮어 씌워야 함(불변성 유지)
    setInputs({
      ...inputs,
      [name]: value,
    });

    // const nextInputs = {
    //   ...inputs,
    //   [name]: value,
    // };

    // setInputs(nextInputs);
  };

  const onReset = e => {
    setInputs({
      name: '',
      nickname: '',
    });
  }

  return (
    <div>
      <input name="name" placeholder="name" onChange={onChange} value={name} />
      <input name="nickname" placeholder="nickname" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>Reset</button>
      <div>
        <b>Value: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```





## useRef 사용 특정 DOM 선택

```react
{/* inputSample.js */}

// useRef 불러오기
import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });

  // useRef를 호출하여 nameInput 객체 생성 후 선택한 DOM에 ref 설정 
  const nameInput = useRef();
  const { name, nickname } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
  
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = e => {
    setInputs({
      name: '',
      nickname: '',
    });
    // DOM에 접근, current가 DOM 요소를 가리킴, DOM API 사용(focus)
    nameInput.current.focus();
  }

  return (
    <div>
      <input 
          name="name" 
          placeholder="name" 
          onChange={onChange} 
          value={name}
          // ref 설정 
          ref={nameInput} />
      <input 
          name="nickname" 
          placeholder="nickname" 
          onChange={onChange} 
          value={nickname}/>
      <button onClick={onReset}>Reset</button>
      <div>
        <b>Value: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```