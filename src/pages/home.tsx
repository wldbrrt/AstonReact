import { useAuthorization, useAppDispatch } from "../store/hooks";
import { removeUser } from "../store/slices/user";
import { Navigate } from "react-router-dom";
import React from "react";

function Home() {
    const { isAuth, email } = useAuthorization();
    const dispatch = useAppDispatch();

    return isAuth
        ? (
            <div>
                <h1>WELCOME</h1>
            </div>
        )
        : (
            <Navigate to='/SignIn' />
        )
}

export { Home }