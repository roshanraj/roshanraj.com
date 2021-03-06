import React from 'react';
import {Link} from 'react-router';
import ClassNames from 'classnames';
import ServerLink from '../serverLink'
import Nav from './nav';

const Header = React.createClass({
    mixins: [],
    getInitialState () {
        return {
            is_menu_open: false
        };
    },
    toggleMenu: function(){
        this.setState({is_menu_open:!this.state.is_menu_open});
    },
    render() {
        return (
    

                <nav id="site-nav-wrap" className="navbar navbar-default navbar-static-top">
                    <div className="col-lg-12">
                        <div className="navbar-header">
                            <button onClick={this.toggleMenu} type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#site-nav">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" target="_self" className="navbar-brand" activeClassName=''>
                                <img className="" style={{"width":"4.6rem"}} src="/images/rr_logo.png" />
                            </Link>
                        </div>
                        <div className={ClassNames({"collapse navbar-collapse":true,"in":this.state.is_menu_open})} id="site-nav">
                            <Nav togglemenu={this.toggleMenu}/>
                        </div>
                    </div>
                    <div className="col-xs-12 no-padding border"></div>
                </nav>


        );
    }
});

export default Header;
