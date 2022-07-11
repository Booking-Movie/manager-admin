export const Button = ({ type, icon, disabled, children, className, onClick }) => {
    return icon ? (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center gap-4 ${className}`}
        >
            {children}
        </button>
    ) : (
        <button type={type} disabled={disabled} onClick={onClick} className={`${className}`}>
            {children}
        </button>
    );
};
