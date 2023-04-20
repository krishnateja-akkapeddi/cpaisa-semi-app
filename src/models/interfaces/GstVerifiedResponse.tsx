export interface GstVerifiedResponse {
  success: boolean;
  gst_details: GstDetails;
  errors?: {gst_number: string};
}

export interface GstDetails {
  gstNumber: string;
  isValid: boolean;
  registrationName: string;
  directors: string[];
  tinNo: string;
  taxPayerType: string;
  registrationDate: string;
  status: string;
  cancellationDate: string;
  centreJurisdiction: string;
  stateJurisdiction: string;
  addresses: GstAddress[];
  business: GstBusiness;
  filings: GstFiling[];
}

export interface GstAddress {
  type: string;
  latitude: string;
  longitude: string;
  line: string;
  district: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  mobile: string;
  email: string;
}

export interface GstBusiness {
  type: string;
  legalName: string;
  tradeName: string;
  gstType: string;
  income: GstIncome;
  turnOver: GstTurnOver;
  natures: string[];
}

export interface GstIncome {
  gross: any;
  financialYear: any;
}

export interface GstTurnOver {
  min: number;
  max: number;
}

export interface GstFiling {
  year: string;
  month: string;
  method: string;
  type: string;
  status: string;
  date: string;
}
