import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoDisplay from './components/RepoDisplay.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount () {
    axios.get('/repos')
    .then(data => {
      this.setState({
        repos: data.data
      })
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    axios.post('/user', {term})
    .then((data) => {
      this.setState({
        repos: data.data
      })
      console.log(this.state.repos)
    })
    .catch((err) => {
    console.log(err)
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <RepoDisplay repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));