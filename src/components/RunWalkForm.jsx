import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RunWalkForm = ({ onStart }) => {
  // State to track unit selection
  const [runUnit, setRunUnit] = useState("minutes"); // "minutes" or "hours"
  const [walkUnit, setWalkUnit] = useState("minutes");

  // User Input
  const [runTime, setRunTime] = useState("");
  const [walkTime, setWalkTime] = useState("");
  const [intervals, setIntervals] = useState("");
  const [sessions, setSessions] = useState("");

  const [autoStart, setAutoStart] = useState(false); // false = No, true = Yes

  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [currentLabel, setCurrentLabel] = useState("Run"); // Run / Walk
  const [isRunning, setIsRunning] = useState(false);

  const navigate = useNavigate();

  function handleStart() {
    onStart({
      runTime,
      walkTime,
      intervals,
      sessions,
      runUnit,
      walkUnit,
      autoStart,
    });
  }

  function startRunTimer() {
    if (!runTime || !intervals) return; // make sure inputs exist

    const runSeconds = runUnit === "hours" ? runTime * 60 * 60 : runTime * 60;
    const alertBefore = Number(intervals); // interval in seconds
    setCurrentTime(runSeconds);
    setCurrentLabel("Run");
    setIsRunning(true);

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev <= 0) {
          console.log("===== RUN END =====");
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        } else if (prev === alertBefore) {
          console.log(`===== RUN ${alertBefore} SECONDS LEFT =====`);
        }
        return prev - 1;
      });
    }, 1000);
  }

  function resetBtn() {
    setRunTime("");
    setWalkTime("");
    setIntervals("");
    setSessions("");
    setRunUnit("minutes");
    setWalkUnit("minutes");
    setAutoStart(false);
  }

  // ===== HELPER FUNCTIONS =====
  function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}hr${minutes > 0 ? ` ${minutes} minutes` : ""}`;
    }

    return `${minutes} minutes`;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Run/Walk Interval Timer
      </h1>

      <div className="w-full max-w-md space-y-4">
        {/* Run input */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-200">Run</label>
          <div className="flex">
            <input
              type="number"
              placeholder="Enter run time"
              value={runTime}
              onChange={(e) => setRunTime(e.target.value)}
              className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className={`px-4 border-l rounded-r ${
                runUnit === "minutes"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() =>
                setRunUnit(runUnit === "minutes" ? "hours" : "minutes")
              }
            >
              {runUnit}
            </button>
          </div>
        </div>

        {/* Walk input */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-200">Walk</label>
          <div className="flex">
            <input
              type="number"
              placeholder="Enter walk time"
              value={walkTime}
              onChange={(e) => setWalkTime(e.target.value)}
              className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className={`px-4 border-l rounded-r ${
                walkUnit === "minutes"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() =>
                setWalkUnit(walkUnit === "minutes" ? "hours" : "minutes")
              }
            >
              {walkUnit}
            </button>
          </div>
        </div>

        {/* Interval input */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-200">
            Intervals
          </label>
          <input
            type="number"
            placeholder="Enter number of intervals"
            value={intervals}
            onChange={(e) => setIntervals(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Session input */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-200">
            Sessions
          </label>
          <input
            type="number"
            placeholder="Enter number of sessions"
            value={sessions}
            onChange={(e) => setSessions(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-200">
            Auto Start
          </label>
          <div className="flex space-x-4">
            <button
              className={`flex-1 p-2 rounded border ${
                autoStart
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setAutoStart(true)}
            >
              Yes
            </button>
            <button
              className={`flex-1 p-2 rounded border ${
                !autoStart
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setAutoStart(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={resetBtn}
          >
            Reset
          </button>

          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => navigate("/options")}
          >
            Back
          </button>

          <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
            {runTime && walkTime && sessions
              ? `Run ${runTime} ${runUnit} -> Walk ${walkTime} ${walkUnit} x ${sessions} rounds | ${formatDuration(
                  (Number(runTime) + Number(walkTime)) * Number(sessions),
                )}`
              : "Fill in Run, Walk, and Sessions to see the summary."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunWalkForm;
