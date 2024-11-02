import { atom } from 'jotai';
import { supabase } from '../../lib/supabase';

// Atom to store user session
export const userAtom = atom(null);

// Atom to sign up the user
export const signUpAtom = atom(
  (get) => get(userAtom),
  async (get, set, { email, password }) => {
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password
      }
    );
    if (error) {
      throw error;
    }
    set(userAtom, data.user);
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
