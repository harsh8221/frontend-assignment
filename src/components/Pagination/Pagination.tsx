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
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className={styles.paginationContainer}
      role='navigation'
      aria-label='Pagination Navigation'>
      <div
        className={styles.rowsPerPageContainer}
        role='group'
        aria-label='Rows per page selector'>
        <label htmlFor='rows-per-page'>Rows per page</label>
        <select
          id='rows-per-page'
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className={styles.rowsSelect}
          aria-label='Select number of rows per page'>
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.paginationInfo} role='status' aria-live='polite'>
        Showing {startItem}-{endItem} of {totalItems} rows
      </div>

      <div
        className={styles.paginationControls}
        role='group'
        aria-label='Page navigation'>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label='Go to first page'
          className={styles.paginationButton}>
          ⟨⟨
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label='Go to previous page'
          className={styles.paginationButton}>
          ⟨
        </button>

        <div
          className={styles.pageInput}
          role='group'
          aria-label='Page selection'>
          <label htmlFor='page-input' className='sr-only'>
            Current Page
          </label>
          <input
            id='page-input'
            type='number'
            value={currentPage}
            onChange={handlePageInputChange}
            min={1}
            max={totalPages}
            aria-label={`Page ${currentPage} of ${totalPages}`}
            aria-valuemin={1}
            aria-valuemax={totalPages}
            aria-valuenow={currentPage}
          />
          <span aria-hidden='true'>of {totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label='Go to next page'
          className={styles.paginationButton}>
          ⟩
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label='Go to last page'
          className={styles.paginationButton}>
          ⟩⟩
        </button>
      </div>
    </nav>
  );
};