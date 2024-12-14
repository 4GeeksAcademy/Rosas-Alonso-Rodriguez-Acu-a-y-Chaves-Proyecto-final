import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Que_es = () => {

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className="container p-5 bg-white shadow rounded" style={{ width: "550px" }}>
                    <h1 className="mb-4">vista qué es</h1>
                    
                </div>
            </div>
        </div>
    );
}

export default Que_es;