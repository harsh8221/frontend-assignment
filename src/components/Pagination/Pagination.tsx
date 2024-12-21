import React from 'react';
import { PaginationProps } from '../../types/PaginationProps';
import styles from './pagination.module.css';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div
      className={styles.pagination}
      role='navigation'
      aria-label='Pagination'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='Previous page'>
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? styles.active : ''}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}>
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='Next page'>
        Next
      </button>
    </div>
  );
};

export default Pagination;
