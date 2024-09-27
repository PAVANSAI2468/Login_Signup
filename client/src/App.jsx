import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import Dashboard from "./components/dashboard";
import ResetPassword from "./components/resetpassword"; // Update the import if file names differ

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/forgot_password"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/resetpassword/:token"
          element={<ResetPassword />}
        ></Route>
        <Route exact path="/" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
