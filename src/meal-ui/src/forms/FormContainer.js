import React, { createContext } from "react";

const FormContext = createContext(); 

const FormContainer = props => {
    const { className } = props;

    const classes = className 
        ? `meal-ui-form-theme form ${className}` 
        : `meal-ui-form-theme form`;

    const formContextProps = { };

    return(
        <div className={classes}>
            <FormContext.Provider value={formContextProps}> 
                {props.children}
            </FormContext.Provider>
        </div>
    );
};

export default FormContainer;
export { FormContext };