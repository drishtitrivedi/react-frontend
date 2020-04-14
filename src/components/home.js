import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column pt-5">
          <main role="main" class="inner cover text-center">
            <h2 class="cover-heading">
              Please authenticate to see the detailed customer Information.
            </h2>

            <p class="lead">
              <Button variant="light">
                <Link to="/login">Login</Link>
              </Button>
            </p>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
