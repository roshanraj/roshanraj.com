import React from 'react';

const Menias = React.createClass({

  getDefaultProps() {
    return {
      message: 'There was an error loading data.'
    };
  },

  shouldComponentUpdate() {
    return false;
  },

  getHomePage(){
    return (
        <div>
            <div className="row divider_strip">
                <div className="col-md-12 col-height text-center">
                    <h3><b>Homepage</b></h3>
                </div>
            </div>


            {/*menily blood page*/}
            <div className="row strip">
                <div className="col-md-6 col-height">

                    <img className="side_img side_img_menily" src="../images/menias/thumb.png"  />

                </div>
                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                         Story for hooking visitor on page begins with the home page. Animation and properly laid design can play magic.
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>Animation</a></li>
                            <li><a>Js</a></li>
                            <li><a>On boading</a></li>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
  },
  getOnboadingPage(){
        return (
            <div>
                <div className="row divider_strip">
                    <div className="col-md-12 col-height text-center">
                        <h3><b>Onboading Page</b></h3>
                    </div>
                </div>

                {/*benifits page*/}
                <div className="row strip">
                    <div className="col-md-6 col-height side_panel">
                        <div className="content">
                             Challenge was to introduce with the problem and solution while user move forward with onboarding process.
                            <div className="divider"></div>
                            <div className="list-tags">
                                <li><a>Presentation</a></li>
                                <li><a>Animation</a></li>
                                <li><a>Js</a></li>

                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 col-height ">
                        <img className="side_img side_img_menily" src="../images/menias/slide1.png"  />
                    </div>

                </div>

                {/*slide page*/}
                <div className="row strip">
                    <div className="col-md-6 col-height">

                        <img className="side_img side_img_menily" src="../images/menias/slide2.png"  />

                    </div>
                    <div className="col-md-6 col-height side_panel">
                        <div className="content">
                             Visual stats make better and long lasting impact. But to achieve it you need certain level of effort.
                             Vanilla js was used to draw animation timeline. Chat.js was further customized to meet the design needs.
                            <div className="divider"></div>
                            <div className="list-tags">
                                <li><a>Animation</a></li>
                                <li><a>Js</a></li>
                                <li><a>svg</a></li>
                                <li><a>css</a></li>
                                <li><a>html</a></li>

                            </div>
                        </div>
                    </div>

                </div>


                {/*slide page*/}
                <div className="row strip">
                    <div className="col-md-6 col-height side_panel">
                        <div className="content">
                             One of the best animation developed. using css and js.
                            <div className="divider"></div>
                            <div className="list-tags">
                                <li><a>Animation</a></li>
                                <li><a>Js</a></li>

                                <li><a>css</a></li>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-height">
                        <img className="side_img side_img_menily" src="../images/menias/slide3.png"  />
                    </div>

                </div>


            </div>
        )
  },
  getSearchPage(){
    return (
        <div>
            <div className="row divider_strip">
                <div className="col-md-12 col-height text-center">
                    <h3><b>Menias Search for doctors, Hospitals and Labrories</b></h3>
                </div>
            </div>

            {/*search page*/}
            <div className="row strip">
                <div className="col-md-6 col-height">
                    <img className="side_img side_img_menily" src="../images/menias/search.png"  />
                </div>

                <div className="col-md-6 col-height side_panel">
                    <div className="content">
                        First product of Menias. It a search engine which helps patients find hospitals, Labrories and Pharmasuticals near them.
                        Current listing were from delhi only.
                        <div className="divider"></div>
                        <div className="list-tags">
                            <li><a>search engine</a></li>
                            <li><a>Js</a></li>


                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
  },
  demoButton(){
    return (<a href="/work/menias/demo" className="demobutton">demo</a>)
  },
  render() {

    return (
        <div className="" >

            <div className="row strip">
                <div className="col-md-4 col-height text-center">

                    <img className="logo" src="../images/menias/logo.png"  />

                </div>
                <div className="col-md-8 col-height intro" style={{"paddingTop":"12px"}}>
                    <span className="brand"> A </span>, healthcare startup that aimed to connect discrete healthcare bodies together. <br/>
                    Single platform for <b>Hospitals</b>, <b>Doctors</b>, <b>Labrories</b> and <b>Pharmasuticals</b>.
                </div>
            </div>
            <div className="row strip">
                <div className="col-md-12 col-height intro text-center">
                    <b>"With Great Design Comes Great Responsibility of Carving it."</b> Full stack development. Initial lauch comproised of
                        search for doctors, hospitals and Pharmasuticals in and around Delhi. Lively home page and Presentable onboarding.
                </div>
            </div>

            {this.getHomePage()}
            {this.getOnboadingPage()}
            {this.getSearchPage()}
            {this.demoButton()}



            {/*home page*/}
        </div>
    );
  }
});

export default Menias;
