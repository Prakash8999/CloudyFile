import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ onChange }: { onChange: (start?: string, end?: string) => void }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const formattedStart = start ? format(start, "yyyy-MM-dd") : undefined;
    const formattedEnd = end ? format(end, "yyyy-MM-dd") : undefined;

    onChange(formattedStart, formattedEnd);
  };

  return (
    <div className="w-fit">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="yyyy-MM-dd"
        placeholderText="Select date range"
        className="border px-3 py-2 rounded w-full border-black"
        isClearable
      />
    </div>
  );
};

export default DateRangePicker;
