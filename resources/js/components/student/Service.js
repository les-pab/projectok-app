import axios from "axios";

export const fetchProfile = async (_id) => {
    try {
        const response = await axios.get(`/api/student/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const updatePhoto = async (form, _id) => {
    try {
        const response = await axios.post(`/api/student/profile/${_id}`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateProfile = async (form, _id) => {
    try {
        const response = await axios.put(`/api/student/${_id}`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchAvailableCounselor = async () => {
    try {
        const response = await axios.get(`/api/student/counselor/available`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchAvailability = async () => {
    try {
        const response = await axios.get(`/api/student/counselor/availability`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchAppointments = async (_id) => {
    try {
        const response = await axios.get(`/api/student/appointment/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const connectWithCounselor = async (form) => {
    try {
        const response = await axios.post(`/api/student/connect`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const storeAppointment = async (form) => {
    try {
        const response = await axios.post(`/api/student/appointment`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateAppointment = async (form) => {
    try {
        const response = await axios.put(`/api/student/appointment`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchDiary = async (_id) => {
    try {
        const response = await axios.get(`/api/student/diary/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const storeEntry = async (form) => {
    try {
        const response = await axios.post(`/api/student/diary`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateEntry = async (form) => {
    try {
        const response = await axios.put(`/api/student/diary`, form);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchWebinars = async () => {
    try {
        const response = await axios.get(`/api/webinar`);
        return response;
    } catch (error) {
        return error.response;
    }
};
