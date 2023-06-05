import { useRouter } from "next/navigation";
import React from "react";

const TableRow = ({ complaint, index }) => {
  const navigate = useRouter();
  const { _id, complaintType, userName, complaintAddress, createdAt, status } =
    complaint;
  return (
    <tr
      key={index}
      className="cursor-pointer bg-white border-b  hover:bg-gray-50 "
      onClick={() => navigate.push(`/complaint/${_id}`)}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
      >
        {index + 1}
      </th>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
      >
        {_id.slice(-8)}
      </td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
      >
        {complaintType}
      </td>
      <td className="px-6 py-4">{complaintAddress.slice(0, 20)}</td>
      <td className="px-6 py-4">{!userName ? "NILL" : userName}</td>
      <td className="px-6 py-4">
        {`
        ${createdAt.split("T")[0]} ${createdAt.split("T")[1].split(".")[0]}
      `}
      </td>
      <td className="px-6 py-4">
        <span
          className={`p-2  text-white rounded-lg ${
            status[status.length - 1].state === "Initiated"
              ? "bg-initiatedColor"
              : ""
          }  ${
            status[status.length - 1].state === "InProgress"
              ? "bg-inprogessColor"
              : ""
          } ${
            status[status.length - 1].state === "Completed"
              ? "bg-completedColor"
              : ""
          } ${
            status[status.length - 1].state === "Closed" ? "bg-closedColor" : ""
          }`}
        >
          {status[status.length - 1]?.state}
        </span>
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() => navigate.push(`/complaint/${_id}`)}
          className="font-bold text-[12px] uppercase text-white bg-primaryColor-500  py-1 px-3 rounded-lg hover:shadow-lg transition-all"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
