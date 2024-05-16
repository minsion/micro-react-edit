import './App.css';
import React, {useEffect, useState}  from 'react'
import { Menu } from 'antd';

function App() {
 
  const items = [
    {
      label: 'Available Apps',
      key: 'Available',
    },
    {
      label: 'Use an App',
      key: 'Use',
    },
    {
      label: 'Define an App',
      key: 'Define',
    },
  ];
  useEffect(() => {

  }, [])
  const [current, setCurrent] = useState('Available');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className="App">
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      
    </div>
  );
}

export default App;
