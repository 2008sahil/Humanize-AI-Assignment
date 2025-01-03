import React from 'react';
import { GitHubRepo } from '../types/github';
import styles from './RepoList.module.css';

interface RepoListProps {
  repos: GitHubRepo[];
  onRepoClick: (repo: GitHubRepo) => void;
}

export const RepoList: React.FC<RepoListProps> = ({ repos, onRepoClick }) => {
  return (
    <div className={styles.repoList}>
      {repos.map(repo => (
        <div
          key={repo.id}
          className={styles.repoItem}
          onClick={() => onRepoClick(repo)}
        >
          <h3>{repo.name}</h3>
          {repo.description && <p>{repo.description}</p>}
          <div className={styles.repoStats}>
            {repo.language && <span>{repo.language}</span>}
            <span>⭐ {repo.stargazers_count}</span>
            <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};