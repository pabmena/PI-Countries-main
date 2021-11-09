import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_NAME_COUNTRIES = "GET_NAME_COUNTRIES";
export const GET_DETAIL_COUNTRY = "GET_DETAIL_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const SET_LOADING_ERROR = "SET_LOADING_ERROR";


export function getCountries() {
    console.log("getCountries");
    return function (dispatch) {
        return axios
        .get("http://localhost:3001/countries")
        .then ((json) => {
        dispatch({ type: GET_COUNTRIES, payload: json.data })
        })
        .catch((err) => {
            dispatch({ type: SET_LOADING_ERROR });
        });
      };
    };
  
export function getNameCountries(name){
    return async function(dispatch){
        try{
            var json = await axios.get ("http://localhost:3001/countries?name="+name);
            return dispatch ({
                type: "GET_NAME_COUNTRIES",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getDetailCountry(id){
    return async function(dispatch){
        try{
            var json = await axios.get (`http://localhost:3001/countries/${id}`);
            return dispatch ({
                type: "GET_DETAIL_COUNTRY",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function filterCountriesByRegion(payload){
        return {
            type: "FILTER_BY_REGION",
            payload

        } 
}

export function filterCountriesByActivity(payload){
    return {
        type: "FILTER_BY_ACTIVITY",
        payload

    } 
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload

    } 
}    

export function orderByPopulation(payload){
    return {
        type: "ORDER_BY_POPULATION",
        payload
    
        }             
}

export function getActivities(){
    return async function(dispatch){
        try{
            var info = await axios.get ("http://localhost:3001/activities");
            return dispatch ({
                type: "GET_ACTIVITIES",
                payload: info.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postActivity(payload){
            var response = axios.post ("http://localhost:3001/activities", payload)
            console.log(response)
            return {
                type: "POST_ACTIVITY",
                response
    }
}


    

  