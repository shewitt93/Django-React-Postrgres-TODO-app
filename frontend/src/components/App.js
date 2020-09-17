import React, { Component } from "react";
import ReactDOM from "react-dom";
import Dashboard from "./todos/Dashboard";
import Header from "../components/layout/Header";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";
import TodoDelete from "./todos/TodoDelete";
import TodoEdit from "./todos/TodoEdit";
import LoginForm from "./userforms/LoginForm";
import SignupForm from "./userforms/SignupForm";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "",
      logged_in: localStorage.getItem("token") ? true : false,
      username: "",
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch("http://localhost:8000/core/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.user.username,
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/core/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
  };

  display_form = (form) => {
    this.setState({
      displayed_form: form,
    });
  };
  render() {
    let form;
    switch (this.state.displayed_form) {
      case "login":
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case "signup":
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }
    return (
      <Provider store={store}>
        <Router history={history}>
          {/* <Header /> */}
          <Switch>
            <div className="App">
              <Header
                logged_in={this.state.logged_in}
                display_form={this.display_form}
                handle_logout={this.handle_logout}
              />
              {form}
              <h3>
                {this.state.logged_in
                  ? `Hello, ${this.state.username}`
                  : "Please Log In"}
              </h3>
            </div>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/delete/:id" component={TodoDelete} />
            <Route exact path="/edit/:id" component={TodoEdit} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
