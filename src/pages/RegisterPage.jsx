import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import PropTypes from 'prop-types';

export function RegisterPage({ onSubmit, isLogin }) {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            {!isLogin && (
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            )}
            <Button type="submit" fullWidth>
                {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
        </form>
    );
}

AuthForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
};