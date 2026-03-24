import {Routes,Route} from 'react-router-dom';
import { Dashboard } from './components/HomePage/Dashboard';
import { SignUp } from './components/auth/SignUp';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/register' element={<SignUp />}></Route>
      </Routes>
    </>
  )
}

export default App
