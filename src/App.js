import React, { useEffect } from "react";
import AOS from "aos";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Categorie from "./pages/Categorie";
import Search from "./pages/Search";
import Page404 from "./pages/Page404";
import FilmDetail from "./pages/FilmDetail";
import SerieDetail from "./pages/SerieDetail";
import ActeurDetail from "./pages/ActeurDetail";

const App = () => {
  useEffect(() => {
    // on scroll
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie" element={<Categorie />} />
        <Route path="/search" element={<Search />} />
        <Route path="/filmdetail" element={<FilmDetail />} />
        <Route path="/seriedetail" element={<SerieDetail />} />
        <Route path="/acteurdetail" element={<ActeurDetail />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
