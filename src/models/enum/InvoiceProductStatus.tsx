import {ListStatusInfo} from '../interfaces/ReviewStatusInfo';

enum InvoiceProductStatus {
  Pending,
  Approved,
  Rejected,
  NotEligible,
}

export const getListStatusInfo = (
  status: InvoiceProductStatus,
): ListStatusInfo => {
  switch (status) {
    case InvoiceProductStatus.Approved:
      return {
        color: '#B5EAD7',
      };
    case InvoiceProductStatus.Pending:
      return {
        color: '#EDB98E',
      };

    case InvoiceProductStatus.Rejected:
      return {
        color: '#FFD7DA',
      };
    case InvoiceProductStatus.NotEligible:
      return {
        color: '#E5E5E5',
      };
  }
};

export default InvoiceProductStatus;
