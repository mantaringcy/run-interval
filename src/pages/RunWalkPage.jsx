import React, { useState } from "react";
import RunWalkForm from "../components/RunWalkForm";
import IntervalTimer from "../components/IntervalTimer";

const RunWalkPage = () => {
  const [timerData, setTimerData] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      {!timerData ? (
        <RunWalkForm onStart={(data) => setTimerData(data)} />
      ) : (
        <IntervalTimer {...timerData} onBack={() => setTimerData(null)} />
      )}
    </div>
  );
};

export default RunWalkPage;
