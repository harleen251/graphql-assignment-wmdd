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