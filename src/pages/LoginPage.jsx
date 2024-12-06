import React from 'react';
import { AuthForm } from './AuthForm';
import { UserRound } from 'lucide-react';

export function LoginPage() {
    const [isLogin, setIsLogin] = React.useState(true);

    const handleSubmit = (formData) => {
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log(isLogin ? 'Login:' : 'Register:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <UserRound className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
                    </p>
                </div>

                <AuthForm onSubmit={handleSubmit} isLogin={isLogin} />

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
}
