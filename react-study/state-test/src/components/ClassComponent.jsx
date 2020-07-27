import React from "react";

class ClassComponent extends React.Component {
  state = {
    list: [],
    count: 0,
  };

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState((state) => ({
        ...this.state,
        count: state.count + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>클래스 컴포넌트다!</h1>
        <h2>{this.state.count}</h2>
        <button>버튼이다!</button>
      </div>
    );
  }
}

export default ClassComponent;
