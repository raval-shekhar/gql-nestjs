import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppRoutes from 'routes';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import 'antd/dist/antd.min.css';

function getToken() {
  let loginUser = localStorage.getItem('persist:root')
  if (loginUser) {
    loginUser = JSON.parse(loginUser)
    let { auth }: any = loginUser
    auth = JSON.parse(auth)
    const { user } = auth
    return user?.token ? user.token : null
  }
  return null
}

const httpLink = new HttpLink({ uri: 'https://gql-nestjs.herokuapp.com/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = getToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink.concat(httpLink)]),
  cache: new InMemoryCache()
});

const persistor = persistStore(store);

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<AppRoutes />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
