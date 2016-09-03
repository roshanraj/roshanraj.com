import React from 'react';
import FontAwesome from 'react-fontawesome';

const AngularjsSeed = React.createClass({

  getDefaultProps() {
    return {
      message: 'There was an error loading data.'
    };
  },

  shouldComponentUpdate() {
    return false;
  },

  render() {
    let icon_style = {
        textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
        margin:"3rem",
        color:"#000"
    }
    return (
        <div className="" >

            <div className="row strip">
                <div className="col-md-4 col-height text-center">

                    <img className="logo" src="../images/angularjsseed/logo.png"  />

                </div>
                <div className="col-md-8 col-height intro" style={{"paddingTop":"50px"}}>
                    <span className="brand"> Angularjs Seed </span>, This project is an application skeleton for a typical AngularJS web app. To be used for quick bootstrap any angular webapp projects
                    and dev environment for these projects.
                </div>
            </div>
            <div className="row strip">
                <div className="col-md-12 col-height intro text-center">
                    Bootstraping an Project comes with same tedious steps. The effort of setting up project structure, managed code baseline and setting up taskrunners to help
                    with the bunding, can be saved. If we have skeleton to build upon. So created this angularjs seed.
                    Working on Angularjs Seed with ECMA 6 Norms.
                    <br/>Find it at
                        <a href="https://github.com/roshanraj/angular-webpack-seed" target="_blank">
                            <FontAwesome
                            className=''
                            name='github'
                            size='3x'
                            style={icon_style}
                            />
                        </a>
                </div>

            </div>

            {/*menily blood page*/}
            <div className="row strip">
                <div className="col-md-12 col-height">

                </div>
            </div>

            {/*home page*/}
        </div>
    );
  }
});

export default AngularjsSeed;
