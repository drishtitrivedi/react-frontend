import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const ListOffices = (props) => {
  const { items, selectedItem, onItemSelect, reset } = props;
  console.log(selectedItem);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter by Office Locations
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={reset}> All cities</Dropdown.Item>
        {items.map((item) => (
          <Dropdown.Item
            className={item.officeCode === selectedItem && "active"}
            onClick={() => onItemSelect(item.officeCode)}
            key={item.officeCode}
          >
            {item.city}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ListOffices;
