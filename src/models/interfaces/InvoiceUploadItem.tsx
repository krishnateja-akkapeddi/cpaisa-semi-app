import ReviewStatus from '../enum/ReviewStatus';

export default interface InvoiceUploadItem {
  status: ReviewStatus;
  docName: string;
  mime: string;
  url: string;
}
