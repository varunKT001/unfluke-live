import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Register, HomeRoute, PrivateRoute, Dashboard } from './pages';
import { useDispatch } from 'react-redux';
import { auth } from './api/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRoute />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
