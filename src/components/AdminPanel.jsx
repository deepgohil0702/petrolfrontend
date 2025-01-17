import { useState } from 'react';

const AdminPanel = () => {
  const [reports, setReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchReports = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/reports?date=${selectedDate}`);
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={fetchReports}
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Generate Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Date</th>
              <th className="px-6 py-3 border-b">Bill Amount</th>
              <th className="px-6 py-3 border-b">Bill Number</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b">{report.name}</td>
                <td className="px-6 py-4 border-b">{report.date}</td>
                <td className="px-6 py-4 border-b">{report.billAmount}</td>
                <td className="px-6 py-4 border-b">{report.billNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;