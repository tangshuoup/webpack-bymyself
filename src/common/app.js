import React,{Component} from 'react';
import tang from './tang-men.png';
import RouterMap from './router/router';
import './app.scss';

class App extends Component{

	render(){
		return (
			<div className='App'>
				<img src={tang} />
				<p className='text'>一杯敬过往，一杯敬明天</p>
				<RouterMap/>
			</div>
		);
	}
}
export default App;