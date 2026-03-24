import {Routes,Route} from 'react-router-dom';
import { Dashboard } from './components/auth/SignUp';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App
