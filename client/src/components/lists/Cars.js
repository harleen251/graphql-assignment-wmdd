import { List } from 'antd';
import CarCard from '../listItems/CarCard';

const Cars = ({ cars }) => {
    const styles = getStyles();

    return (
        <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
            {cars.map(({ id, make, model, personId, price, year }) => (
                <List.Item key={id}>
                    <CarCard id={id} make={make} model={model} personId={personId} price={price} year={year} />
                </List.Item>
            ))}
        </List>
    );
};

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
});

export default Cars;