import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
    const auth = useAuthProvider();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useAuthProvider = () => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        data: {
            _id: "",
            first_name: "",
            last_name: "",
            type: "",
        },
    });

    const login = async (form) => {
        try {
            const response = await axios.post("/api/login", form);
            if (response.status === 200) {
                let userData = {
                    isLoggedIn: true,
                    data: {
                        _id: response.data._id,
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        type: response.data.type,
                    },
                };

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return response;
        } catch (error) {
            return error.response;
        }
    };

    const register = async (form) => {
        try {
            const response = await axios.post("/api/student", form);
            if (response.status === 200) {
                let userData = {
                    isLoggedIn: true,
                    data: {
                        _id: response.data._id,
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        type: response.data.type,
                    },
                };

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return response;
        } catch (error) {
            return error.response;
        }
    };

    const logout = async (form) => {
        try {
            const response = await axios.post("/api/logout", form);
            if (response.status === 200) {
                let userData = {
                    isLoggedIn: false,
                    data: {
                        _id: "",
                        first_name: "",
                        last_name: "",
                        type: "",
                    },
                };

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return response;
        } catch (error) {
            return error.response;
        }
    };

    useEffect(() => {
        const local = localStorage.getItem("user");
        if (local && !user.isLoggedIn) {
            const localData = JSON.parse(local);
            setUser(localData);
        }
    }, []);

    return {
        user,
        login,
        register,
        logout,
    };
};
