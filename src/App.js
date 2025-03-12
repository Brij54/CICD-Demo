import Login from "./components/Login/Login";
import Page1 from "./components/Page1";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Edit from './components/Edit/Edit';



function App() {
  return (
    <Routes>
      
      <Route path='/edit' element={<Edit/>}/>
      <Route path='/page1' element={<Page1 />}/>
  <Route path='/login' element={<Login />}/>
</Routes>
  );
}

export default App;
