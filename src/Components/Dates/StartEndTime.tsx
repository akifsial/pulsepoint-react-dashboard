import React from "react";
import { Control, Controller } from "react-hook-form";

interface StartEndTimeProps {
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  control: Control<any>; // React Hook Form control
}

const StartEndTime: React.FC<StartEndTimeProps> = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  control,
}) => {

  console.log("start",startTime)
  const generateTimes = (intervalMinutes: number = 30) => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += intervalMinutes) {
        const hour = h % 12 === 0 ? 12 : h % 12;
        const minute = m.toString().padStart(2, "0");
        const ampm = h < 12 ? "AM" : "PM";
        times.push(`${hour}:${minute} ${ampm}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimes(30);

  return (
    <div className="flex flex-col gap-4 sm:p-4 max-w-md sm:mx-auto">
      {/* Start Time */}
      <div className="flex flex-col w-full">
        <label className="mb-1 font-medium text-gray-700">Start Time</label>
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={startTime}
              onChange={(e) => {
                field.onChange(e.target.value);
                setStartTime(e.target.value);
              }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Start Time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col w-full">
        <label className="mb-1 font-medium text-gray-700">End Time</label>
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={endTime}
              onChange={(e) => {
                field.onChange(e.target.value);
                setEndTime(e.target.value);
              }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select End Time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    </div>
  );
};

export default StartEndTime;
