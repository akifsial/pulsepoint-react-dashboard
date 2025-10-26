import { useState } from "react";
import SortIcon from "@assets/media/svgs/dashboard-svgs/sortIcon.svg";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";

import TableSkeletonLoader from "@components/loaders/table-skeleton-loader";
import { TanDataTableProps } from "./types";

const TanDataTable = <T extends object>({
  columns,
  data,
  showCheckbox = false,
  onRowSelect = () => {},
  actions = () => null,
  showActions = false,
  isLoading = false,
  onSortClick,
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
    data: data ?? [],
    columns: baseColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <TableSkeletonLoader />;

  return (
    <div className={`${className}`}>
      <div
        className="relative  w-full overflow-x-auto"
        style={
          {
          }
        }
      >
        <div
          className="min-w-full"
          style={{
            overflowX: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#a0aec0 transparent",
          }}
        >
          <div
            className={`relative md:w-full md:max-w-[400px] min-w-full sm:w-143 w-[100px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500 ${className}`}
          >
            <table className="w-full whitespace-nowrap text-sm text-left">
              <thead className="bg-[var(--primary-color)] text-[#252525]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const colDef = columns.find(
                        (c) => c.accessor === header.column.id
                      );

                      return (
                        <th
                          key={header.id}
                          style={{ width: colDef?.width || "auto" }}
                          className={`px-4 py-4 font-medium text-[#252525] ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="flex items-center gap-1">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {header.column.getCanSort() && (
                              <span
                                className="ml-1 text-xs"
                                onClick={onSortClick}
                              >
                                <img src={SortIcon} alt="sort" />
                              </span>
                            )}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

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
                      {row.getVisibleCells().map((cell) => {
                        const colDef = columns.find(
                          (c) => c.accessor === cell.column.id
                        );
                        return (
                          <td
                            key={cell.id}
                            style={{ width: colDef?.width || "auto" }}
                            className="px-4 py-5 "
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TanDataTable;
