import React from "react";
import {EVENTS} from "./constants";
import {Calendar} from "./components";
import "./styles.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <Calendar events={EVENTS}/>
        </div>
    );
};
export default App;
