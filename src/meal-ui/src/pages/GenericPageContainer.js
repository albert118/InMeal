import React, { createContext } from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';
import Footer from 'components/Navigation';


// create a generic context to inject data to children
const GenericContext = createContext(); 

const GenericPageContainer = props => {
    const { className } = props;

    const classes = className ? `p-page ${className}` : `p-page`;

    const genericContextProps = {
        className: "content-grid"
    };

    return (
        <div className={classes}>
            <MinimalistSidebar classname="sidebar-grid" />
            <GenericContext.Provider value={genericContextProps}> 
                {props.children}
            </GenericContext.Provider>
            <Footer className="footer-grid" />
        </div>
    );
};


export default GenericPageContainer
export { GenericContext };