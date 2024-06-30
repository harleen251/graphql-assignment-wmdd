import React from 'react';
import { Typography } from 'antd';
const { Title: AntTitle } = Typography;


export const MainTitle = () => {
    const styles = getStyles()
  
    return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
  }
  
  const getStyles = () => ({
    title: {
      fontSize: 20,
      padding: '15px',
      marginBottom: '50px'
    }
  })
  
 



export const Title = ({ text, level = 4 }) => {
  return <AntTitle level={level}>{text}</AntTitle>;
};

