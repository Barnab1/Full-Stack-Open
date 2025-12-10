import axios from 'axios';
const baseUrl = '/api/persons';

/**
 * Returns all stored data
 */
const getAll = ()=>{
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

/**
 * create new resource
 */
const create = (newPersonObject)=>{
    const request = axios.post(baseUrl, newPersonObject );
    return request.then(response=> response.data);
}

/**
 * Update a given resource
 */

const update = (id, newPersonObject)=>{
    const request = axios.put(`${baseUrl}/${id}`, newPersonObject);
    return request.then(response=> response.data);
}

/**
 * delete an entry
 */
const deleteEntry = (id)=>{
    const request = axios.delete(`${baseUrl}/${id}`);
    return request;
}

export default {
    getAll, 
    create,
    update,
    deleteEntry
};