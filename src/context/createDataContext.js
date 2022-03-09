import React, { useReducer } from 'react';

//reducer === reducer function
//actions === the different helper functions object that contained some kind of dispatch inside of it.

export default (reducer, actions, initialState) => {
    const Context = React.createContext({});

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

    /* actions === {
            addBlogPost:  { (dispatchFunction) => { return () => {} },
            editBlogPost: { (dispatchFunction) => { return () => {} },
            ...
        }*/
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider };
};
