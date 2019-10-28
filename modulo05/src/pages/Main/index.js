import React, { Component } from 'react';
// icones
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
// link para navegacao
import { Link } from 'react-router-dom';
// api
import api from '../../services/api';
// styled components
import Container from '../../components/Container/index';

import { Form, SubmitButton, List, ErrorMessage } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repos: [],
    loading: false,
    error: null,
    errMsg: '',
  };

  // carrega os dados dos repos do local storage do navegador
  componentDidMount() {
    const repos = localStorage.getItem('repos');

    if (repos) {
      this.setState({
        repos: JSON.parse(repos),
      });
    }
  }

  // salva os dados no local storage do navegador
  componentDidUpdate(_, prevState) {
    const { repos } = this.state;

    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { newRepo, repos } = this.state;
      const response = await api.get(`/repos/${newRepo}`);
      const { status } = response;
      console.log(status);

      if (newRepo === '') throw new Error('Invalid Repository');

      const hasRepo = repos.find(r => r.name === response.data.full_name);

      if (hasRepo) throw new Error('Duplicated Repository');

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repos: [...repos, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errMsg: error.response ? error.response.data.message : error.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repos, loading, error, errMsg } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Add Repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        {error && (
          <ErrorMessage>
            <p>{errMsg}</p>
          </ErrorMessage>
        )}

        <List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
