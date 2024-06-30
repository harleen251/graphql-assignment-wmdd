
import find from 'lodash.find'
import remove from 'lodash.remove'

const peopleArray = [
    {
      id: '1',
      firstName: 'Bill',
      lastName: 'Gates'
    },
    {
      id: '2',
      firstName: 'Steve',
      lastName: 'Jobs'
    },
    {
      id: '3',
      firstName: 'Linux',
      lastName: 'Torvalds'
    }
  ]
  
  const cars = [
    {
      id: '1',
      year: '2019',
      make: 'Toyota',
      model: 'Corolla',
      price: '40000',
      personId: '1'
    },
    {
      id: '2',
      year: '2018',
      make: 'Lexus',
      model: 'LX 600',
      price: '13000',
      personId: '1'
    },
    {
      id: '3',
      year: '2017',
      make: 'Honda',
      model: 'Civic',
      price: '20000',
      personId: '1'
    },
    {
      id: '4',
      year: '2019',
      make: 'Acura ',
      model: 'MDX',
      price: '60000',
      personId: '2'
    },
    {
      id: '5',
      year: '2018',
      make: 'Ford',
      model: 'Focus',
      price: '35000',
      personId: '2'
    },
    {
      id: '6',
      year: '2017',
      make: 'Honda',
      model: 'Pilot',
      price: '45000',
      personId: '2'
    },
    {
      id: '7',
      year: '2019',
      make: 'Volkswagen',
      model: 'Golf',
      price: '40000',
      personId: '3'
    },
    {
      id: '8',
      year: '2018',
      make: 'Kia',
      model: 'Sorento',
      price: '45000',
      personId: '3'
    },
    {
      id: '9',
      year: '2017',
      make: 'Volvo',
      model: 'XC40',
      price: '55000',
      personId: '3'
    }
  ]
    
  const typeDefs = `
    type Car {
      id: String!
      year: Int
      make: String
      model: String
      price: Float
      personId: String
    }

    type Person {
        id: String!
        firstName: String
        lastName: String
      }
  
    type Query {
      people: [Person],
      cars: [Car],
      personWithCars(id: String!): PersonWithCars 
    }

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): Person
        addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
        updatePerson(id: String!, firstName: String, lastName: String): Person
        updateCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String): Car
        deletePerson(id: String!): Person
        removeCar(id: String!): Car
    }

    type PersonWithCars {
        id: String!
        firstName: String
        lastName: String
        cars: [Car]
    }
  `
  
  const resolvers = {
    Query: {
      people: () => peopleArray,
      cars: () => cars,
      personWithCars: (_, { id }) => {
        const person = find(peopleArray, { id });
        if (!person) return null;
        const personCars = cars.filter(car => car.personId === id);
        return { ...person, cars: personCars };
    }
    },
    Mutation: {
        addPerson: (_, { firstName, lastName }) => {
            const newPerson = {
                id: `${peopleArray.length + 1}`,
                firstName,
                lastName
            };
            peopleArray.push(newPerson);
            return newPerson;
        },
        updatePerson: (_, { id, firstName, lastName }) => {
            const person = find(peopleArray, { id });
            if (!person) return null;
            person.firstName = firstName || person.firstName;
            person.lastName = lastName || person.lastName;
            return person;
        },
        addCar: (_, { year, make, model, price, personId }) => {
            const newCar = {
                id: `${cars.length + 1}`,
                year,
                make,
                model,
                price,
                personId
            };
            cars.push(newCar);
            return newCar;
        },
        updateCar: (_, { id, year, make, model, price, personId }) => {
          const car = find(cars, { id });
          if (!car) return null;
          car.year = year || car.year;
          car.make = make || car.make;
          car.model = model || car.model;
          car.price = price || car.price;
          car.personId = personId || car.personId;
          return car;
        },
        deletePerson: (_, { id }) => {
            const person = find(peopleArray, { id });
            if (!person) return null;
            remove(cars, { personId: id });
            remove(peopleArray, { id });
            return person;
        },
        removeCar: (_, { id }) => {
          const car = find(cars, { id });
          if (!car) return null;
          remove(cars, { id });
          return car;
        }
    }
  }
  
  export { typeDefs, resolvers }