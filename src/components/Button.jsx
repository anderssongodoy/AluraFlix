
export const Button = ({ text, onClick, type = 'button', className = '', disabled = false }) => {
    return (
        <button
            type={type}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
