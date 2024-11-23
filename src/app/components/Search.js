"use client";

import { useState } from "react";
import { supabase } from '@/lib/supabase';
import { useSetAtom } from 'jotai';
import { todoListAtom } from '../atoms/authAtoms';

const SearchComp = () => {
  const [query, setQuery] = useState("");
  const setTodoList = useSetAtom(todoListAtom);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      setTodoList([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .ilike("task", `%${query}%`); // Case-insensitive search

      if (error) {
        console.error("Error querying todos:", error);
        setTodoList([]);
        return;
      }

      setTodoList(data);
    } catch (error) {
      console.error("Unexpected error:", error);
    }

    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-gray-700 text-white rounded-full pl-4 pr-10 py-2 focus:outline-none w-full"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.35-4.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchComp;
