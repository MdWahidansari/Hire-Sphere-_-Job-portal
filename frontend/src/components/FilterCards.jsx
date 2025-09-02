import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedhQuery } from "@/redux/jobSlice";

// Define filter options for jobs
const filterData = [
  {
    filterType: "Location",
    array: ["Bangalore", "Delhi NCR", "Pune", "Hydrabad", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-42k", "42k-1lakh", "1lakh-2lakh", "2lakh-5lakh"],
  },
];

const FilterCards = () => {
  const [selectedValue, setSelectedValue] = useState(""); // Track selected filter
  const dispatch = useDispatch();

  // Update selected filter value
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  // Dispatch selected filter to Redux store whenever it changes
  useEffect(() => {
    dispatch(setSearchedhQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      {/* Filter section title */}
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {/* Render radio groups for each filter category */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;

              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <label htmlFor={itemId}>{item}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCards;
