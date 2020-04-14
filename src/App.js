import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Customers from "./components/customers/customers";
import OrderDetails from "./components/customers/orderdetails";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/orderdetails/:id" component={OrderDetails} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
