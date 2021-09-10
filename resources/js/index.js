import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const index = () => {
    return(
        <App />
    )
}

export default index;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}