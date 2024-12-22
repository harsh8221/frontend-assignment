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
      <div
        className={styles.loading}
        role='status'
        aria-live='polite'
        aria-busy='true'>
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role='alert' aria-live='assertive'>
        {error}
      </div>
    );
  }

  return (
    <div
      className={styles.tableContainer}
      role='region'
      aria-label='Arts Projects Table'>
      <table role='grid' aria-label='Projects Data'>
        <thead>
          <tr>
            <th scope='col' aria-sort='none'>
              S.No.
            </th>
            <th scope='col' aria-sort='none'>
              Percentage Funded
            </th>
            <th scope='col' aria-sort='none'>
              Amount Pledged
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project['s.no']} role='row'>
              <td role='gridcell'>{project['s.no']}</td>
              <td
                role='gridcell'
                aria-label={`Percentage Funded: ${project['percentage.funded']}%`}>
                {project['percentage.funded']}%
              </td>
              <td
                role='gridcell'
                aria-label={`Amount Pledged: ${formatCurrency(
                  project['amt.pledged'],
                  project.currency
                )}`}>
                {formatCurrency(project['amt.pledged'], project.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {projects.length === 0 && (
        <div role='status' aria-live='polite' className={styles.noData}>
          No projects found
        </div>
      )}
    </div>
  );
};
