import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid'

import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../graphql/queries'; 
import { Title } from '../layout/Title';

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm();
  const [addCar] = useMutation(ADD_CAR);

  const { loading, error, data } = useQuery(GET_PEOPLE);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
  
    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        });
      }
    }).then(() => {
        form.resetFields();
      }).catch((error) => {
        console.error('Error adding car:', error);
      });
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data.people || data.people.length === 0) {
    return null; 
  }

  return (
    <>
    <Title text="Add Car" />
    <Form
      name='add-car-form'
      layout='inline'
      size='small'
      style={{ marginBottom: '40px' }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="Year: "
        name='year'
        size='small'
        rules={[{ required: true, message: 'Please enter a year' }]}
      >
        <Input type='number' placeholder='Year' style={{width: '80px'}} />
      </Form.Item>
      <Form.Item
        label="Make: "
        name='make'
        size='small'
        rules={[{ required: true, message: 'Please enter a make' }]}
      >
        <Input placeholder='Make' style={{width: '150px'}}/>
      </Form.Item>
      <Form.Item
        label="Model: "
        name='model'
        size='small'
        rules={[{ required: true, message: 'Please enter a model' }]}
      >
        <Input placeholder='Model' style={{width: '150px'}}/>
      </Form.Item>
      <Form.Item
        label="Price: "
        name='price'
        size='small'
        rules={[{ required: true, message: 'Please enter a price' }]}
      >
        <Input type='number' step='0.01' placeholder='$' style={{width: '70px'}}/>
      </Form.Item>
      <Form.Item
        label='Person: '
        name='personId'
        size='small'
        rules={[{ required: true, message: 'Please select a person' }]}
      >
        <Select placeholder='Select a person'>
          {data.people.map(person => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
    </>
  );
};

export default AddCar;
