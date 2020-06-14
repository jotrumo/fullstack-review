import React from 'react';
import Repo from './Repo.jsx';

const RepoDisplay = (props) => {

  const listOfRepos = props.repos.map(repo => (
    <Repo key={repo._id} repo={repo}/>
  ));

  return(
    <div>
      <h4>Top 25 Repos</h4>
      <ul>{listOfRepos}</ul>
    </div>
  );
};

export default RepoDisplay;