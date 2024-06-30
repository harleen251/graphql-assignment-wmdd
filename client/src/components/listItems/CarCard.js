import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RemoveCar from '../layout/buttons/Remove'; 
import UpdateCar from '../layout/buttons/UpdateCar';

const CarCard = ({ id, make, model, personId, price, year }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const styles = getStyles();

  return (
    <Card
      style={styles.card}
      type="inner"
      actions={[
        isEditing ? null : <EditOutlined key="edit" onClick={handleEdit} />,
        <RemoveCar key="delete" id={id} />
      ]}
    >
      {isEditing ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleCancel}
        />
      ) : (
        <p>{year} {make} {model} {price}</p>
      )}
    </Card>
  );
};

const getStyles = () => ({
  card: {
    width: '500px'
  }
});

export default CarCard;
