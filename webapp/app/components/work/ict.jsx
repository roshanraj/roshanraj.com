import React from 'react';

const Ict = React.createClass({

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

            {/*top*/}
            <div className="row strip">
                <div className="col-md-6 col-height">
                    <img className="side_img side_img_lk" src="../images/codetutor/ict1.png"  />
                </div>

                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                        Simple introduction to "Logic" and its importance in programming.
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>tutorial</a></li>
                            <li><a>visual</a></li>


                        </div>
                    </div>
                </div>

            </div>
            {/*bottom*/}
            <div className="row strip">
                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                        An interactive code, algorithm and flowchart drafter. That automatically genrates code, algorithm and its flowchart based on user behavior and selections.
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>auto code generator</a></li>
                            <li><a>auto flowchart generator</a></li>
                            <li><a>auto algorithm generator</a></li>
                            <li><a>Js</a></li>


                        </div>
                    </div>

                </div>

                <div className="col-md-6 col-height ">
                    <img className="side_img side_img_lk" src="../images/codetutor/ict2.png"  />
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

                    <img className="logo" src="../images/codetutor/logo.png"  />

                </div>
                <div className="col-md-8 col-height intro" style={{"paddingTop":"36px"}}>
                    <span className="brand"> An </span> interactive way to explain what <b>logic</b> means and its role in programming.
                        With a <b>code</b>, <b>algorithm </b>and <b>flow chart generator</b> to help people understand better.

                </div>
            </div>
            <div className="row strip">
                <div className="col-md-12 col-height intro text-center">
                    <b>Experiment and visuals enhances topic understanding</b> Most of the people lack basic of programming. <br/>
                    So I designed, this simple page. That explains what logic is and has a inbuild visual programmer, flowchart and algorithm drafter to explain
                    person better how to think and code.
                </div>
            </div>

            {this.getProblem()}

            {/*home page*/}
        </div>
    );
  }
});

export default Ict;
