'use client';

import React, { useState, useEffect } from 'react';
import { ForslagCard } from '@/components';
import { LoadingSpinner } from '@/components/ui';
import { Forslag } from '@/types/post';

export default function PropositionsPage(): React.JSX.Element {
  const [forslag, setForslag] = useState<Forslag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForslag = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Fetching all forslag from API...');

        const response = await fetch('/api/forslag');
        if (!response.ok) {
          throw new Error('Failed to fetch forslag');
        }

        const data = await response.json();
        const fetchedForslag = data.forslag || [];

        console.log('📊 Fetched forslag from API:', fetchedForslag.length);

        setForslag(fetchedForslag);
      } catch (err) {
        setError('Kunde inte ladda förslag');
        console.error('Error loading forslag:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForslag();
  }, []);

  if (loading) {
    return (
      <div className='bg-gray-50 min-h-screen'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <div className='text-center py-8'>
            <LoadingSpinner message='Laddar förslag...' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-gray-50 min-h-screen'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <div className='text-center py-8'>
            <p className='text-red-600'>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='space-y-6'>
          {forslag.map(forslag => (
            <ForslagCard
              key={forslag.id}
              id={forslag.id}
              title={forslag.title}
              introduction={forslag.introduction}
              summary={forslag.summary}
              background={forslag.background}
              arguments={forslag.arguments}
              conclusion={forslag.conclusion}
              originalPostId={forslag.originalPostId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
