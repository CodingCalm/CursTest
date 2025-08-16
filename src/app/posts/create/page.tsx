import React from 'react';
import { CreatePostForm } from '@/components/posts/CreatePostForm';
import { PageContainer } from '@/components/ui/PageContainer';

export default function CreatePostPage(): React.JSX.Element {
  return (
    <PageContainer>
      <div className='max-w-3xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>
            Skapa nytt inlägg
          </h1>
          <p className='text-gray-700 text-lg leading-relaxed'>
            Dela dina tankar och idéer med samhället. Skriv tydligt och
            respektfullt för att bidra till konstruktiva diskussioner.
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-lg border border-gray-200 p-8'>
          <CreatePostForm />
        </div>
      </div>
    </PageContainer>
  );
}
