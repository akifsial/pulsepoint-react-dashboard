import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import React from "react";
import { Person } from "./types";
import DropdownActions from "@components/Dashboardcomponents/dropdownactions/dropdownactions";

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
  const handleRowSelect = (row: Person) => {};

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
          actions={(row) => <DropdownActions />}
        />
      </div>
    </div>
  );
};

export default Users;
