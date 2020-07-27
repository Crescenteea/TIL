import React from "react";

let i = 0;

export default class App extends React.Component {
  state = { list: [] };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.list.length === this.state.list.length) return null;
    const list = document.querySelector("#list");
    return list.scrollHeight - list.scrollTop;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === null) return;
    const list = document.querySelector("#list");
    list.scrollTop = list.scrollHeight - snapshot;
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        list: [...this.state.list, i++],
      });
    }, 1000);
  }

  render() {
    if (this.state.list.length > 5) {
      // eslint-disable-next-line no-undef
      pppp();
    }
    return (
      <div id="list" style={{ height: 100, overflow: "scroll" }}>
        {this.state.list.map((i) => (
          <div>{i}</div>
        ))}
      </div>
    );
  }
}
