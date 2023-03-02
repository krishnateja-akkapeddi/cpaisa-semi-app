import moment from 'moment';

export class Generator {
  //Method to generate year month
  public static generateYearMonth(endPoint: number) {
    const start = moment().startOf('month');

    var dates = [];
    for (let i = 0; i < endPoint; i++) {
      if (i === 0) dates.push(start.subtract(0, 'month').format('MMM YY'));
      dates.push(start.subtract(1, 'month').format('MMM YY'));
    }
    return dates;
  }
  public static getQuarterDates(
    quarter: number,
    year: number,
  ): {start: Date; end: Date} {
    let start: Date;
    let end: Date;

    switch (quarter) {
      case 1:
        start = new Date(year, 0, 1);
        end = new Date(year, 2, 31);
        break;
      case 2:
        start = new Date(year, 3, 1);
        end = new Date(year, 5, 30);
        break;
      case 3:
        start = new Date(year, 6, 1);
        end = new Date(year, 8, 30);
        break;
      case 4:
        start = new Date(year, 9, 1);
        end = new Date(year, 11, 31);
        break;
      default:
        throw new Error('Invalid quarter');
    }
    return {start, end};
  }
  public static generateYears(count: number): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i < count; i++) {
      years.push(currentYear - i);
    }
    return years;
  }
}
