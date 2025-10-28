import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import exports from "@assets/media/svgs/export.svg";
import whitearrow from "@assets/media/svgs/whitearrow.svg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PrimaryButton } from "./Buttons/Commonbutton/commonbutton";

type dataTypes = {
  [key: string]: unknown;
};

type ExportTableProps = {
  data: dataTypes[];
  fileName: string;
  columnNames: string[];
  columnKeys: string[]; 
};

const ExportTable: React.FC<ExportTableProps> = ({ data, fileName, columnNames, columnKeys }) => {
  const [isExportOpen, setIsExportOpen] = React.useState(false);

  const exportToCSV = () => {
    const csvRows = [
      columnNames,
      ...data.map((item) =>
        columnKeys.map((key) => item[key] || "")
      ),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columnNames;
    const tableRows = data.map((item) =>
      columnKeys.map((key) => item[key] || "")
    );

    doc.text(`${fileName} Data`, 14, 15);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save(`${fileName}_data.pdf`);
  };

  return (
    <div>
  
      <AnimatePresence>
        {isExportOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[60px] left-[120px] bg-white shadow-md rounded-lg p-4 z-50"
          >
            <div className="flex flex-col gap-2 w-full">
              <button
                className="text-sm text-black mb-2.5"
                onClick={exportToCSV}
              >
                Export as CSV
              </button>
              <button className="text-sm text-black" onClick={exportToPDF}>
                Export as PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportTable;
