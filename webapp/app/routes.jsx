import React from 'react';
import {Redirect, Route, IndexRoute, IndexRedirect} from 'react-router';

import App from './views/app';
import HomeView from './views/home';
import ProjectView from './views/project'
import RouteNotFound from './views/routeNotFound';
import WorkDetailsView from './views/workdetails';

import errorHandler from './utils/errorHandler';


/**
 * Adds trailing slash (/) to current URL
 * @param nextState
 * @param replace
 */
function appendTrailingSlash(nextState, replace) {
    let lastChar = nextState.location.pathname.slice(-1);
    if (lastChar !== '/') {
        replace(nextState, nextState.location.pathname + '/');
    }
}

let routes = (
    <Route path="/" component={errorHandler(App)}>
        <IndexRoute component={errorHandler(HomeView)}/>
        <Route path="/blog" component={errorHandler(ProjectView)}/>

            {/*<Route path="/work/menily" component={errorHandler(Menily)}/>
            <Route path="/work/menias" component={errorHandler(Menias)}/>
            <Route path="/work/angularjs-seed" component={errorHandler(AngularjsSeed)}/>
            <Route path="/work/openflush" component={errorHandler(OpenFlush)}/>
            <Route path="/work/ict" component={errorHandler(Ict)}/>*/}
            <Route path="/work" component={errorHandler(ProjectView)}>

            </Route>
            <Route path="/work/:workname" component={WorkDetailsView}/>

        <Route path="/experiments" component={errorHandler(ProjectView)}/>
        <Route path="/contact" component={errorHandler(ProjectView)}/>
        <Route path="*" component={errorHandler(RouteNotFound)} onEnter={appendTrailingSlash}/>
    </Route>
);

export default routes;
