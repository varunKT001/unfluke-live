import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from './api/user';
import { Login, Register, PrivateRoute } from './pages';
import {
  AddStrategyFormOne,
  AddStrategyFormTwo,
  MyStrategies,
  Orders,
  Positions,
  Dashboard,
  SharedLayout,
} from './pages/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <SharedLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='add-strategy-1' element={<AddStrategyFormOne />} />
          <Route path='add-strategy-2' element={<AddStrategyFormTwo />} />
          <Route path='my-strategies' element={<MyStrategies />} />
          <Route path='orders' element={<Orders />} />
          <Route path='positions' element={<Positions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
