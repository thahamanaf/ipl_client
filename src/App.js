
import './App.scss';
import { Routes, Route } from "react-router-dom";
import Login from './containers/Login';
import Register from './containers/Register';
import TeamList from './containers/TeamList';
import Dashboard from './containers/Dashboard';
import DashboardLayout from './Layout/DashboardLayout';
import TeamMemberList from './components/TeamMemberList/TeamMemberList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="team-members" element={<TeamMemberList />} />


    </Routes>
  );
}

export default App;
