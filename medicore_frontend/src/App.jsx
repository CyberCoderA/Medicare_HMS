import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ChangePassword from './pages/ChangePassword';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='admin' element={<Admin/>} />
        <Route path='changePassword' element={<ChangePassword/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;