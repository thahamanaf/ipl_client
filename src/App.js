
import './App.scss';
import { Routes, Route } from "react-router-dom";
import Login from './containers/Login';
import Register from './containers/Register';
import Dashboard from './containers/Dashboard';
import DashboardLayout from './Layout/DashboardLayout';
import TeamMemberList from './components/TeamMemberList/TeamMemberList';
import Notification from './components/Notification/Notification';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path='dashboard' element={<DashboardLayout/>}>
      <Route path="" element={<Dashboard />} />
      <Route path="team-members" element={<TeamMemberList />} />
      <Route path="notification" element={<Notification />} />
      </Route>



    </Routes>
  );
}

export default App;
