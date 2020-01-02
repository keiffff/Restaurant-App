import * as React from 'react';
import { Route } from 'react-router';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { RestaurantsIndexPage } from 'pages/Restaurants/IndexPage';

const httpLink = new HttpLink({
  uri: 'https://restaurant-app-server.now.sh',
});

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Route path="/">
        <RestaurantsIndexPage />
      </Route>
    </ApolloProvider>
  );
};
