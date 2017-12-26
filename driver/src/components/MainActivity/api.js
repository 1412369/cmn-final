import {
    axios
} from '../Config/config'


export const GetDrivers = () => axios.get('/drivers')