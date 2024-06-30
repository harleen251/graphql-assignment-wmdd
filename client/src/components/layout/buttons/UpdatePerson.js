import { useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { UPDATE_PERSON } from '../../../graphql/queries';

const UpdatePerson = ({ id, firstName, lastName, onButtonClick }) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    const [updatePerson] = useMutation(UPDATE_PERSON);

    useEffect(() => {
        forceUpdate();
    }, []);

    const onFinish = async (values) => {
        try {
            await updatePerson({
                variables: {
                    id,
                    ...values
                }
            });
            onButtonClick();
        } catch (error) {
            console.error('Error updating person:', error.message);
        }
    };

    return (
        <Form
            name='update-person-form'
            layout='inline'
            form={form}
            initialValues={{
                firstName,
                lastName
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'Please enter a first name' }]}
            >
                <Input placeholder='First Name' />
            </Form.Item>
            <Form.Item
                name='lastName'
                rules={[{ required: true, message: 'Please enter a last name' }]}
            >
                <Input placeholder='Last Name' />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Person
                    </Button>
                )}
            </Form.Item>
            <Button onClick={onButtonClick}>Cancel</Button>
        </Form>
    );
};

export default UpdatePerson;
