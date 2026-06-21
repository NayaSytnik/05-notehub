import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({ page, setPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(event) => setPage(event.selected + 1)}
      className={css.pagination}
      activeClassName={css.active}
    />
  );
}