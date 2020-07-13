# 클래스형 컴포넌트

- 클래스형 컴포넌트에서 render() 필수

```react
// Hello.js
import React, { Component } from 'react';

class Hello extends Component {
  // defaultProps 설정, 함수형 컴포넌트에서처럼 선언하거나
  // 클래스 내부에 static 키워드와 함께 선언할 수 있음
  static defaultProps = {
    name: '이름없음',
  };
  // 클래스형 컴포넌트에서 render 메서드 필수
  render() {
    const { color, isSpecial, name } = this.props;
    // 내부에서 JSX 반환해줘야 함
    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
      </div>
      // props 조회시 this.props 사용  
      // <div>
      //   {this.props.isSpecial && <b>*</b>}
      //   안녕하세요 {this.props.name}
      // </div>
    )
  }
}

// function Hello({ color, name, isSpecial }) {
//    return (
//     <div style={{
//       color
//     }}> 
//       {/* {isSpecial ? <b>*</b> : null} */}
//       {isSpecial && <b>*</b>}
//       Hello! {name}
//       </div>
//    );
// }

// Hello.defaultProps = {
//     name: 'No name'
// };

export default Hello;
```

- 예전에는 클래스형 컴포넌트를 만들었다면 현재는 함수형으로 만들어지는 추세임

- Hooks를 사용하여 상태관리 가능

  (예전의 함수형 컴포넌트에서는 상태관리가 어려웠음)

  

Hooks의 부재로 컴포넌트 렌더링 전후 어떤 작업이 어려워 함수형 컴포넌트 보다는 클래스형 컴포넌트를 사용했었으나 Hooks가 생겨남에 따라 useEffect, useReducer, useState 등을 사용하여 상태관리 등 원하는 작업의 처리가 가능해짐





## 클래스형 컴포넌트의 state와 setState

```react
import React, { Component } from 'react';

class Counter extends Component {
// class properties 
// (babel 플러그인을 통해 사용 가능한 문법으로 리액트에서 자동적으로 사용 가능)
  state = {
    counter: 0,
    fixed: 1
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 0
  //   };
  // }

  // setState는 변경 원하는 상태로 값의 변경을 요청하는 함수
  // (값을 바로 변환하는 함수가 아니다)
  // 상태가 비동기적으로 업데이트 되므로 +1을 3번 요청하였으나 1씩 증가
  handleIncrease = () => {
    this.setState({
      counter: this.state.counter + 1
    });
    this.setState({
      counter: this.state.counter + 1
    });
    this.setState({
      counter: this.state.counter + 1
    });
  }
  
  // 함수형 업데이트 
  // 한 메서드에서 setState를 여러번 사용해야하는 일이 있을 경우에 필요함
  handleDecrease = () => {
    this.setState(state => ({
      counter: state.counter - 1
    }))
    this.setState(state => ({
      counter: state.counter - 1
    }))
    this.setState(state => ({
      counter: state.counter - 1
    }))
    };
  
  render() {
    return(
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
        <p>Fixed Value: {this.state.fixed}</p>
      </div>
    )
  }
}
```

