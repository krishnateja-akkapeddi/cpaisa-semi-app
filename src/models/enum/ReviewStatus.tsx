import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import ReviewStatusInfo from '../interfaces/ReviewStatusInfo';

export enum ReviewStatus {
  Pending,
  Approved,
  Rejected,
}

export const getReviewStatusInfo = (status: ReviewStatus): ReviewStatusInfo => {
  switch (status) {
    case ReviewStatus.Pending:
      return {
        color: Colors.primary,
        title: AppLocalizedStrings.reviewStatus.pending,
      };
    case ReviewStatus.Approved:
      return {
        color: Colors.green,
        title: AppLocalizedStrings.reviewStatus.approved,
      };

    case ReviewStatus.Rejected:
      return {
        color: Colors.red,
        title: AppLocalizedStrings.reviewStatus.rejected,
      };
  }
};

export default ReviewStatus;
