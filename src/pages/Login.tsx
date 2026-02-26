import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Form from '../Components/Auth/Form';
import Input from '../Components/Auth/Input';
import Button from '../Components/Auth/Button';

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const email = formData.username.includes('@')
        ? formData.username
        : `${formData.username}@pristol.app`;

      await signInWithEmailAndPassword(auth, email, formData.password);
      navigate('/admin');
    } catch {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <Form
        title="Pristol Admin"
        subtitle="Sign in with your credentials"
        onSubmit={handleSubmit}
      >
        <Input
          label="Username"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="admin"
          required
          autoComplete="username"
        />

        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <div className="text-xs text-gray-500 text-center mt-4">
          <p>@pristol.app will be appended automatically</p>
          <p className="mt-1">Example: admin → admin@pristol.app</p>
        </div>
      </Form>
    </div>
  );
};

export default Login;