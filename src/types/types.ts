
export type Status = 'Online' | 'Paused' | 'Stopped' | 'Draft'
export interface Test {
    id: string;
    name: string;
    type: 'Classic' | 'MVT' | 'Server-side';
    status: Status;
    siteId: number;
  }
  
  export interface Site {
    id: number;
    url: string;
    color?: string;
  }
  
