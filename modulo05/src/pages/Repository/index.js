import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// api
import api from '../../services/api';
// styled components
import Container from '../../components/Container/index';
import { Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repos: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);
    // faz as requisicoes ao mesmo tempo
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        state: 'open',
        per_page: 5,
      }),
    ]);

    this.setState({
      repos: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repos, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando ...</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Back to repos</Link>
          <img src={repos.owner.avatar_url} alt={repos.owner.login} />
          <h1>{repos.name}</h1>
          <p>{repos.description}</p>
        </Owner>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
