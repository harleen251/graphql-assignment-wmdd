import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { UPDATE_CAR, GET_CARS, GET_PEOPLE } from '../../../graphql/queries';

const UpdateCar = ({ id, year, make, model, price, personId, onButtonClick }) => {
  const [form] = Form.useForm();

  const { loading: peopleLoading, error: peopleError, data: peopleData } = useQuery(GET_PEOPLE);

const [updateCar] = useMutation(UPDATE_CAR, {
    update: (cache, { data: { updateCar } }) => {
      const { cars } = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: cars.map(car => car.id === updateCar.id ? updateCar : car)
        }
      });
  
      if (personId !== updateCar.personId) {
        const { people } = cache.readQuery({ query: GET_PEOPLE });
  
        const prevPerson = people.find(person => person.id === personId);
        if (prevPerson && prevPerson.cars) { 
          const updatedPrevPerson = {
            ...prevPerson,
            cars: prevPerson.cars.filter(car => car.id !== id)
          };
  
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              people: people.map(person => {
                if (person.id === prevPerson.id) {
                  return updatedPrevPerson;
                } else {
                  return person;
                }
              })
            }
          });
        }
  
        const newPerson = people.find(person => person.id === updateCar.personId);
        if (newPerson && newPerson.cars) { 
          const updatedNewPerson = {
            ...newPerson,
            cars: [...newPerson.cars, updateCar]
          };
  
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              people: people.map(person => {
                if (person.id === newPerson.id) {
                  return updatedNewPerson;
                } else {
                  return person;
                }
              })
            }
          });
        }
      }
    }
  });
  

  const onFinish = async (values) => {
    try {
      await updateCar({
        variables: {
          id,
          year: parseInt(values.year),
          make: values.make,
          model: values.model,
          price: parseFloat(values.price),
          personId: values.personId
        }
      });

      form.resetFields();

      onButtonClick();
    } catch (error) {
      console.error('Error updating car:', error.message);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      year: year.toString(),
      make,
      model,
      price: price.toString(),
      personId
    });
  }, [form, year, make, model, price, personId]);

  if (peopleLoading) return <p>Loading...</p>;
  if (peopleError) return <p>Error: {peopleError.message}</p>;

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: 'Please enter a year' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Make"
        name="make"
        rules={[{ required: true, message: 'Please enter a make' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: 'Please enter a model' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter a price' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Person"
        name="personId"
        rules={[{ required: true, message: 'Please select a person' }]}
      >
        <Select>
          {peopleData.people.map(person => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Update Car</Button>
        <Button onClick={onButtonClick}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCar;
