import React from "react";
import { UseFormRegister, Control, Controller } from "react-hook-form";

interface DayPickerProps {
  startDay: string;
  endDay: string;
  setStartDay: (day: string) => void;
  setEndDay: (day: string) => void;
  control: Control<any>; 
}

const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const StartEndDay: React.FC<DayPickerProps> = ({
  startDay,
  endDay,
  setStartDay,
  setEndDay,
  control,
}) => {

  return (
    <div className="flex flex-col gap-4 sm:mb-0 mb-6 sm:p-4 max-w-md">
      <div className="flex flex-col w-full">
        <label className="mb-1 font-medium text-gray-700">Start Day</label>
        <Controller
          name="startDay"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={startDay} 
              onChange={(e) => {
                field.onChange(e.target.value);
                setStartDay(e.target.value);
              }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Start Day</option>
              {dayOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="flex flex-col w-full">
        <label className="mb-1 font-medium text-gray-700">End Day</label>
        <Controller
          name="endDay"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={endDay}
              onChange={(e) => {
                field.onChange(e.target.value);
                setEndDay(e.target.value);
              }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select End Day</option>
              {dayOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    </div>
  );
};

export default StartEndDay;
