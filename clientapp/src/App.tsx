import React from 'react';
import './App.css';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Layout from './components/Layouts/Layout';
import { Routes, Route } from "react-router-dom";
import Locateus from './components/Locateus';
import List from './components/Products/List';
import Catalogs from './components/Products/Catalogs';
import Search from './components/Products/Search';
import Profile from './components/Users/Profile';

function App(props: any) {
  return (
    <>
    <Layout>
      {props.children}
    </Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/locateus" element={<Locateus />} />
      <Route path="/list" element={<List />} />
      <Route path="/catalogs" element={<Catalogs />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

    </>
  )
}

export default App;