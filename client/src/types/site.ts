// types/site.ts
export interface Site {
    _id: string;
    url: string;
    ownerId: string;
    verificationToken: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  }