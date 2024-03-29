import React from 'react';
import {OnResize} from 'react-window-mixins';
import FontAwesome from 'react-fontawesome';
const HomeView = React.createClass({
    mixins: [],

    getInitialState() {
        return {
            loading: false,
            error: false
        };
    },
    mixins: [ OnResize ],


    render() {
        // let slide = {
        //     width: this.state.window.width-100,
        //     height: this.state.window.height-100,
        //     background: "-webkit-linear-gradient(to left, rgba(220, 131, 114, 0.15), rgba(255, 253, 208,0.3))",
        //     background: "linear-gradient(to left, rgba(220, 131, 114, 0.15), rgba(255, 253, 208, 0.3))"
        // }
        let slide = {

            background: "-webkit-linear-gradient(90deg, rgba(220, 131, 114, 0.27), rgba(255, 253, 208,0.3))",
            background: "linear-gradient(-45deg, rgba(220, 131, 114, 0.27), rgba(255, 253, 208, 0.3))",
            marginTop: "14"
        }
        let image_panel = {
            minWidth:"200",
            background: "-webkit-linear-gradient(to left, #f4f4f4, #fff)",
            background: "linear-gradient(to left, #f4f4f4, #fff)",
            padding:"0px 20px 20px 20px",
            display:"inline-block",
            boxShadow:"0 4px 5px #AAA"
        }
        let img = {
            width:"500",
            height:"auto",
            position:"absolute",
            bottom:"0"
        }
        let icon_style = {
            textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
            margin:"3rem"
        }

        return (
            <div className="col-lg-12 home">

                    <br />

                        <div className="col-lg-12 no-padding" style={slide}>

                            <div className="col-lg-4 no-padding" style={{position:"relative",height: this.state.window.height-100}}>
                                <img src="./images/rr.png" style={img} alt="..." className="img-responsive"></img>
                            </div>

                            <div className=" col-lg-8 intro" style={{height: this.state.window.height-100}}>

                                <div className="col-lg-12" style={{position:"relative",top:"60%",transform:"translateY(-50%)"}}>

                                    <br/>
                                    <p className="text-center" style={{fontSize:"2rem"}}>
                                        Hi, my name is <span style={{fontWeight:"700"}}>Roshan Raj</span><br/>
                                    </p>
                                    <p className="text-center">

                                        I am a <mark>polymath developer</mark> currently working with &nbsp;
                                        <a className="xavient" href="https://www.telusinternational.com/">Telus International</a>, Vancouver.<br/><br/>
                                        A <b>cyclist</b>, intense lover of <b>music</b> and <b>food</b>.

                                        <br/>
                                        A Mad scientist, who dreams, experiments and crafts things.

                                        <br/> Powered by Music and Coffee.
                                    </p>
                                    <br/>
                                    <div className="col-lg-12 link_panel text-center">
                                        <a href="https://github.com/roshanraj" target="_blank">
                                            <FontAwesome
                                            className=''
                                            name='github'
                                            size='4x'
                                            style={icon_style}
                                        /></a>

                                        <a href="https://www.linkedin.com/in/roshan-raj-02382589?trk=hp-identity-name"  target="_blank">
                                            <FontAwesome
                                            className=''
                                            name='linkedin'
                                            size='4x'
                                            style={icon_style}
                                        /></a>

                                    </div>
                                </div>
                            </div>
                        </div>


            </div>
        );
    }
});

export default HomeView;
