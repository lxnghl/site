"use client";

import DailyTodoList from '../components/DailyTodoList';
import withAuth from '../withAuth';

const Todos = () => {
  return (
    <div className="flex flex-col">
      <div className="grow flex justify-center">
        <DailyTodoList />
      </div>
    </div>
  );
}

export default withAuth(Todos);