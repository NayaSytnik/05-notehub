import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteList.module.css';

import type { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>

          {/* ❗ FIX: tag обязателен */}
          <span>{note.tag}</span>

          <button onClick={() => mutation.mutate(note.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}