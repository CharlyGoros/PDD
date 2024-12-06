import React from 'react';
import PropTypes from 'prop-types';

export function Input({ label, className = '', fullWidth = true, ...props }) {
    return (
        <div className={`${fullWidth ? 'w-full' : ''}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                className={`
        w-full px-3 py-2 border border-gray-300 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        placeholder:text-gray-400
        ${className}
        `}
                {...props}
            />
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
};