import axios from 'axios';
import {IUnitTree} from "../context/unitContext/types";



const getPage = () => {


    // Create an instance of Axios for the first proxy server
    // const instance1 = axios.create({
    //     baseURL: 'http://localhost:8081'
    // });
    //
    let url = `/api/orgunits/`;


    return axios.get<IUnitTree>(url);

}

const UnitRepository = {
    getUnitTree: getPage,
    //TODO fix naming here
};

export default UnitRepository;