import React from 'react'

const InputComponent = ({ value, name, placeholder, type, onChange }) => {
    return (
        <>
            <input
                type={type}
                value={value}
                name={name}
                className="self-stretch border-2 font-semibold rounded-lg p-[10.5px]"
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}

export default InputComponent
