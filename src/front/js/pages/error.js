import React from "react";
import { Link,} from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const ErrorPage = () => {
    return (
        <div className="adlam-display-regular justify-content-center align-items-center">
            <h1 className=" text-center">Disculpe,aún estamos trabajando en la funcionalidad</h1>
            <img  className=" img-fluid mx-auto d-block" src={rigoImageUrl} />
            <hr className="my-4" />

            <Link to="/">
                <span className="btn btn-success d-grid gap-2 col-6 mx-auto" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};