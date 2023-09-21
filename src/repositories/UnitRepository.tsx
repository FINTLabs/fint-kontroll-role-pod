import axios from 'axios';
import {IUnitTree} from "../context/unitContext/types";

const getTree = () => {
    let baseUrl = axios.get('api/layout/configuration');
    let url = `/api/orgunits/`;
    let fullUrl = baseUrl + url;

    return axios.get<IUnitTree>(fullUrl);
}

const UnitRepository = {
    getUnitTree: getTree,
};

export default UnitRepository;