import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Login,
  Register,
  HomeRoute,
  PrivateRoute,
  Dashboard,
  AddStrategyFormOne,
  AddStrategyFormTwo,
} from './pages';
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
          <Route path='add-strategy-1' element={<AddStrategyFormOne />} />
          <Route path='add-strategy-2' element={<AddStrategyFormTwo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
