import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeRoute, PrivateRoute } from './layouts';
import { useDispatch } from 'react-redux';
import { auth } from './api/user';
import {
  Login,
  Register,
  Dashboard,
  AddStrategyFormOne,
  AddStrategyFormTwo,
} from './pages';

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
          <Route path='add-strategy-1' element={<AddStrategyFormOne />} />
          <Route path='add-strategy-2' element={<AddStrategyFormTwo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
