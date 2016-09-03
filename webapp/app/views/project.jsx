import React from 'react';
import LoadingIndicator from '../components/loadingIndicator';
import LoadingError from '../components/loadingError';
import Work from '../components/work/work'

const ProjectView = React.createClass({

    getInitialState() {
        return {
            people: null,
            loading: false,
            error: false,
            work:[]
        };
    },

    /**
     * When component is about to mount, call ajax for data
     */
    componentWillMount() {
        this.fetchData();
    },

    /**
     * Get list of persons from some api through ajax call
     */
    fetchData(){
        if (this.state.loading) {
            // this is already called and is-in-progress.
            return;
        }
        this.setState({
            loading: true
        });

        var _this = this;

        jQuery.getJSON( "../data/work.json", function( data, err ) {
            console.log(data)
            console.log(data.work)
            _this.setState({
                work:data.work,
                loading: false,
                error: false
            });
        });

        // jQuery.ajax({
        //     type: 'GET',
        //     url: "https://randomuser.me/api/?results=50",
        //     dataType: "json",
        //     cache: false,
        //     success: (data) => {
        //         // When we have data, just set in component's state, render will automatically triggered
        //         console.log(data);
        //         _this.setState({
        //             people: data.results,
        //             loading: false,
        //             error: false
        //         });
        //     },
        //     error: (xhr, responseText, data) => {
        //         console.log('Error' + responseText);
        //         _this.setState({
        //             people: null,
        //             loading: false,
        //             error: true
        //         });
        //     }
        // });
    },

    /**
     * Calling refresh will trigger ajax call to fetch data
     */
    refresh(){
        this.fetchData();
    },

    getPeopleFragment(){
        let fragmentElem = null;
        let _this = this;

        function toTitleCase(str) {
            // Util function
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

        if(this.state.work==null){
            fragmentElem = (
                <div className="col-sm-12">
                    <h4>Sorry, could not find any people. Why dont you try after sometime?</h4>
                    <a href="#" onClick={this.refresh}>Try again</a>
                </div>
            );
        }else{
            fragmentElem = (
                <div className="col-sm-12">
                    {this.state.work.map(function(work_details, index){
                        return (
                            <Work name={work_details.name} key={index} image={work_details.image} route={work_details.link}/>
                        )})}
                </div>
            );
        }
        return fragmentElem;
    },

    render() {
        let elem = "";
        if(this.state.loading){
            elem = (
                <LoadingIndicator/>
            );
        }else if(this.state.error){
            elem = (
                <LoadingError onRetry={this.fetchData}/>
            );
        }else{
            elem = this.getPeopleFragment();
        }

        return (
            <div className="container">
                <div className="row">
                    <h3></h3>
                    <br />
                    {elem}
                </div>
            </div>
        );
    }
});

export default ProjectView;
