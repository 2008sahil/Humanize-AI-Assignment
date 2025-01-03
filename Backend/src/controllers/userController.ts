import { Request, Response } from "express";
import { User, IUser } from "../models/userModel";
import { fetchGitHubUser, fetchGitHubFollowers, fetchGitHubFollowing } from "../services/githubService";

export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      const gitHubData = await fetchGitHubUser(username);
      user = await User.create({
        username: gitHubData.login,
        name: gitHubData.name,
        location: gitHubData.location,
        blog: gitHubData.blog,
        bio: gitHubData.bio,
        followers: gitHubData.followers,
        following: gitHubData.following,
        public_repos: gitHubData.public_repos,
        public_gists: gitHubData.public_gists,
        avatar_url: gitHubData.avatar_url,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Add more controller methods here
