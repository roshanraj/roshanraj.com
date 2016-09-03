import React from 'react';
import ApiMixin from '../mixins/apiMixin';
import Header from '../components/header';

const App = React.createClass({
    mixins: [
        ApiMixin
    ],

    getInitialState() {
        return {
            loading: false,
            error: false
        };
    },

    componentWillMount() {

    },

    componentWillUnmount() {

    },

    onConfigured() {
        this.setState({});
    },

    render() {
        return (
            <div>
                <Header/>
                <div id="content">{this.props.children}</div>
            </div>
        );
    }
});

export default App;
