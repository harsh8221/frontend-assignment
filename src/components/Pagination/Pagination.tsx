import React from 'react';
import { PaginationProps } from '../../types/PaginationProps';
import styles from './pagination.module.css';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const delta = 3;
    let range = [];

    range.push(1);

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add ellipses
    const withEllipsis = [];
    let prev = 0;

    for (const i of range) {
      if (i - prev === 2) {
        withEllipsis.push(prev + 1);
      } else if (i - prev > 2) {
        withEllipsis.push('...');
      }
      withEllipsis.push(i);
      prev = i;
    }

    return withEllipsis;
  };

  return (
    <div
      className={styles.pagination}
      role='navigation'
      aria-label='Pagination'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='Previous page'>
        ←
      </button>

      {getPageNumbers().map((pageNum, index) => {
        if (pageNum === '...') {
          return (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          );
        }

        const page = pageNum as number;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? styles.active : ''}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}>
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='Next page'>
        →
      </button>
    </div>
  );
};
