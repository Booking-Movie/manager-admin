import { useEffect, useState } from "react"

const InputSearch = ({ onSearchSubmit, clearResults, searchName }) => {
    const [term, setTerm] = useState('')
    useEffect(() => {
        if (term !== '') {
            onSearchSubmit(term)
        } else {
            clearResults(term)
        }
    }, [term, onSearchSubmit, clearResults])
    return (
        <>
            <input
                type="search"
                className="input-search"
                onChange={e => setTerm(e.target.value)}
                value={term}
                placeholder={searchName}
                aria-label="Search"
                aria-describedby="button-addon2"
            />
        </>
    )
}

export default InputSearch