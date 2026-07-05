import api from "../api/axios";

export const getDashboard = async () => {
    const response = await api.get("/dashboard", {
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token"),
        },
    });

    return response.data;
};