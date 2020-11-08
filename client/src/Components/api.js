import axios from 'axios';

async function getData(filename,featureName)
{
    return (await axios.get(`/api/getData/${filename}/${featureName}`)).data;
}
async function getUserData(filename)
{
    return (await axios.get(`/api/getUserData/${filename}`)).data;
}

export default {
    getData,
    getUserData
};