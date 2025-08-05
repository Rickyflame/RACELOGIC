export interface QualifyingResult {
  id: string;
  driver: {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
    number: string;
  };
  team: {
    id: string;
    name: string;
  };
  position: number;
  status: 'ok' | 'dnf' | 'dns';
  positionStatus: 'classified' | 'not_classified' | 'finished';
  bestLapTime?: string; //optional
  qualifyingSession?: string;
}
