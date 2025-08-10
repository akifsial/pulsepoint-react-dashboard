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

import TableSkeletonLoader from "@components/Loaders/TableSkeletonLoader";

import { TanDataTableProps } from "./types";

const TanDataTable = <T extends object>({
  columns,
  data,
  showCheckbox = false,
  onRowSelect = () => {},
  actions = () => null,
  showActions = false,
  isLoading = false,

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

    ...columns?.map((col) =>
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
    // data,
    data: data ?? [], // fallback to empty array if undefined
    columns: baseColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  {
    isLoading ? (
      <TableSkeletonLoader />
    ) : (
      <TanDataTable data={data} columns={columns} />
    );
  }

  return (
    <div
      className={`overflow-x-auto overflow-y-visible rounded-[4px] scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 ${className}`}
    >
      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm text-left">
          <thead className="bg-[var(--primary-color)] text-[#252525]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: columns.find((c) => c.accessor === header.id)
                        ?.width,
                    }}
                    className={`px-4 py-4 font-medium text-[#252525] ${
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
          {/* <tbody>
            {table?.getRowModel()?.rows?.map((row, idx) => (
              <tr
                key={row.id}
                className="bg-white hover:bg-[var(--primary-color-hover-light)] transition-colors duration-200"
                style={{ borderBottom: "1px solid #2525251a" }}
              >
                {row?.getVisibleCells()?.map((cell) => (
                  <td key={cell.id} className="px-2 py-5 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody> */}

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={baseColumns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white hover:bg-[var(--primary-color-hover-light)] transition-colors duration-200"
                  style={{ borderBottom: "1px solid #2525251a" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        width: columns.find(
                          (c) => c.accessor === cell.column.id
                        )?.width,
                      }}
                      className="px-2 py-5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TanDataTable;
