import React from 'react';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit?: (title: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;

    if (title.trim() && onSubmit) {
      onSubmit(title.trim());
      e.currentTarget.reset();
    }
  };

  return (
    <form data-testid="task-form" onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        data-testid="task-title-input"
        className="task-title-input"
        placeholder="Enter task title..."
        required
        minLength={1}
      />
      <button
        type="submit"
        data-testid="task-submit-btn"
        className="task-submit-btn"
      >
        Add Task
      </button>
    </form>
  );
};
