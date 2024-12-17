import React from "react";
import { Link, } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby-transparente.png";

export const ErrorPage = () => {
    return (
        <div className="container mt-4">
            <div className="row md-5 p-4 bg-success rounded-1 align-items-start" style={{ marginBottom: '20px' }}>
                <div className="adlam-display-regular justify-content-center align-items-center">
                    <h1 className=" text-center">Disculpe, aún estamos trabajando en esta funcionalidad</h1>
                    <img className="img-fluid mx-auto d-block" src={rigoImageUrl} />
                </div>
            </div>

            <Link to="/">
                <span className="btn btn-success adlam-display-regular d-grid gap-2 col-6 mx-auto" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};