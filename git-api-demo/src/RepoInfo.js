import React from 'react';
import { ClipLoader } from 'react-spinners';
import { getRepos, getUserData } from './githubApi';

class RepoInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			repositories: [],
			organisations: {},
			loading: false
		}
	}

	handleGetRepositoryButtonClick = async e => {
		if(!this.state.input.trim()) {
			return;
		}

		this.setState({loading: true});
		try {
			const repositories = await getRepos(this.state.input);
			this.setState({repositories, organisations: {}, loading: false});
		} catch (e) {
			console.log("Error occured: ", e);
		}
	}

	handleGetOrganisationsButtonClick = async e => {
		if(!this.state.input.trim()) {
			return;
		}

		this.setState({loading: true});		
		try {
			const organisations = await getUserData(this.state.input);
			this.setState({organisations, repositories: [], loading: false});			
		} catch (e) {
			console.log("Error occured: ", e);
		}
	}

	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	getInfoTemplate = (item) => {
		return (
			<ul>
  			<li key={item.id}>
  				<span className="avatar-wrapper">
  					<img src={item.avatar_url} />
  				</span>
  				<div className="info-wrapper">
	  				<span><strong>{item.repos_url ? 'Repos url:' : 'Name:'} </strong> {item.repos_url || item.name}</span>
	  				<span className="desc"><strong>{item.organizations_url ? 'Org url': 'Desc'}</strong> {item.description || item.organizations_url}</span>  				
  				</div>
  			</li>  			
			</ul>)
	}

	render() {
		if (this.state.loading) {
			return <ClipLoader />;
		}
		
		const repositoryDOM = this.state.repositories.length > 0 && this.state.repositories.map((repository) =>
			<ul className="repository-details">
				<li key={repository.id}>
					<span><strong>Name:</strong> {repository.name}</span> | 
					<span><strong> Git url:</strong> {repository.git_url}</span>
				</li>
			</ul>);

		const orgisationDOM = this.state.organisations.orgs && this.state.organisations.orgs.length > 0 && this.state.organisations.orgs.map((organisation) =>
			this.getInfoTemplate(organisation));

		const user = this.state.organisations.user;
		const userDOM = user && (
			<div className="user-details">
				<h5>User details</h5>
				{this.getInfoTemplate(user)}
			</div>);
		
		
		return (      
    	<div>
    		<input type="text" name="input" value={this.state.input} onChange={this.onChange}/>
    		<button onClick={this.handleGetRepositoryButtonClick}>Get repositories</button> 
    		<button onClick={this.handleGetOrganisationsButtonClick}>Get organisations</button>
    		<br />
    		{repositoryDOM}
    		{orgisationDOM ?
    			(<div className="org-details">
						<h5>Organisation details</h5>
    				{orgisationDOM}
  				</div>) : ('')
  			}
    		{userDOM}
    	</div>);
	}
}

export default RepoInfo;