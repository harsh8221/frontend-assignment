import React from 'react';
import { ProjectTableProps } from '../../types/ProjectTableProps';
import styles from './projectTable.module.css';

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toLowerCase(),
  }).format(amount);
};

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className={styles.loading} role='status'>
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role='alert'>
        {error}
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table role='grid'>
        <thead>
          <tr>
            <th scope='col'>S.No.</th>
            <th scope='col'>Percentage Funded</th>
            <th scope='col'>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project['s.no']}>
              <td>{project['s.no']}</td>
              <td>{project['percentage.funded']}%</td>
              <td>
                {formatCurrency(project['amt.pledged'], project.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
