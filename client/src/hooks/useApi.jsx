import { useState } from "react"
import API_GMAIL from '../services/api.js'
const useApi = (urlObject) => {
    const [response, setResponse] = useState(null);
    const [error,setError]=useState('');
    const [isloading,setisLoading]=useState(false);
    const call = async (payload, type = '') => {
        setResponse(null);
        setError(null);
        setisLoading(true);
        try {
            const res = await API_GMAIL(urlObject, payload, type);
            setResponse(res.data);
        } catch (err) {
            console.log("Error while hitting the endpoint",err.message);
            setError(err.message);
        } finally{
            setisLoading(false);
        }
    }
    return {call,response,error,isloading};
}
export default useApi;
// import  API_GMAIL  from "../services/api.js";
// import { useState } from "react";
// const useApi = (urlObject) => {
//     const [response, setResponse] = useState(null);
//     const [error,setError]=useState('');
//     const [isLoading,setIsLoading]=useState(false);
//     const call = async (payload,type='') => {
//         setResponse(null);
//         setError(null);
//         setIsLoading(true);
//         try {
//             let res = await API_GMAIL(urlObject,payload,type);
//             setResponse(res.data);
//         } catch (err) {
//             console.log("error while pushing the data of email ");
//               setError(err.message);
//         }finally{
//             setIsLoading(false);
//         }
//     }
//     return {call,response,error,isLoading };
// }
// export default useApi
