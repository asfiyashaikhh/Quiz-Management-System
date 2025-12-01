
import React, { useEffect, useState, useRef } from "react";

const QuizTimer = ({ durationMinutes, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(() => Math.max(0, (durationMinutes || 0) * 60));
  const onTimeUpRef = useRef(onTimeUp);
  const intervalRef = useRef(null);
  const calledRef = useRef(false); // ensure single call

  // keep latest onTimeUp in ref
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    // reset when durationMinutes changes
    setSecondsLeft(Math.max(0, (durationMinutes || 0) * 60));
    calledRef.current = false;

    // clear any existing
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // stop interval once we reach 0 (or 1 -> 0)
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // call onTimeUp exactly once
          if (!calledRef.current) {
            calledRef.current = true;
            try {
              onTimeUpRef.current && onTimeUpRef.current();
            } catch (e) {
              // swallow errors from user handler to avoid crashing timer
              // but you can log if needed
              // console.error("onTimeUp handler error", e);
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [durationMinutes]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="alert alert-info d-flex justify-content-between">
      <span>Time Left: {mins}:{secs}</span>
    </div>
  );
};

export default QuizTimer;