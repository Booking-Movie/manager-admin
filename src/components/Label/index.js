const Label = ({ children, size }) => {
    return (
        <>
            <div className={`flex w-full items-center font-semibold ${size}`} >
                <p className="font-semibold">{children}</p>
            </div>
        </>
    )
}

export default Label