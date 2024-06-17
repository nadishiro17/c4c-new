// Partner detials interface
export interface PartnerDetails {
    id: number;
    name: string;
    thumbnailUrl: string;
    description: string;
    isActive: boolean;
  }
  
  export type PartnerData = Record<string, PartnerDetails>;
  
