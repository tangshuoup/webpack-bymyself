import React,{Component} from 'react';
import tang from './tang-men.png';
import './app.scss';

class App extends Component{

	render(){
		return (
			<div className='App'>
				<img src={tang} />
				<p className='text'>一杯敬过往，一杯敬明天</p>
			</div>
		);
	}
}
export default App;