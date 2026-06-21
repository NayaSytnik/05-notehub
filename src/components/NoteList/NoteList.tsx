import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteList.module.css';

import { fetchNotes, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';

interface Props {
  page: number;
  search: string;
}

export default function NoteList({ page, search }: Props) {
  const queryClient = useQueryClient();
  const perPage = 12;

  const { data } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const notes: Note[] = data?.notes ?? [];

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>

          <button
            onClick={() => deleteMutation.mutate(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}