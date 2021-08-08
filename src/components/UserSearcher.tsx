import { getUsers } from "../api/api-github";
import { Link } from "react-router-dom";
import React from "react";

type UserProps = {
  users: any;
  setUsers: any;
  val: string;
  setVal: any;
};

type User = {
  avatar_url: string;
  html_url: string;
  login: string;
};

const UserSearcher = ({
  users,
  setUsers,
  val,
  setVal,
}: UserProps): JSX.Element => {
  const search = (val: string): void => {
    setVal(val);
    if (!val) return;
    getUsers(val).then((res) => {
      setUsers(res.data);
    });
  };

  const renderUsers = (): JSX.Element => {
    if (!users.items) return <></>;

    return users.items.map((user: User) => {
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
          <div className="search__repos-count">Repo:</div>
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
