import UserSearcher from "./components/UserSearcher";
import UserDetails from "./components/UserDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState("");
  const [val, setVal] = useState("");

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
