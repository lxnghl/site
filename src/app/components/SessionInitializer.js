"use client";

// components/SessionInitializer.js
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { initSessionAtom } from '../atoms/authAtoms';

const SessionInitializer = () => {
  const initializeSession = useSetAtom(initSessionAtom);

  useEffect(() => {
    initializeSession(); // Initialize session on mount
  }, [initializeSession]);

  return null; // This component only triggers the initialization
};

export default SessionInitializer;
