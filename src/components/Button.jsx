import React from 'react';
import PropTypes from 'prop-types';

export function Button({
    children,
    className = '',
    fullWidth = false,
    variant = 'primary',
    ...props
}) {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    };

    return (
        <button
            className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
        `}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary']),
};