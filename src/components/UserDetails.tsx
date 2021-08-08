import { getUserDetails, getUserRepo, getUserRepos } from "../api/api-github";
import { useEffect, useState} from "react";


type Repos = {
  avatar_url: string,
  html_url: string,
  name: string,
  forks: string,
  stargazers_count: string,
}

const UserDetails = (props : any) => {
  const username : string = props.match.params.username;

  const [user, setUser] = useState<any>("");
  const [userRepos, setUserRepos] = useState<any>("");

  const search = (val : string): void => {
    if (!val) return;

    getUserRepo(username, val).then((res) => {
      setUserRepos(res.data.items);
    });
  };

  const renderUserRepos = (): JSX.Element => {
    if (!userRepos) return (<></>);

    return userRepos.map((repo : Repos) => {
      return (
        <a
          key={repo.html_url}
          className="user__repo"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          <div className="user__repo__name">{repo.name}</div>
          <div className="user__repo__info">
            <div className="user__repo__forks">{repo.forks} Forks</div>
            <div className="user__repo__stars">
              {repo.stargazers_count} Stars
            </div>
          </div>
        </a>
      );
    });
  };

  useEffect(() => {
    getUserDetails(username).then((res) => setUser(res.data));
    getUserRepos(username).then((res) => setUserRepos(res.data));
  }, [username]);

  return (
    <div className="user">
      <h1 className="user__title">GitHub Searcher</h1>
      <div className="user__info-container">
        <div className="user__img-container">
          <img src={user.avatar_url} alt="avatar" />
        </div>
        <div className="user__info">
          <div className="user__username">Username: {user.name}</div>
          <div className="user__user-mail">
            E-mail: {user.email || "no mail"}
          </div>
          <div className="user__location">
            Location: {user.location || "no location"}
          </div>
          <div className="user__join-date">
            Since: {new Date(user.created_at).toLocaleDateString()}
          </div>
          <div className="user__followers">{user.followers} Followers</div>
          <div className="users__following">Following: {user.following}</div>
        </div>
      </div>
      <div className="user__bio">{user.bio}</div>

      <form className="user__bar">
        <input
          type="text"
          placeholder="Search for User's Repositories"
          onChange={(e) => search(e.target.value)}
        />
      </form>

      <div className="user__repos-container">{renderUserRepos()}</div>
    </div>
  );
};

export default UserDetails;
