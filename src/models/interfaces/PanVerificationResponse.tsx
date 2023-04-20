export interface PanVerificationResponse {
  success: boolean;
  pan_details: PanDetails;
  errors?: {
    pan_number: string;
  };
}

export interface PanDetails {
  panNumber: string;
  isValid: boolean;
  name: PanName;
  isIndividual: boolean;
  lastUpdatedOn: string;
  panStatusCode: string;
  panStatus: string;
  aadhaarSeedingStatusCode: string;
  aadhaarSeedingStatus: string;
}

export interface PanName {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
}
