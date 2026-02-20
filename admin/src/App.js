import "./App.css";
import NAvbar from "./components/Navbar/NAvbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "@mui/material/Toolbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add/Add";
import Orders from "./pages/Oders/Orders";
import FoodList from "./pages/FoodList/FoodList";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NAvbar />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-food" element={<Add />} />
        <Route path="/food-list" element={<FoodList />} />
      </Routes>
    </div>
  );
}

export default App;
