import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

ReactDOM.render(<App id={9999595} />, document.getElementById('app'));


// echo “GET http://localhost:8081/restaurants/9001” | vegeta -cpus 1 attack -duration=3s | vegeta report