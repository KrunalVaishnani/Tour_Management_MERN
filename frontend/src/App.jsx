import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import SearchResultList from "./pages/SearchResultList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import CardDetail from "./pages/CardDetail";
import AddEditTour from "./pages/AddEditTour";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/tours/search" element={<SearchResultList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
        <Route path="/admin/details/:id" element={<CardDetail />} />
        <Route path="/admin/addDetails" element={<AddEditTour />} />
        <Route path="/admin/updateDetails/:id" element={<AddEditTour />} />
      </Routes>
    </>
  );
}

export default App;
