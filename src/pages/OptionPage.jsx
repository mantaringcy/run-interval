import { Link, Routes, Route } from "react-router-dom";

const OptionsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-green-100 to-green-200 gap-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Choose Activity
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          to="run-walk"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md text-center"
        >
          Run / Walk
        </Link>
        <Link
          to="run"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md text-center"
        >
          Run
        </Link>
        <Link
          to="walk"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl shadow-md text-center"
        >
          Walk
        </Link>
      </div>

      <Link to="/" className="mt-6 text-blue-700 underline hover:text-blue-900">
        Back to Home
      </Link>
    </div>
  );
};

export default OptionsPage;
