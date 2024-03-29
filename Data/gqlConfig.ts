import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

import ENV from '../env';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) { console.log(`[Network error]: ${networkError.message} ${networkError}`); }
});

const Link = new HttpLink({
  uri: ENV.dev.apiUrl,
});

const cache = new InMemoryCache();

export const Client = new ApolloClient({
  link: errorLink.concat(Link),
  cache,
});
