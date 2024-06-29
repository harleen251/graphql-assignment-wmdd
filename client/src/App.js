import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title';
import People from './components/lists/People';
import AddPerson from './components/forms/AddPerson';

const client = new ApolloClient ({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <AddPerson />
      <People />
    </div>
    </ApolloProvider>
  );
}

export default App;
