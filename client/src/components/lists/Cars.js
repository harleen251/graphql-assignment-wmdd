import { List } from 'antd'
import CarCard from '../listItems/CarCard'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../graphql/queries'

const Cars = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CARS)

  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`

  console.log("data: ", data);

  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data.cars.map(({id,
    make,
    model,
    personId,
    price,
    year})=> (
      <List.Item key={id}>
          <CarCard id={id} make={make} model={model} personId={personId} price={price} year={year}/>
      </List.Item>

    ))}
        
    </List>
  )
}

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export default Cars;