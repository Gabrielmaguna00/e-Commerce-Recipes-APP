import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Landing from './components/LandingPage/LandingPage.jsx'
import CreateRecipe from './components/CreateRecipe/CreateRecipe.jsx'
import Detail from './components/DetailRecipe/DetailRecipe.jsx';
import Paginado from './components/Paginado/Paginado';
import BasicSelect from './components/NavBar/Navbar';

function App() {
  
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route exact path='/home' element={<Home/>}/>  
          <Route exact path='/Recipe' element={<CreateRecipe/>}/>
          <Route exact path='/home/:id' element={<Detail/>}/>
          <Route exact path='/prueba' element={<Paginado/>}/>
          <Route exact path='/12' element={<BasicSelect/>}/>
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
