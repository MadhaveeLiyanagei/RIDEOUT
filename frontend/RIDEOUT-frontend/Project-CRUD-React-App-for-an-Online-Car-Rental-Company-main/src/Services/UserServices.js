import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import { SweetAlert } from "./SweetAlert";
import handleError from "./HandleServerError";

export const UserSignUpService = async (user) => {
    try {
        const res = await axios.post(`${API_ENDPOINT_PREFIX}user/SignUp`, user);
        SweetAlert("success", "Done!", "Profile Created Successfully!");
        return {
            status: true,
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const UserSignInService = async (user) => {
    try {
        const res = await axios.post(`${API_ENDPOINT_PREFIX}user/SignIn`, user);
        SweetAlert("success", "Done!", "Successfully Signed In!");
        localStorage.setItem("user", JSON.stringify(res.data));
        return {
            status: true,
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const deleteUserAccountService = async (id) => {
    try {
        await axios.delete(`${API_ENDPOINT_PREFIX}user/DeleteUser/${id}`);
        SweetAlert("success", "Done!", "Account Deleted Succesfully!");
        localStorage.removeItem("user");
        return {
            status: true,
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};