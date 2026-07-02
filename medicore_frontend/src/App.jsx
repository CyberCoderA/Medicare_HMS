import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/changePassword' element={<ProtectedRoute><ChangePassword/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;