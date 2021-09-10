import axios from "axios";

export const fetchPartners = async () => {
    try {
        const response = await axios.get(`/api/partner/colleges`);
        return response;
    } catch (error) {
        return error.response;
    }
};
