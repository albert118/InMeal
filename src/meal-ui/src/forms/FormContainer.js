import React, { createContext } from "react";


const FormContext = createContext(); 

const FormContainer = props => {
    const { className } = props;

    const classes = className 
        ? `meal-ui-form-theme form ${className}` 
        : `meal-ui-form-theme form`;

    const formContextProps = { };

    return(
        <form className={classes}>
            <FormContext.Provider value={formContextProps}> 
                {props.children}
            </FormContext.Provider>
        </form>
    );
};

export default FormContainer;
export { FormContext };