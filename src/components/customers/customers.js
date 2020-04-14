import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Pagination from "./pagination";
import { paginate } from "../../utils/paginate";
import ListOffices from "./listOffices";
import CustomersTable from "./customersTable";
import SearchBox from "./searchBox";
import _ from "lodash";

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 10,
    currentPage: 1,
    offices: [],
    searchQuery: "",
    selectedOffice: null,
    sortColumn: { path: "customerNumber", order: "asc" },
  };

  componentDidMount() {
    fetch("/customers/")
      .then((res) => res.json())
      .then((customers) =>
        this.setState({ customers }, () =>
          console.log("Customrt fetched ... ", customers)
        )
      );

    fetch("/offices/")
      .then((res) => res.json())
      .then((offices) =>
        this.setState({ offices }, () =>
          console.log("Customrt fetched ... ", offices)
        )
      );
  }

  handelPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  hendleOfficeSelect = (office) => {
    this.setState({ selectedOffice: office, currentPage: 1 });
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  reset = () => {
    this.setState({ selectedOffice: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedOffice: null, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedOffice,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = this.state.customers;

    if (searchQuery) {
      filtered = this.state.customers.filter((c) =>
        c.customerName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedOffice) {
      filtered = this.state.customers.filter(
        (c) => c.officeCode === selectedOffice
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customerslist = paginate(sorted, currentPage, pageSize);
    let token = localStorage.getItem("userToken");

    return (
      <React.Fragment>
        {token === null && <Redirect to="/login" />}
        <div className="container">
          <div className="page-header d-flex justify-content-center">
            <h1>Customers</h1>
          </div>

          <div className="row pt-4">
            <div className="col-sm-7 col-md-7 col-lg-7">
              <ListOffices
                items={this.state.offices}
                selectedItem={this.state.selectedOffice}
                onItemSelect={this.hendleOfficeSelect}
                reset={this.reset}
              />
            </div>
            <div className="col-sm-5 col-md-5 col-lg-5">
              <div className="row">
                <div className="col-9 ">
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                </div>
                <div className="col-3 ">
                  <p>
                    {/* Hello {token}, */}
                    <Button onClick={this.handleLogout}>Logout</Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CustomersTable
          customerslist={customerslist}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />

        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handelPageChange}
        />
      </React.Fragment>
    );
  }
}

export default Customers;
