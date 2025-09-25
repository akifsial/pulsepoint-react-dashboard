import TanDataTable from "@src/components/Dashboard-components/Tanstack-data-table/TanDataTable";
import React from "react";
import { Person } from "./types";
import DropdownActions from "@src/components/Dashboard-components/Dropdown-actions/DropdownActions";

const Users: React.FC = () => {
  const columns = [
    {
      accessor: "name",
      header: "Name",
    },
    {
      accessor: "age",
      header: "Age",
      cell: (info: any) => <i>{info.getValue()}</i>,
    },
    {
      accessor: "email",
      header: "Email",
    },
  ];
  const data: Person[] = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  ];
  const handleRowSelect = (row: Person) => {
  };

  const renderActions = (row: Person) => (
    <button onClick={() => alert(`Edit ${row.name}`)}>Edit</button>
  );

  return (
    <div>
      <div>
        <TanDataTable<Person>
          columns={columns}
          data={data}
          showCheckbox={false}
          onRowSelect={handleRowSelect}
          actions={renderActions}
          className="my-custom-class"
          actions={(row) => (
            <DropdownActions
              // onView={() => console.log("View", row.id)}
              // onEdit={() => console.log("Edit", row.id)}
              // onDelete={() => console.log("Delete", row.id)}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Users;
