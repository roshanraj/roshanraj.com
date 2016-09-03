import React from 'react';

const Menily = React.createClass({

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
        <div className="" >

            <div className="row strip">
                <div className="col-md-4 col-height text-center">

                    <img className="logo" src="../images/menily/logo.png"  />

                </div>
                <div className="col-md-8 col-height intro" style={{"paddingTop":"12px"}}>
                    <span className="brand"> A </span>, healthcare startup that aimed to connect discrete healthcare bodies together. <br/>
                    Single platform for <b>Hospitals</b>, <b>Doctors</b>, <b>Labrories</b> and <b>Pharmasuticals</b>.
                </div>
            </div>
            <div className="row strip">
                <div className="col-md-12 col-height intro text-center">
                    <b>"With Great Design Comes Great Responsibility of Carving it."</b> My first touch with font-end development.
                </div>

            </div>

            {/*menily blood page*/}
            <div className="row strip">
                <div className="col-md-6 col-height">

                    <img className="side_img side_img_menily" src="../images/menily/MenilyLife.png"  />

                </div>
                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                        <h3><b>Menily Blood</b></h3> This product was targeting blood donors and the one in need. Animation that takes place will a Donor registers himself was the most challenging part.
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>Animation</a></li>
                            <li><a>Js</a></li>
                            <li><a>On boading</a></li>
                        </div>
                    </div>
                </div>

            </div>

            {/*benifits page*/}
            <div className="row strip">
                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                        <h3><b>Landing Page</b></h3> One of the most challenging landing page development. There was an animation to get each elements moving randomly within there fencings.
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>Animation</a></li>
                            <li><a>Js</a></li>
                            <li><a>vanilla js</a></li>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-height ">
                    <img className="side_img side_img_menily" src="../images/menily/Landing.png"  />
                </div>

            </div>

            {/*home page*/}
            <div className="row strip">
                <div className="col-md-6 col-height">

                    <img className="side_img side_img_menily" src="../images/menily/benifits.png"  />

                </div>
                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                        <h3><b>Benefits Box</b></h3>Among the most challenging js job. On selection ether by mouse or keyboard. It should scroll and show the slide. Due to unavability of similar library. It was performed in vanilla js.
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>Animation</a></li>
                            <li><a>Js</a></li>
                            <li><a>vanilla js</a></li>
                        </div>
                    </div>
                </div>

            </div>


            {/*benefits page*/}
            <div className="row strip">
                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                        <h3><b>Home Page</b></h3>
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>Html</a></li>
                            <li><a>css</a></li>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-height side_panel">
                    <img className="side_img side_img_menily" src="../images/menily/home.png"  />
                </div>
            </div>

        </div>
    );
  }
});

export default Menily;
