import React from 'react';
import ChartWeather from './Components/ChartWeather';
import Profile from './Components/Profile';
import BasicTable from '././Components/BasicTable';
import '././CSS/App.css'


const App = () => {

  return (

    <div className="appContainer">
      <div className="profile">
        <Profile />
      </div>
      <div className="data">
        <ChartWeather />
        <div className="basictable">
          <BasicTable />
        </div>
      </div>
    </div>

  );
};


export default App;
