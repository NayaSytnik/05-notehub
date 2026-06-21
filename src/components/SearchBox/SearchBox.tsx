import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const debounced = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 400);

  return (
    <input
      className={css.input}
      placeholder="Search notes"
      onChange={(e) => debounced(e.target.value)}
    />
  );
}