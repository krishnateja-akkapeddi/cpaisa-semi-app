import ReviewStatus from '../enum/ReviewStatus';

export default interface InvoiceItem {
  status: ReviewStatus;
  stockistName: string;
  customerName: string;
  date: string;
  amount: string;
  summary: string;
  url: string;
}
