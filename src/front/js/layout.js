import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import Map from "./component/Map";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import  User  from "./component/user";
import PrivateRoute from "./component/PrivateRoute.js";
import  Login  from "./component/login";
import  Signup  from "./component/signup";
import { ErrorPage } from "./pages/error";

import Que_es from "./component/que_es";



import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import NewPetLost from "./pages/newPetLost.js";

import NewFoundPet from "./pages/newFoundPet.js";
import UbicationMap from "./component/ubication_map.js";

import PetView from "./component/PetView.jsx";
import PetCard from "./component/PetCard.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    // <Route element = {<EditFoundPet/>} path = "/editpetfound"/>

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>

                          
                        <Route element ={<PrivateRoute><NewPetLost /></PrivateRoute>} path="/newpetlost" />
                        <Route element = {<PrivateRoute><NewFoundPet/></PrivateRoute>} path = "/newpetfound"/>
                        

                        <Route element={<Home />} path="/" />
                        <Route element={<Map />} path="/map" />
                        
                        <Route element={<UbicationMap />} path="/ubicationmap" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<User />} path="/user" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Que_es />} path="/que_es" />

                        <Route element={<Signup />} path="/signup" />

                        <Route element={<PetView />} path="/petview" />
                        <Route element={<PetCard />} path="/petcard/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<ErrorPage />} path="/error" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
