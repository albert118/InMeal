import React, { createContext } from "react";


const FormContext = createContext(); 

const FormRoot = props => {
    const classes = className 
        ? `meal-ui-form-theme form ${className}` 
        : `meal-ui-form-theme form`;

    return(
        <div className={classes}>
            <FormContext.Provider value={genericContextProps}> 
                {props.children}
            </FormContext.Provider>
        </div>
    );
};


export { FormRoot, FormContext };