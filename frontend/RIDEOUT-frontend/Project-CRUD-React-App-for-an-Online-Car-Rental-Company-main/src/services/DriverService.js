import axios from 'axios';
const DRIVER_API_BASE_URL = "http://localhost:8070/driver";
class DriverService {

    getDriver(){
        return axios.get(DRIVER_API_BASE_URL);
    }

    createDriver(driver){
        return axios.post(DRIVER_API_BASE_URL, driver);
    }

    getDriverById(driver_id){
        return axios.get(DRIVER_API_BASE_URL + '/' + driver_id);
    }

    updateDriver(driver, driver_id){
        return axios.put(DRIVER_API_BASE_URL + '/' + driver_id, driver);
    }

    deleteDriver(driver_id){
        return axios.delete(DRIVER_API_BASE_URL + '/' + driver_id);
    }
}

export default new DriverService()