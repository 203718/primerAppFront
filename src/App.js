import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}>
          </Route>

          <Route path='*' element={<Login/>}>
          </Route>

          <Route path='/perfil' element={<Profile/>}>
          </Route>

          {/*<Route path='*' element={<div><h1>Not Found Page</h1></div>}>
          </Route>*/}
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
