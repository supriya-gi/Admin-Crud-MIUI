import Login from "./components/Login";
import "./App.css";
// import { Route, Routes } from "react-router-dom";
import Manager from "./components/Manager";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="manager" element={<Manager />} />
      </Routes> */}
      {toggleForm ? (
        <Login toggle={() => formMode()} />
      ) : (
        <SignUp toggle={() => formMode()} />
      )}
    </div>
  );
}

export default App;
