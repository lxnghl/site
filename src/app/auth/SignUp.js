"use client";

import { useState } from 'react';
import { useAtom } from 'jotai';
import { signUpAtom } from '../atoms/authAtoms';

const SignUp = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, signUp] = useAtom(signUpAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp({ email, password, redirectTo: "http://alexanghel.com/todos" });
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-6 text-black">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-black"
        />
        <button type="submit" className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-black">
        Already have an account?{" "}
        <button onClick={onToggle} className="text-indigo-500 underline">
          Sign in here!
        </button>
      </p>
    </div>
  );
};

export default SignUp;
