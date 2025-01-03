import React from 'react';
import { GitHubUser } from '../types/github';
import styles from './FollowersList.module.css';

interface FollowersListProps {
  followers: GitHubUser[];
  onFollowerClick: (username: string) => void;
  onBack: () => void;
}

export const FollowersList: React.FC<FollowersListProps> = ({
  followers,
  onFollowerClick,
  onBack,
}) => {
  return (
    <div className={styles.followersList}>
      <button onClick={onBack} className={styles.backButton}>
        ← Back to Repositories
      </button>
      <h2>Followers</h2>
      <div className={styles.grid}>
        {followers.map((follower) => (
          <div
            key={follower.login}
            className={styles.followerCard}
            onClick={() => onFollowerClick(follower.login)}
          >
            <img
              src={follower.avatar_url}
              alt={follower.login}
              className={styles.avatar}
            />
            <h3>{follower.login}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};