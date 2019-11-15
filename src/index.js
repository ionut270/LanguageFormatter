import React from 'react';
import ReactDOM from 'react-dom';


import './Styles/index.css';
import 'semantic-ui-css/semantic.min.css'


import * as serviceWorker from './serviceWorker';


import Header from './Global/Header/header'
import EpsilonTransitions from "./Components/Epsilon_Transitions/Epsilon_Transitions"

export default class App extends React.Component {
    state = {
        activeComponent: "Epsilon Transitions"
    }

    changeActiveComponent = e => name => {

        this.setState({
            activeComponent: name
        })

    }
    render() {
        return (
            <div className="App">
                <Header className="Header" changeActiveComponent={this.changeActiveComponent()}></Header>
                {this.state.activeComponent === "Epsilon Transitions" ? <EpsilonTransitions /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
