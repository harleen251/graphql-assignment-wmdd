import { Card } from "antd";
import Cars from "../lists/Cars";

const PersonCard = (props) => {
    const styles = getStyles();
    const {id,
        firstName,
    lastName} = props;
    return (
        <Card>
            <Card style={styles.card}>
                {firstName} {lastName}
            </Card>
            <Cars />
        </Card>
        
    )
}

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

export default PersonCard;