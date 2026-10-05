import { useEffect, useState } from "react"

const SearchBar = ({ onSearch, placeholder = "Search..."}) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value.trim()), 400);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);
  return (
    <input 
      type="search" 
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-md px-4 py-2 mb-6 bg-neutral-200 text-black rounded-full outline-neutral-400"
      />
  )
}

export default SearchBar