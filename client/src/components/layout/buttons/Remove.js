import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import filter from 'lodash.filter';
import { GET_CARS, REMOVE_CAR, GET_PEOPLE, DELETE_PERSON } from '../../../graphql/queries';


const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, c => c.id !== removeCar.id),
        },
      });
    },
    onError: (error) => {
      console.error('Error occurred during deletion:', error.message);
      console.error('Error details:', error);
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete the selected item?');

    if (result) {
      console.log('Attempting to delete car with id:', id);
      removeCar({
        variables: {
          id,
        },
      })
        .then(response => {
          console.log('Delete response:', response);
        })
        .catch(error => {
          console.error('Error deleting car:', error);
        });
    }
  };

  return <DeleteOutlined key="delete" style={{ color: 'red' }} onClick={handleButtonClick} />;
};

export const RemovePerson = ({ id }) => {
    const [deletePerson] = useMutation(DELETE_PERSON, {
      update(cache, { data: { deletePerson } }) {
        const { people } = cache.readQuery({ query: GET_PEOPLE });
  
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            people: people.filter(p => p.id !== deletePerson.id),
          },
        });
      },
      onError: (error) => {
        console.error('Error occurred during deletion:', error.message);
        console.error('Error details:', error);
      },
    });
    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this person?');
    
        if (result) {
          console.log('Attempting to delete person with ID:', id);
          deletePerson({
            variables: {
              id,
            },
          })
            .then(response => {
              console.log('Delete response:', response);
            })
            .catch(error => {
              console.error('Error deleting person:', error);
            });
        }
      };
    
      return <DeleteOutlined key="delete" style={{ color: 'red' }} onClick={handleButtonClick} />;
    };
      

export default RemoveCar;
