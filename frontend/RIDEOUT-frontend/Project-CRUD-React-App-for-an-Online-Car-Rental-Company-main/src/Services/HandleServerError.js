import { SweetAlert } from "./SweetAlert";

const handleError = (err) => {
    if (err) {
        SweetAlert("error", "Ooopz!", err.response.data);
    }
}

export default handleError;
