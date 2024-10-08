import axios from "axios";

export const loginCall = async (userCredentials , dispatch) => {
    dispatch({type:'LOGIN_START'});
    try{
        const res = await axios.post("https://open-weather-tec.vercel.app/api/user/login" , userCredentials);
        dispatch({type:"LOGIN_SUCCESS" , payload:res.data});
    }catch(error){
        const errorMessage = error.response ? error.response.data.message : "An error occurred during login";
        dispatch({type:"LOGIN_FAILURE" , payload:errorMessage});
    }
};
