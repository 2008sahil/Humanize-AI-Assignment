import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserInfo } from './components/UserInfo';
import { RepoList } from './components/RepoList';
import { RepoDetails } from './components/RepoDetails';
import { FollowersList } from './components/FollowersList';
import { getUser, getRepos, getFollowers } from './api/github';
import { GitHubUser, GitHubRepo } from './types/github';
import styles from './App.module.css';

type View = 'search' | 'repos' | 'repoDetails' | 'followers';

function App() {
  const [view, setView] = useState<View>('search');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [followers, setFollowers] = useState<GitHubUser[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (username: string) => {
    try {
      setError('');
      const [userData, reposData] = await Promise.all([
        getUser(username),
        getRepos(username)
      ]);
      setUser(userData);
      setRepos(reposData);
      setView('repos');
    } catch (err) {
      setError('User not found or error occurred');
    }
  };

  const handleViewFollowers = async () => {
    if (user) {
      try {
        const followersData = await getFollowers(user.login);
        setFollowers(followersData);
        setView('followers');
      } catch (err) {
        setError('Error loading followers');
      }
    }
  };

  const handleRepoClick = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setView('repoDetails');
  };

  const handleFollowerClick = (username: string) => {
    handleSearch(username);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>GitHub Explorer</h1>
        {view === 'search' && <SearchBar onSearch={handleSearch} />}
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <main className={styles.main}>
        {view === 'repos' && user && (
          <>
            <UserInfo user={user} onViewFollowers={handleViewFollowers} />
            <RepoList repos={repos} onRepoClick={handleRepoClick} />
          </>
        )}

        {view === 'repoDetails' && selectedRepo && (
          <RepoDetails
            repo={selectedRepo}
            onBack={() => setView('repos')}
          />
        )}

        {view === 'followers' && (
          <FollowersList
            followers={followers}
            onFollowerClick={handleFollowerClick}
            onBack={() => setView('repos')}
          />
        )}
      </main>
    </div>
  );
}

export default App;