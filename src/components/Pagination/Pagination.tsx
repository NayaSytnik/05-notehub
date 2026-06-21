import type { ComponentType } from 'react';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';

import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(e) => setPage(e.selected + 1)}
      className={css.pagination}
      activeClassName={css.active}
    />
  );
}