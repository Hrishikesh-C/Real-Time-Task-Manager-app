import React from "react";
import { 
  MdAdminPanelSettings, 
  MdKeyboardDoubleArrowUp, 
  MdKeyboardArrowUp, 
  MdKeyboardArrowDown 
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import clsx from "clsx";
import { summary } from "../assets/data";
import { Chart } from "../components/Chart";
import moment from "moment";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp className="text-red-500" />,  
  medium: <MdKeyboardArrowUp className="text-yellow-400" />,  
  low: <MdKeyboardArrowDown className="text-green-500" />, 
};

const TaskTable = ({ tasks }) => {
  const TableHeader = () => (
    <thead className="border-b border-gray-700">
      <tr className="text-gray-300 text-left">
        <th className="py-3">Task Title</th>
        <th className="py-3">Priority</th>
        <th className="py-3">Team</th>
        <th className="py-3 hidden md:block">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-700 text-gray-300 hover:bg-gray-800">
      <td className="py-3 text-white">{task.title}</td>
      <td className="py-3 flex items-center gap-2">{ICONS[task.priority]} <span>{task.priority}</span></td>
      <td className="py-3">{task.team?.join(", ") || "N/A"}</td>
      <td className="py-3 hidden md:block text-gray-400">{moment(task?.date).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-2/3 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-800">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {tasks?.length > 0 ? tasks.map((task, id) => <TableRow key={id} task={task} />) : (
            <tr><td className="py-3 text-gray-400 text-center" colSpan="4">No tasks available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className="border-b border-gray-700">
      <tr className="text-gray-300 text-left">
        <th className="py-3">Full Name</th>
        <th className="py-3">Status</th>
        <th className="py-3">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-700 text-gray-300 hover:bg-gray-800">
      <td className="py-3">{user.name}</td>
      <td className="py-3">
        <p className={clsx("w-fit px-3 py-1 rounded-full text-sm", user?.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white")}>{user?.isActive ? "Active" : "Disabled"}</p>
      </td>
      <td className="py-3 text-gray-400">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 bg-gray-900 h-fit p-5 shadow-lg rounded-lg border border-gray-800">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {users?.length > 0 ? users.map((user, index) => <TableRow key={index} user={user} />) : (
            <tr><td className="py-3 text-gray-400 text-center" colSpan="3">No users available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const totals = summary?.tasks || {};
const stats = [
  { label: "TOTAL TASK", total: summary?.totalTasks || 0, icon: <FaNewspaper />, bg: "bg-gradient-to-r from-pink-600 to-purple-600" },
  { label: "COMPLETED TASK", total: totals["completed"] || 0, icon: <MdAdminPanelSettings />, bg: "bg-gradient-to-r from-green-600 to-teal-600" },
  { label: "TASK IN PROGRESS", total: totals["in progress"] || 0, icon: <LuClipboardList />, bg: "bg-gradient-to-r from-yellow-600 to-orange-600" },
  { label: "TODOS", total: totals["todo"] || 0, icon: <FaArrowsToDot />, bg: "bg-gradient-to-r from-blue-600 to-indigo-600" },
];

const Card = ({ label, count, bg, icon }) => (
  <div className="w-full h-32 bg-gray-900 p-5 shadow-lg rounded-lg flex items-center justify-between border border-gray-800">
    <div className="flex flex-col">
      <p className="text-gray-300 text-sm font-medium">{label}</p>
      <span className="text-3xl font-semibold text-white">{count}</span>
    </div>
    <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center text-white", bg)}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col py-6 px-6 bg-gray-950 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>

      <div className="w-full bg-gray-900 mt-8 p-6 rounded-lg shadow-lg border border-gray-800">
        <h4 className="text-lg font-semibold text-gray-300 mb-4">Chart by Progress or Priority</h4>
        <Chart />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 py-8">
        <TaskTable tasks={summary.last10Task || []} />
        <UserTable users={summary.users || []} />
      </div>
    </div>
  );
};

export default Dashboard;