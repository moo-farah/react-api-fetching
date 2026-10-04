import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";

const FetchGetRequest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

 
    // Fetching data using fetch() and useEffect
    useEffect(() => {
        const fetchDataPosts = async() => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=8`);
                if (!response.ok) {
                    throw new Error(`HTPP error: Status ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setData(data);
                setError(null);
            } catch (err) {
                setError(err.message)
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDataPosts();
    }, [])
  return (
    <div className="flex">
        <div className="w-52 sm:w-80 flex justify-center items-center">
            {loading && (
                <div className="text-lg font-semibold">Loading posts...</div>
            )}
            
            {error && <div className="text-red-500">{error}</div>}
           
        <ul>
            {data && 
            data.map(({id, title}) => (
                <li key={id} 
                    className="border-b border-gray-100 text-sm sm:text-base"
                >
                    <NavLink 
                       className={({ isActive }) => {
                        const baseClasses = 'p-4 block hover:bg-gray-100';
                        return isActive
                          ? `${baseClasses} bg-gray-100`
                          : baseClasses;
                      }}
                      to={`/posts/${id}`}
                    >
                      {title}
                        
                    </NavLink>
                </li>
            ))
            }
        </ul>
        </div>

        <div className="bg-gray-100 flex-1 p-4 min-h-550px">
            Single posts here...
        </div>
    </div>
  )
}

export default FetchGetRequest