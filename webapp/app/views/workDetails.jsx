import React from 'react';
import {OnResize} from 'react-window-mixins'
import FontAwesome from 'react-fontawesome'

import Menily from '../components/work/menily';
import Menias from '../components/work/menias';
import AngularjsSeed from '../components/work/angularjsseed';
import OpenFlush from '../components/work/openflush';
import Ict from '../components/work/ict';

import errorHandler from '../utils/errorHandler';



const WorkDetailsView = React.createClass({
    mixins: [],

    getInitialState() {
        return {
            loading: false,
            error: false
        };
    },
    mixins: [ OnResize ],
    getWork(PageName){
        console.log(PageName);
        switch (PageName) {
            case "menily":
                return <Menily/>
                break;
            case "menias":
                return <Menias/>
                break;
            case "angularjs-seed":
                return <AngularjsSeed/>
                break;
            case "openflush":
                return <OpenFlush/>
                break;
            case "ict":
                return <Ict/>
                break;
            default:
                return <Menily/>
        }
    },

    render() {
        
        let page_name = this.props.params.workname;
        return (
            <div className="container workdetails" >
                {this.getWork(page_name)}
            </div>
        );
    }
});

export default WorkDetailsView;
