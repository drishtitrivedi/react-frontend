import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import Pagination from "./pagination";
import { paginate } from "../../utils/paginate";

class OrderDetails extends Component {
  state = {
    customers: [],
    pageSize: 20,
    currentPage: 1,
  };

  componentDidMount() {
    fetch(`/customers/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((customers) =>
        this.setState({ customers }, () =>
          console.log("Customrt fetched ... ", customers)
        )
      );
  }

  handelPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  reset = () => {
    this.setState({ selectedOffice: "" });
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const customerslist = paginate(this.state.customers, currentPage, pageSize);

    let token = localStorage.getItem("userToken");

    return (
      <React.Fragment>
        {token === null ? <Redirect to="/login" /> : null}
        <div className="container">
          <div className="page-header d-flex justify-content-center mt-3">
            <h1>Order Details</h1>
          </div>

          <div className="row mt-4">
            <div className="col">
              <Link to="/customers">
                <Button variant="primary">All Customers</Button>
              </Link>
            </div>
          </div>

          <Table responsive className="mt-4">
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Product Line</th>
                <th>Product Vendor</th>
                <th>Total Amount Paid</th>
                <th>Order Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan="7"
                  className="col-6 text-center text-danger font-weight-bold"
                >
                  {" "}
                  {customerslist.length === 0 &&
                    "No orders found for this Customer."}
                </td>
              </tr>
              {customerslist.map((customer) => (
                <tr key={customer.productCode}>
                  <td>{customer.productCode}</td>
                  <td>{customer.productName}</td>
                  <td>{customer.productLine}</td>
                  <td>{customer.productVendor}</td>
                  <td>
                    {Math.round(customer.priceEach * customer.quantityOrdered)}
                  </td>
                  <td>{customer.status}</td>
                  <td>{customer.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            itemsCount={customerslist.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handelPageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default OrderDetails;
