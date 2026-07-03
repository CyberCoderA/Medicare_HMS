import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<ProtectedRoute page={<Dashboard />} />} />
        <Route path='/changePassword' element={<ProtectedRoute page={<ChangePassword />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;