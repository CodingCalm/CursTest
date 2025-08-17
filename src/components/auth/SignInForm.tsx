'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormInput } from '@/components/ui';
import { Button } from '@/components/ui';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /**
   * Handle form submission with proper error handling
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Felaktig email eller lösenord');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setError('Ett fel uppstod. Försök igen.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input changes with validation
   */
  const handleInputChange =
    (field: 'email' | 'password') =>
    (value: string): void => {
      if (field === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
      setError('');
    };

  /**
   * Validate form before submission
   */
  const isFormValid = (): boolean => {
    return !!(email.trim() && password.trim());
  };

  return (
    <div className='max-w-md mx-auto mt-8'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
          Logga in
        </h1>

        {error && (
          <div
            className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'
            role='alert'
            aria-live='polite'
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4' noValidate>
          <FormInput
            id='email'
            label='Email'
            type='email'
            value={email}
            onChange={handleInputChange('email')}
            required
            placeholder='din@email.se'
            autoComplete='email'
            disabled={isLoading}
          />

          <FormInput
            id='password'
            label='Lösenord'
            type='password'
            value={password}
            onChange={handleInputChange('password')}
            required
            placeholder='Ditt lösenord'
            autoComplete='current-password'
            disabled={isLoading}
          />

          <Button
            type='submit'
            variant='primary'
            size='lg'
            disabled={!isFormValid() || isLoading}
            loading={isLoading}
            className='w-full'
            aria-label={isLoading ? 'Loggar in...' : 'Logga in'}
          >
            {isLoading ? 'Loggar in...' : 'Logga in'}
          </Button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Har du inget konto?{' '}
            <Link
              href='/auth/signup'
              className='text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline'
            >
              Registrera dig
            </Link>
          </p>
        </div>

        <div className='mt-4 p-4 bg-gray-50 rounded-md'>
          <h3 className='text-sm font-medium text-gray-900 mb-2'>
            Test-konton:
          </h3>
          <div className='text-xs text-gray-600 space-y-1'>
            <p>
              <strong>Vanlig användare:</strong> test@example.com / password
            </p>
            <p>
              <strong>Admin:</strong> admin@example.com / password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
