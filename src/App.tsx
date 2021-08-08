import UserSearcher from "./components/UserSearcher";
import UserDetails from "./components/UserDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

type User = {
  avatar_url: string;
  html_url: string;
  login: string;
};

const App = () => {
  const [users, setUsers] = useState<User | string>("");
  const [val, setVal] = useState<string>("");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserSearcher
            users={users}
            setUsers={setUsers}
            val={val}
            setVal={setVal}
          />
        </Route>
        <Route path="/users/:username" component={UserDetails} />
      </Switch>
    </Router>
  );
};

export default App;
