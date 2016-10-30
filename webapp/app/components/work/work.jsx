import React from 'react';
import { Router, Route, Link, IndexLink } from 'react-router'



const Work = React.createClass({
  propTypes: {
      name:React.PropTypes.string,
      image:React.PropTypes.string,
      route:React.PropTypes.string
  },

  getDefaultProps() {
    return {
      message: 'There was an error loading data.'
    };
  },

  shouldComponentUpdate() {
    return false;
  },

  render() {

    return (
        <div className="col-xs-12  work" >

            <div className="col-md-4 col-height">
                <div className="center_vertical content">
                    {this.props.name}
                <p className="hashtag">#entrepreneurship #dream hunting #learning</p>
                </div>
            </div>
            <div className="col-md-4 col-height">
                <div className="img_holder">
                    <img src={this.props.image} style={{minHeight: "200px", width: "100%", display: "block"}} />
                </div>
            </div>
            <div className="col-md-4 col-height">
                <div className="center_vertical content">

                    <Link className="btn btn-default"  to={this.props.route}>Explore</Link>
                </div>
            </div>

        </div>
    );
  }
});

export default Work;
