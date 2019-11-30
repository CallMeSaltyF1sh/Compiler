import React from 'react';
import Main from './containers/Main';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { reducer } from './reducers/index';

const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
 
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

function App() {
  return (
    <Provider className="App" store={store}>
      <Main />
    </Provider>
  );
}

export default App;
