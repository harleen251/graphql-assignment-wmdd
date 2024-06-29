import { Card } from "antd";

const CarCard = (props) => {

    const {id,
        make,
        model,
        personId,
        price,
        year} = props;
    const styles = getStyles();
    return (
        <Card style={styles.card}>
            {year} {make} {model} {price} 
        </Card>
    )
}

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

export default CarCard;