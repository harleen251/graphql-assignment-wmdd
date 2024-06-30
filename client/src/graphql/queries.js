import { gql } from "@apollo/client";

export const GET_CARS = gql`
query Cars {
    cars {
      id
      make
      model
      personId
      price
      year
    }
  }`

  export const GET_PEOPLE = gql`
  query People {
    people {
      id
      firstName
      lastName
    }
  }`

  export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_CAR = gql`
mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      make
      model
      personId
      price
      year
    }
  }`;

export const DELETE_PERSON = gql`
mutation DeletePerson($id: String!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }`;

  export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String, $lastName: String) {
      updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
          id
          firstName
          lastName
      }
  }`;
  
  export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: Int, $make: String, $model: String, $price: Float, $personId: String) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;


export const PERSON_WITH_CARS = gql`
  query personWithCars($id: String!) {
    personWithCars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

