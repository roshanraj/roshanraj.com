import React from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, Link, IndexLink } from 'react-router'
import jQuery from 'jquery';
import Classnames from 'classnames';
import ConfigStore from '../../stores/configStore';
import ServerLink from '../serverLink'

const Nav = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },

    propTypes:{
        togglemenu: React.PropTypes.func
    },

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },

    componentDidMount(){
        jQuery(ReactDOM.findDOMNode(this.refs.mainNav)).find('.dropdown-toggle').dropdown();
    },

    toggleMenu: function(){
        this.props.togglemenu()
    },

    render() {
        let me ={
            fontStyle:"italic"
        }
        return (
            <ul className="nav navbar-nav navbar-right" ref="mainNav">
                <li className={Classnames({"active": this.context.router.isActive('/', true)})}>
                    <Link style={me} onClick={this.toggleMenu} to="/">Me</Link>
                </li>

                <li className={Classnames({"active": this.context.router.isActive('/work', true)})}>
                    <Link onClick={this.toggleMenu} to="/work">Work</Link>
                </li>

                {/*
                        \/api\/[\dA-F]+ -- regex for url matching
                    <li className={Classnames({"active": this.context.router.isActive('/experiments', true)})}>
                    <Link onClick={this.toggleMenu} to="/experiments">Experiments</Link>
                </li>

                <li className={Classnames({"active": this.context.router.isActive('/contact', true)})}>
                    <Link onClick={this.toggleMenu} to="/contact">Contact</Link>
                </li>
                */}
                {/*<li className={Classnames({"active": this.context.router.isActive('/blog', true)})}>*/}

                    {/*<ServerLink onClick={this.toggleMenu} to="http://blog.roshanraj.com/">Blog</ServerLink>*/}
                {/*</li>*/}

                {/* <li className={Classnames({"active": this.context.router.isActive('/unmapped-route', true)})}>
                    <Link onClick={this.toggleMenu} to="/unmapped-route">404</Link>
                </li>*/}
            </ul>
        );
    }
});


export default Nav;
