import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// api
import api from '../../services/api';
// styled components
import Container from '../../components/Container/index';
import DefaultButton from '../../components/DefaultButton/index';
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';

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
    filters: [
      { state: 'all', label: 'All', active: true },
      { state: 'open', label: 'Open', active: false },
      { state: 'closed', label: 'Closed', active: false },
    ],
    filterIndex: 0,
    page: 1,
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

  // load all issues
  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repo);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });
    this.setState({ issues: response.data });
  };

  handleButtonFilterClick = async filterIndex => {
    await this.setState({ filterIndex, page: 1 });
    this.loadIssues();
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
    this.loadIssues();
  };

  render() {
    const { repos, issues, loading, filterIndex, page, filters } = this.state;

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
          <IssueFilter active={filterIndex}>
            {filters.map((filter, index) => (
              <DefaultButton
                key={filter.label}
                onClick={() => this.handleButtonFilterClick(index)}
                active={filter.active}
              >
                {filter.label}
              </DefaultButton>
            ))}
          </IssueFilter>

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
        <PageActions>
          <DefaultButton
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </DefaultButton>
          <span>Página {page}</span>
          <DefaultButton onClick={() => this.handlePage('next')}>
            Próximo
          </DefaultButton>
        </PageActions>
      </Container>
    );
  }
}
