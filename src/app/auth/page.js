// AuthPage.js
export const dynamic = 'force-dynamic';

"use client";

import { useState, useEffect } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/authAtoms';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Track which component to show
  const [user] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (user != null && user.last_sign_in_at == null) {
      router.push('/verify-email');
    }
    else if (user != null && user.last_sign_in_at != null) {
      router.push('/todos'); // Redirect to todos when user is set
    }
  }, [user, router]);

  return (
    <div className="flex flex-col h-[calc(100vh-128px)] items-center justify-center">
      {isSignIn ? (
        <SignIn onToggle={() => setIsSignIn(false)} />
      ) : (
        <SignUp onToggle={() => setIsSignIn(true)} />
      )}
    </div>
  );
};

export default AuthPage;
