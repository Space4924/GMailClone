
import axios from 'axios';
// const URL='http://localhost:8000';
const URL="";
const API_GMAIL=async(urlObject,payload,type)=>{
    return await axios({
        method:urlObject.method,
        url:`${URL}/${urlObject.endpoint}/${type}`,
        data:payload
    })
}
export default API_GMAIL;

// import axios from 'axios';
// const URL='http://localhost:8000';
// const API_GMAIL=async(urlObject,payload={},type)=>{
//     const { params, urlParams, ...body } = payload;
//     return await axios({
//         method:urlObject.method,
//         url:`${URL}/${urlObject.endpoint}/${type}`,
//         data:payload
//     })
// }
// export default API_GMAIL;