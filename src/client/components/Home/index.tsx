import * as React from "react";
import HooksRedux from "./HooksRedux";
const { Provider, store } = HooksRedux({
  initialState: { name: "test", age: 10 },
});

function timeoutAdd(a) {
  return new Promise((cb) => setTimeout(() => cb(a + 1), 500));
}
// 异步
const actionAsyncOfAdd = () => async (dispatch, ownState) => {
  const age = await timeoutAdd(ownState.age);
  dispatch({
    type: "add",
    reducer(state) {
      return { ...state, age };
    },
  });
};
// 同步
const actionOfAdd = () => {
  return {
    type: "add",
    reducer(state) {
      return { ...state, age: state.age + 1 };
    },
  };
};
const Button = () => {
  function handleAdd() {
    store.dispatch(actionAsyncOfAdd());
  }
  return <button onClick={handleAdd}>点击增加</button>;
};
const Home = () => {
  const state = store.useContext();
  return (
    <div>
      {state.age}
      基础Home
      <Button />
    </div>
  );
};
const WrapHome = () => {
  return (
    <Provider>
      <Home />
    </Provider>
  );
};
export default WrapHome;
