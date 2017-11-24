import React from 'react';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
import Loading from '../components/loading';
import Loadable from 'react-loadable';

const Page1 =Loadable({
	loader:()=>import('../pages/page1'),
	loading:Loading,
	delay:300
})

let RouterMap=()=>{
	return(
		<Router>
			<Switch>
				<Route exact path='' component={Page1}>
				</Route>
			</Switch>
		</Router>
	)
}