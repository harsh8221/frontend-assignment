import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProjectTable } from '../ProjectTable';
import { ArtProject } from '../../../types/ArtProject';

describe('ProjectTable Component', () => {
  const mockProjects: ArtProject[] = [
    {
      's.no': 1,
      'amt.pledged': 1500,
      blurb: 'Test project 1',
      by: 'Test Creator 1',
      country: 'US',
      currency: 'USD',
      'end.time': '2024-12-31T23:59:59-05:00',
      location: 'New York, NY',
      'percentage.funded': 75,
      'num.backers': '100',
      state: 'NY',
      title: 'Test Project 1',
      type: 'Technology',
      url: '/projects/test1',
    },
    {
      's.no': 2,
      'amt.pledged': 2000,
      blurb: 'Test project 2',
      by: 'Test Creator 2',
      country: 'GB',
      currency: 'GBP',
      'end.time': '2024-12-31T23:59:59-05:00',
      location: 'London, UK',
      'percentage.funded': 150,
      'num.backers': '200',
      state: 'LDN',
      title: 'Test Project 2',
      type: 'Games',
      url: '/projects/test2',
    },
  ];

  it('should render loading state correctly', () => {
    render(<ProjectTable projects={[]} loading={true} error={null} />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading projects...');
  });

  it('should render error state correctly', () => {
    const errorMessage = 'Failed to load projects';
    render(<ProjectTable projects={[]} loading={false} error={errorMessage} />);
    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });

  it('should render table headers correctly', () => {
    render(
      <ProjectTable projects={mockProjects} loading={false} error={null} />
    );
    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage Funded')).toBeInTheDocument();
    expect(screen.getByText('Amount Pledged')).toBeInTheDocument();
  });

  it('should render project data correctly', () => {
    render(
      <ProjectTable projects={mockProjects} loading={false} error={null} />
    );

    // Check first project
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('$1,500.00')).toBeInTheDocument();

    // Check second project
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('150%')).toBeInTheDocument();
    expect(screen.getByText('£2,000.00')).toBeInTheDocument();
  });

  it('should handle empty projects array', () => {
    render(<ProjectTable projects={[]} loading={false} error={null} />);
    const rows = screen.queryAllByRole('row');
    expect(rows).toHaveLength(1); // Only header row
  });

  it('should format different currencies correctly', () => {
    const projectsWithDifferentCurrencies: ArtProject[] = [
      { ...mockProjects[0], currency: 'EUR', 'amt.pledged': 1000 },
      { ...mockProjects[1], currency: 'JPY', 'amt.pledged': 100000 },
    ];

    render(
      <ProjectTable
        projects={projectsWithDifferentCurrencies}
        loading={false}
        error={null}
      />
    );
    expect(screen.getByText('€1,000.00')).toBeInTheDocument();
    expect(screen.getByText('¥100,000')).toBeInTheDocument();
  });
});
