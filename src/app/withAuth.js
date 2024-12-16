import { useAtom } from 'jotai';
import { userAtom } from './atoms/authAtoms';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [user] = useAtom(userAtom);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false); // Track if component is mounted on the client

    useEffect(() => {
      // Ensure this runs only on the client
      setIsMounted(true);

      if (isMounted && !user) {
        // Redirect to the sign-in page if the user is not authenticated
        router.push('/auth');
      }
    }, [user, router, isMounted]);

    // If there's no user and component isn't mounted, don't render the page (avoids flicker)
    if (!isMounted || !user) {
      return <div>Loading...</div>; // Simple loading state // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
