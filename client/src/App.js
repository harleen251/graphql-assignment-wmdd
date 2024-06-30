import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Title, MainTitle } from './components/layout/Title';
import People from './components/lists/People';
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import PersonDetails from './components/PersonDetails';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const Home = () => (
  <>
    <MainTitle />
    <Title text="Add Person" />
    <AddPerson />
    
    <AddCar />
    <Title text="Records" />
    <People />
  </>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/person/:id" element={<PersonDetails />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
