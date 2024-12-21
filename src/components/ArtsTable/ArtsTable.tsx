import React, { useState, useEffect } from 'react';
import ProjectTable from '../ProjectTable';
import Pagination from '../Pagination';
import { ArtProject } from '../../types/ArtProject';
import styles from './artsTable.module.css';
const PROJECTS_PER_PAGE = 5;
const API_URL =
  'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';

export const ArtsTable: React.FC = () => {
  const [projects, setProjects] = useState<ArtProject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ArtProject[] = await response.json();

        // Sort projects by their serial number if needed
        const sortedData = [...data].sort((a, b) => a['s.no'] - b['s.no']);
        setProjects(sortedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Calculate pagination
  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    // Scroll to top of table for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Arts Projects</h1>

        <ProjectTable
          projects={currentProjects}
          loading={loading}
          error={error}
        />

        {!loading && !error && projects.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};