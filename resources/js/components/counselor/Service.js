import axios from "axios";

export const fetchProfile = async (_id) => {
    try {
        const response = await axios.get(`/api/counselor/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updatePhoto = async (form, _id) => {
    try {
        const response = await axios.post(
            `/api/counselor/profile/${_id}`,
            form
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateProfile = async (form, _id) => {
    try {
        const response = await axios.put(`/api/counselor/${_id}`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchAvailability = async (_id) => {
    try {
        const response = await axios.get(`/api/counselor/availability/${_id}`);
        return response;
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
};

export const addAvailability = async (form) => {
    try {
        const response = await axios.post("/api/counselor/availability", form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const removeAvailability = async (_id) => {
    try {
        const response = await axios.delete(
            `/api/counselor/availability/${_id}`
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateConnect = async (form) => {
    try {
        const response = await axios.put(`/api/counselor/connect`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchAppointments = async (_id) => {
    try {
        const response = await axios.get(`/api/counselor/appointment/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateAppointment = async (form) => {
    try {
        const response = await axios.put(`/api/counselor/appointment`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchWebinars = async (_id) => {
    try {
        const response = await axios.get(`/api/webinar/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const addWebinar = async (form) => {
    try {
        const response = await axios.post("/api/webinar", form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const removeWebinar = async (_id) => {
    try {
        const response = await axios.delete(`/api/webinar/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
