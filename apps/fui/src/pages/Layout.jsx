import { useState } from 'react';
import MinimalistSidebar from '../components/MinimalistSidebar';
import { ErrorDetailContext, useErrorDetail } from '../hooks/data';
import { LoadingContext, useLoadingState } from '../hooks/fetch/loadingContext';

export default function Layout({ children }) {
    // control the toggle'able sidebar-heading
    // the initial state is falsy inactive, the animation begins after the first click
    const [isActive, setActive] = useState(false);
    const [isInActive, setInActive] = useState(null);

    const getClassNames = () => {
        return `${isActive ? 'header-active' : ''} ${
            isInActive ? 'header-inactive' : ''
        }`;
    };

    return (
        <LoadingContext.Provider value={useLoadingState()}>
            <ErrorDetailContext.Provider value={useErrorDetail()}>
                <MinimalistSidebar
                    isActive={isActive}
                    setActive={setActive}
                    isInActive={isInActive}
                    setInActive={setInActive}
                />
                <main className={getClassNames()}>{children}</main>
            </ErrorDetailContext.Provider>
        </LoadingContext.Provider>
    );
}
