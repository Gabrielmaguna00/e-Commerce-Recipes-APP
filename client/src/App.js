import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Landing from './components/LandingPage/LandingPage.jsx'
import CreateRecipe from './components/CreateRecipe/CreateRecipe.jsx'
import Detail from './components/DetailRecipe/DetailRecipe.jsx';

function App() {
  
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route exact path='/home' element={<Home/>}/>  
          <Route exact path='/Recipe' element={<CreateRecipe/>}/>
          <Route exact path='/home/:id' element={<Detail/>}/>
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
