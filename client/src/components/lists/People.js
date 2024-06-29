import { List } from 'antd'
import PersonCard from '../listItems/PersonCard'
import { GET_PEOPLE } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

const People = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PEOPLE)

  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`

  console.log("person data: ", data);


  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data.people.map(({id,
    firstName,
    lastName,
    })=> (
      <List.Item key={id}>
          <PersonCard id={id} firstName={firstName} lastName={lastName}/>
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

export default People;