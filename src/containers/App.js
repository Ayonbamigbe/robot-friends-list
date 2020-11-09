import React,  {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { Loading } from '../components/LoadingComponent';
import { FadeTransform } from 'react-animation-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield: ''
			} 
		}

		componentDidMount(){
			fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users => this.setState({robots: users}));
			}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
		
	}
	render(){
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter(robots => { 
			return robots.name.toLowerCase().includes(searchfield.toLowerCase());
			})
		 return !robots.length ?
		 <div className="loading">
		 <h1>Loading...</h1> <Loading /> 
		 </div> :

			<TransitionGroup>
          <CSSTransition timeout={300}>
			<div className='tc'>
			<FadeTransform in
				transformProps={{
					exitTransform: 'scale(0.5) translateY(-50%)'
				}}>
				<h1 className='f1'>RoboFriends List</h1>
				<h2 className='f3'>Get in contact with some robot friends</h2>
			</FadeTransform>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
				<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
			</CSSTransition>
        </TransitionGroup>
		
	}
	}

export default App; 