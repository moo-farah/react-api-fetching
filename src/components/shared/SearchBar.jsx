import { useEffect, useState } from "react"
import { X } from "lucide-react"

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
    <div className="relative w-full max-w-md">
      <input 
        type="search" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full max-w-md px-4 py-2 pr-10 mb-6 bg-slate-300 outline-none rounded-4xl appearance-none"
        style={{ WebkitSearchCancelButton: 'none' }}
      />
      
      {value && (
        <button 
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-400 rounded-full transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
