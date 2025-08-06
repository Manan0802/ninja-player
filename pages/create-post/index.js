// pages/create-post/index.js

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Form from '@/components/CreatePost/Form';

function CreatePostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  if (status === 'loading') return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-4 py-10">
      <Form userEmail={session?.user?.email} />
    </div>
  );
}

export default CreatePostPage;
