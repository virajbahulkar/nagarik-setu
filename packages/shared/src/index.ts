export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface CreateIssueDto {
  title: string;
  description: string;
  categoryId: number;
  wardId: number;
  location: Coordinate;
}

export interface IssueSummary {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
}
