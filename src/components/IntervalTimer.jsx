import React, { useState, useEffect, useRef, useCallback } from "react";

let timerStarted = false;

const IntervalTimer = ({
  runTime,
  walkTime,
  intervals,
  sessions,
  runUnit,
  walkUnit,
  autoStart,
  onBack,
}) => {
  const [currentLabel, setCurrentLabel] = useState("Run"); // Run or Walk
  const [currentTime, setCurrentTime] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(autoStart);
  const [paused, setPaused] = useState(false);
  // const [remainingSessions, setRemainingSessions] = useState(Number(sessions));
  const intervalRef = useRef(null);

  // Convert times to seconds
  /*
  const runSeconds = runUnit === "hours" ? runTime * 60 * 60 : runTime * 60;
  const walkSeconds = walkUnit === "hours" ? walkTime * 60 * 60 : walkTime * 60;
	/*/
  const runSeconds = Number(runTime); // use input as seconds
  const walkSeconds = Number(walkTime); // use input as seconds
  const runSecondsRef = useRef(Number(runTime));
  const walkSecondsRef = useRef(Number(walkTime));
  //*/

  const labelRef = useRef("Run");
  const timeRef = useRef(runSeconds);
  const sessionsRef = useRef(Number(sessions));
  const [remainingSessions, setRemainingSessions] = useState(Number(sessions)); // keep for display only

  const alertBefore = Number(intervals);

  // --- SPEECH FUNCTION ---
  const speak = (text) => {
    window.speechSynthesis.cancel(); // stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.2;
    utterance.pitch = 1.1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const playVictorySound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const notes = [523, 659, 784, 1047]; // C, E, G, C (major chord arpeggio)

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = freq;
      osc.type = "sine";

      const start = ctx.currentTime + i * 0.15;
      const end = start + 0.3;

      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.001, end);

      osc.start(start);
      osc.stop(end);
    });
  };

  const startTimerRef = useRef(null);

  const startTimer = useCallback((label, duration) => {
    clearInterval(intervalRef.current);
    labelRef.current = label;
    timeRef.current = duration;
    setCurrentLabel(label);
    setCurrentTime(duration);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      timeRef.current -= 1;
      setCurrentTime(timeRef.current);

      if (timeRef.current === alertBefore) {
        speak(`${alertBefore} seconds remaining`);
      }

      if (timeRef.current <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);

        if (labelRef.current === "Run") {
          speak("Run finished");
          startTimerRef.current("Walk", walkSecondsRef.current);
        } else {
          sessionsRef.current -= 1;
          const next = sessionsRef.current;
          setRemainingSessions(next);
          if (next > 0) {
            speak(
              `Walk finished, ${next} session${next !== 1 ? "s" : ""} left`,
            );
            startTimerRef.current("Run", runSecondsRef.current);
          } else {
            speak("All sessions finished");
            playVictorySound();
          }
        }
      }
    }, 1000);
  }, []);

  // Keep ref always pointing to latest version
  startTimerRef.current = startTimer;

  // --- PAUSE / CONTINUE ---
  const pauseContinue = () => {
    if (paused) {
      // Continue
      startTimer(currentLabel, currentTime);
      setPaused(false);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setPaused(true);
    }
  };

  // --- AUTO START EFFECT ---
  useEffect(() => {
    if (autoStart && !timerStarted) {
      timerStarted = true;
      startTimer("Run", runSecondsRef.current);
    }
    return () => {}; // ✅ don't clear on unmount, let it run
  }, []);

  // --- FORMAT TIME ---
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200 space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold">{currentLabel} Timer</h2>
      <div className="text-4xl font-mono">{formatTime(currentTime)}</div>
      <div className="text-lg">Sessions remaining: {remainingSessions}</div>

      <div className="flex space-x-4">
        {!autoStart && (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => startTimer("Run", runSeconds)}
            disabled={isRunning}
          >
            Start
          </button>
        )}

        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={pauseContinue}
          disabled={!isRunning && !paused}
        >
          {paused ? "Continue" : "Pause"}
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            onBack();
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default IntervalTimer;
