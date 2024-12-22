import React from 'react';
import { PaginationProps } from '../../types/PaginationProps';
import styles from './pagination.module.css';

const rowsPerPageOptions = [5, 10, 20, 50, 100];

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems,
}) => {
  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.rowsPerPageContainer}>
        <span>Rows per page</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className={styles.rowsSelect}>
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.paginationInfo}>
        {startItem}-{endItem} of {totalItems} rows
      </div>

      <div className={styles.paginationControls}>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label='First page'
          className={styles.paginationButton}>
          ⟨⟨
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label='Previous page'
          className={styles.paginationButton}>
          ⟨
        </button>

        <div className={styles.pageInput}>
          <input
            type='number'
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page > 0 && page <= totalPages) {
                onPageChange(page);
              }
            }}
            min={1}
            max={totalPages}
          />
          <span>of {totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label='Next page'
          className={styles.paginationButton}>
          ⟩
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label='Last page'
          className={styles.paginationButton}>
          ⟩⟩
        </button>
      </div>
    </div>
  );
};