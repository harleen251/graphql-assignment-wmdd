import { Card } from "antd";
import { EditOutlined } from '@ant-design/icons';
import Cars from "../lists/Cars";
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../../graphql/queries';
import { RemovePerson } from "../layout/buttons/Remove";
import { useState } from 'react';
import UpdatePerson from "../layout/buttons/UpdatePerson";
import { useNavigate } from 'react-router-dom';

const PersonCard = (props) => {
    const styles = getStyles();
    const { id, firstName, lastName } = props;
    const [isEditing, setIsEditing] = useState(false);
    const { loading, error, data } = useQuery(GET_CARS);
    const navigate = useNavigate();

    if (loading) return 'Loading...';
    if (error) {
        console.error('Error fetching cars:', error.message);
        return `Error: ${error.message}`;
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const learnMore = () => {
        navigate(`/person/${id}`);
    };

    const filteredCars = data.cars.filter(car => car.personId === id);

    return (
        <Card
            style={styles.card}
            title={isEditing ? "Edit Person" : `${firstName} ${lastName}`}
            actions={[
                isEditing ? null : <EditOutlined key="edit" onClick={handleEdit} />,
                <RemovePerson key="delete" id={id} />
            ]}
        >
            {isEditing ? (
                <UpdatePerson
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    onButtonClick={handleCancel}
                />
            ) : (
                <>
                    <Cars cars={filteredCars} />
                    <a onClick={learnMore} style={styles.learnMore}>Learn More</a>
                </>
            )}
        </Card>
    );
};

const getStyles = () => ({
    card: {
        width: '100%',
        marginBottom: '20px',
    },
    learnMore: {
        display: 'block',
        marginTop: '20px',
        color: '#1890ff',
        textAlign: 'right',
        cursor: 'pointer'
    }
});

export default PersonCard;
