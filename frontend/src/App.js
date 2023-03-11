import { Route, Routes } from 'react-router-dom';
import './App.css';

import Chatpage from './pages/chat/Chatpage';
import DashBoard from './pages/DashBoard/Dashboard';

import Homepage from './pages/home/Homepage';


function App() {
  return (
    <div className="App">
    <Routes>
    
      <Route path='/'   element={<Homepage/>}   />
      <Route path='/chat'   element={<Chatpage/>}   />
      <Route path='/dashboard'   element={<DashBoard/>}   />
    </Routes>
    </div>
  );
}

export default App;
