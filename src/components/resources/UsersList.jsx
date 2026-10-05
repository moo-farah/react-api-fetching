import { useEffect, useState } from "react"

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery)
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUsers() {
            try {
                setLoading(true);
                setError(null);
            } catch (error) {
                
            }
        }
    })
  return (
    <div>UsersList</div>
  )
}

export default UsersList