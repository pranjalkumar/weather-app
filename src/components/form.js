/**
 * Created by LENOVO on 20-03-2019.
 */
import React from 'react';
//importing all the required files
//defining form functional component

const Form=(props)=>{
    return(
        <form onSubmit={props.loadWeather}>
            <input type="text" name="city" placeholder="Enter your city here"/>
            <input type="text" name="country" placeholder="Enter your country here"/>
            <button>Get Weather information</button>
        </form>
    )
}

//exporting the form module
export default Form;