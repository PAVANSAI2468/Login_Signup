import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from "./components/signup"
import Login from "./components/login"
import ForgotPassword from "./components/forgotPassword"
import Dashboard from "./components/dashboard"
import ResetPassword from "./components/resetpassword"
function App() {
  return (
       <BrowserRouter>
       <Routes>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/forgot_password" element={<ForgotPassword/>}></Route>
        <Route exact path="/resetpassword" element={<ResetPassword/>}></Route>
        <Route exact path="/dashboard" element={<Dashboard/>}></Route>
       </Routes>
       </BrowserRouter>
  )
}

export default App
