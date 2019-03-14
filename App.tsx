import Amplify from 'aws-amplify';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createAppContainer } from 'react-navigation';

import awsmobile from './aws-exports';
import { Client } from './Data/gqlConfig';
import AppNavigator from './src/routes';

Amplify.configure(awsmobile);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  public render() {
    return(
      <ApolloProvider client={Client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

export default App;
