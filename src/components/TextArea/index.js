import React from 'react'

const TextareaComponent = ({ value, name, placeholder, type, onChange }) => {
    return (
        <>
            <textarea
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

export default TextareaComponent
