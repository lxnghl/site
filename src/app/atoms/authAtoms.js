import { atom } from 'jotai';
import { supabase } from '../../lib/supabase';

// Atom to store user session
export const userAtom = atom(null);

// Atom to sign up the user
export const signUpAtom = atom(
  (get) => get(userAtom),
  async (get, set, { email, password, redirectTo }) => {
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      }
    );
    if (error) {
      throw error;
    }
    set(userAtom, data.user);
    // Optionally handle redirect after successful sign-up
    if (redirectTo) {
      window.location.href = redirectTo; // Redirect the user
    }
  }
);

export const signInAtom = atom(
  (get) => get(userAtom),
  async (get, set, { email, password, redirectTo }) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    set(userAtom, data.user);
    // Optionally handle redirect after successful sign-in
    if (redirectTo) {
      window.location.href = redirectTo; // Redirect the user
    }
  }
);

// Atom to sign out the user
export const signOutAtom = atom(
  (get) => get(userAtom),
  async (get, set) => {
    await supabase.auth.signOut();
    set(userAtom, null);
  }
);

// Atom to initialize the session when the app loads
export const sessionAtom = atom(null);

export const initSessionAtom = atom(
  null,
  async (get, set) => {
    const { data: { session } } = await supabase.auth.getSession();
    set(userAtom, session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      set(userAtom, session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }
);
