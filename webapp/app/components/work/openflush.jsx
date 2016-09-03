import React from 'react';

const OpenFlush = React.createClass({

  getDefaultProps() {
    return {
      message: 'There was an error loading data.'
    };
  },

  shouldComponentUpdate() {
    return false;
  },

  getProblem(){
    return (
        <div>
            {/*menily blood page*/}
            <div className="row strip">
                    <div className="col-md-12 col-height intro text-left">
                        <h2>Problem Statement</h2>
                        <br/>
                        Create an onlime multiplayer card game.<br/> Where a group of people sit together to play OpenFlush.
                        On a table there could at max 5 people. there are categories based on the value of chip that is to be put on bet.
                        Winner takes all the money on the table. Its a fast and entertaining game.
                    </div>
            </div>
        </div>
    )
  },
  getVideo(){
    return (
        <div>

            {/*menily blood page*/}
            <div className="row strip">
                    <div className="col-md-12 col-height side_panel " style={{textAlign:"center"}}>

                            <iframe className="video"  width="853" height="480" src="https://www.youtube.com/embed/axxcczqIjsk" frameborder="0" allowfullscreen></iframe>

                    </div>

            </div>
        </div>
    )
  },

  render() {

    return (
        <div className="" >
            <div className="row strip">
                <div className="col-md-4 col-height text-center">

                    <img className="logo" src="../images/openflush/logo.png"  />

                </div>
                <div className="col-md-8 col-height intro" style={{"paddingTop":"45px"}}>
                    <span className="brand"> A </span> multiplayer online card game. Based on <b>"Teen Patti" </b>, a popular card game
                </div>
            </div>
            {this.getVideo()}
            {this.getProblem()}
        </div>
    );
  }
});

export default OpenFlush;
