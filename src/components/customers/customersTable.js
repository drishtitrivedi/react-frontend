import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

class CustomersTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { customerslist } = this.props;
    return (
      <Table responsive className="mt-2">
        <thead>
          <tr>
            <th
              onClick={() => this.raiseSort("customerNumber")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Customer # <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th
              onClick={() => this.raiseSort("customerName")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Customers Name <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th
              onClick={() => this.raiseSort("contactFirstName")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Contact Name <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th>Phone</th>
            <th
              onClick={() => this.raiseSort("city")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Location <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th
              onClick={() => this.raiseSort("officeLocation")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Office <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {customerslist.map((customer) => (
            <tr key={customer.customerNumber}>
              <td className="text-center">{customer.customerNumber}</td>
              <td>
                <Link to={`/orderdetails/${customer.customerNumber}`}>
                  {customer.customerName}
                </Link>
              </td>
              <td>
                {customer.contactFirstName} {customer.contactLastName}
              </td>
              <td> {customer.phone}</td>
              <td>
                {customer.city} , {customer.country}
              </td>
              <td>{customer.officeLocation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default CustomersTable;
