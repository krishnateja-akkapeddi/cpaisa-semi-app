import InvoiceProductStatus from '../enum/InvoiceProductStatus';

export default interface InvoiceProduct {
  name: string;
  points: string;
  qty: string;
  reason: string;
  status: InvoiceProductStatus;
}
