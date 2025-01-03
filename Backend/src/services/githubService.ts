import axios from "axios";

export const fetchGitHubUser = async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const fetchGitHubFollowers = async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}/followers`);
  return response.data;
};

export const fetchGitHubFollowing = async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}/following`);
  return response.data;
};
