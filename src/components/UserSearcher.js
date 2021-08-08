import { getUsers } from "../api/api-github";
import { Link } from "react-router-dom";

const UserSearcher = ({ users, setUsers, val, setVal }) => {

  const search = (val) => {
    if (!val) return;
    setVal(val);
    getUsers(val).then((res) => {
      setUsers(res.data);
    });
  };

  const renderUsers = () => {
    if (!users.items) return "";

    return users.items.map((user) => {
      return (
        <Link
          key={user.login}
          className="search__user-container"
          to={`users/${user.login}`}
        >
          <div className="search__img-container">
            <img src={`${user.avatar_url}`} alt="avatar" />
          </div>
          <div className="search__username">{user.login}</div>
          <div className="search__repos-count">Repo: {user.public_repos}</div>
        </Link>
      );
    });
  };

  return (
    <div className="search">
      <div className="search__header">
        <h1 className="search__title">GitHub Searcher</h1>
        <form className="search__bar">
          <input
            placeholder="Search for Users"
            value={val}
            onChange={(e) => {
              search(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="search__users-container">{renderUsers()}</div>
    </div>
  );
};

export default UserSearcher;
