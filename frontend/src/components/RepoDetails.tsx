import React from 'react';
import { GitHubRepo } from '../types/github';
import styles from './RepoDetails.module.css';

interface RepoDetailsProps {
  repo: GitHubRepo;
  onBack: () => void;
}

export const RepoDetails: React.FC<RepoDetailsProps> = ({ repo, onBack }) => {
  return (
    <div className={styles.repoDetails}>
      <button onClick={onBack} className={styles.backButton}>
        ← Back to Repositories
      </button>
      <h2>{repo.name}</h2>
      {repo.description && <p className={styles.description}>{repo.description}</p>}
      <div className={styles.stats}>
        {repo.language && <span>Language: {repo.language}</span>}
        <span>Stars: {repo.stargazers_count}</span>
        <span>Last updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewButton}
      >
        View on GitHub
      </a>
    </div>
  );
};