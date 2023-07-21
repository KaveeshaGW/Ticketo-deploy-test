import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
// import Login from "./pages/LoginPage";
import { useSelector } from "react-redux/es/hooks/useSelector";

//Control center imports for testing purposes only
import Sidebar from './components/controlCenter/CCSidebar';
import TrainInfo from './pages/controlCenter/TrainInfo.jsx';
import AssignGuards from './pages/controlCenter/AssignGuards';
import Delays from './pages/controlCenter/Delays';
import TrackTrains from './pages/controlCenter/TrackTrains.jsx';
import Stations from './pages/controlCenter/Stations.jsx';
import Settings from './pages/controlCenter/Settings.jsx';

const App = () => {
  // const isLoggedIn = useSelector(state => state.isLoggedIn);
  // console.log(isLoggedIn);

  return (

    // Following code is only for Control center part
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Delays />} />
          <Route path="/delays" element={<Delays />} />
          <Route path="/tracktrains" element={<TrackTrains />} />
          <Route path="/traininfo" element={<TrainInfo />} />
          <Route path="/assignGuards" element={<AssignGuards />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
    // <React.Fragment>
    //   <main>
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //     </Routes>
    //   </main>
    // </React.Fragment>
  );
};

export default App;