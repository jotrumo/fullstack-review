import React from 'react';

const Repo = props => {

  return (
    <li>
      <p>Name: {props.repo.name}</p>
      <p>Repo: <a href={props.repo.repo}>{props.repo.repo}</a></p>
      <p>Stars: {props.repo.stars}</p>
    </li>
  )
}

export default Repo;