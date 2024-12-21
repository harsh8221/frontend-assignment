import { ArtProject } from './ArtProject';

export interface ProjectTableProps {
  projects: ArtProject[];
  startIndex?: number;
  loading: boolean;
  error: string | null;
}
