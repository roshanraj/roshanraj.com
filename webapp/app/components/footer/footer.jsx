import React from 'react';
import ReactDOM  from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import FontAwesome from 'react-fontawesome';

class Footer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let icon_style = {
      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
      margin:"1rem",
      color:"#333"
    }
    return (
        <div className="col-xs-12 footer no-padding">
            <div className="col-xs-12 no-padding border"></div>
            <div className="col-xs-8">

            </div>
            <div className="col-xs-4" style={{textAlign:"end", padding:"4px"}}>
                <a href="mailto:roshanraj@live.com" target="_blank">
                    <FontAwesome
                    className=''
                    name='envelope'
                    size='2x'
                    style={icon_style}
                /></a>

                <a href="https://github.com/roshanraj" target="_blank">
                    <FontAwesome
                    className=''
                    name='github'
                    size='2x'
                    style={icon_style}
                /></a>

                <a href="https://www.linkedin.com/in/roshan-raj-02382589?trk=hp-identity-name"  target="_blank">
                    <FontAwesome
                    className=''
                    name='linkedin'
                    size='2x'
                    style={icon_style}
                /></a>
                <a href="https://www.facebook.com/roshanrajx64"  target="_blank">
                    <FontAwesome
                    className=''
                    name='facebook'
                    size='2x'
                    style={icon_style}
                /></a>
                <a href="https://twitter.com/roshanraj_rr"  target="_blank">
                    <FontAwesome
                    className=''
                    name='twitter'
                    size='2x'
                    style={icon_style}
                /></a>
            </div>
        </div>
    );
  }
}
export default Footer;
