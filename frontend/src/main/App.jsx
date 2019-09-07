import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import React from 'react'

import Logo from '../components/template/logo/Logo'
import Nav from '../components/template/nav/Nav'
import Footer from '../components/template/footer/Footer'
import Home from '../components/home/Home'

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Home />
        <Footer />
    </div>
