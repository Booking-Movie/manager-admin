const Select = ({ value, name, placeholder, onChange, children, defaultValue, isMultiple, isTouch }) => {
    return (
        <select
            defaultValue={defaultValue}
            value={value}
            name={name}
            className="self-stretch border-2 font-semibold rounded-lg p-3"
            placeholder={placeholder}
            onChange={onChange}
        >
            {children}
        </select>
    )
}
export default Select
