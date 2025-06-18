import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";

import { TanDataTableProps } from "./types";

const TanDataTable = <T extends object>({
  columns,
  data,
  showCheckbox = false,
  onRowSelect = () => {},
  actions = () => null,
  showActions = false,

  className = "",
}: TanDataTableProps<T>) => {
  const columnHelper = createColumnHelper<T>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const baseColumns: ColumnDef<T, any>[] = [
    ...(showCheckbox
      ? [
          columnHelper.display({
            id: "select",
            header: () => <input type="checkbox" />,
            cell: ({ row }) => (
              <input
                type="checkbox"
                onChange={() => onRowSelect(row.original)}
              />
            ),
            size: 40,
          }),
        ]
      : []),

    ...columns.map((col) =>
      columnHelper.accessor((row) => row[col.accessor], {
        id: col.accessor as string,
        header: () => col.header,
        cell: col.cell || ((info) => info.getValue()),
        enableSorting: col.showSort ?? false,
      })
    ),

    ...(showActions
      ? [
          columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
              <div className="relative">{actions(row.original)}</div>
            ),
            size: 60,
          }),
        ]
      : []),
  ];
  const table = useReactTable({
    data,
    columns: baseColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div
      className={`overflow-x-auto overflow-y-visible rounded-[4px] scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 ${className}`}
    >
      <div className="relative md:w-full sm:w-143 w-[100px]">
        <table className="md:w-full text-sm text-left">
          <thead className="bg-[var(--primary-color)] text-[#252525]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-4 py-4 whitespace-nowrap font-medium text-[#252525] ${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <span className="ml-1 text-xs">
                        {header.column.getIsSorted() === "asc"
                          ? "▲"
                          : header.column.getIsSorted() === "desc"
                          ? "▼"
                          : "⇅"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className="bg-white hover:bg-[var(--primary-color-hover-light)] transition-colors duration-200"
                style={{ borderBottom: "1px solid #2525251a" }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TanDataTable;
