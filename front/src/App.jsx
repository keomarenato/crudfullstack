 
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
import Login from './components/Login'
import CadastroHotel from './components/CreateHotel';
import Cadastrar from './components/Cadastrar';
 

function App() {
  
   

  return (
    <div>  
 
     <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro-user' element={<Cadastrar />} />
        <Route path='/cadastro-hotel' element={<CadastroHotel />} />
      </Routes>
     </Router>

    </div>
     
  )
}

export default App
