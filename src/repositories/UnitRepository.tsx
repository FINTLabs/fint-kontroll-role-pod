import axios from 'axios';
import {IUnitTree} from "../context/unitContext/types";

const getTree = () => {
    let url = `/api/orgunits/`;
    return axios.get<IUnitTree>(url);
}

const UnitRepository = {
    getUnitTree: getTree,
};

export default UnitRepository;