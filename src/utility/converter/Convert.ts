import moment from 'moment';
type currentFormat =
  | 'MMM YY'
  | 'DD, MMM yyyy'
  | 'YYYYMM'
  | 'YYYY-MM'
  | 'DD-MM-YYYY'
  | 'YYYY-MM-DD'
  | 'DD-MM-YY'
  | 'dd mm yy'
  | 'dd mm'
  | 'mmmm yy'
  | 'yyyy-mm-dd'
  | 'DD MMM yyyy, HH:mm'
  | 'DD MMM y, HH:mm';

export class Convert {
  public static toObject<T>(json: string): T {
    return JSON.parse(json);
  }

  public static toJson<T>(value: T): string {
    return JSON.stringify(value);
  }
  public static base64ToFileConverter(raw: string) {
    var base64Icon = `data:image/png;base64,${raw}`;
    return base64Icon;
  }
  public static timeConverter(UNIX_timestamp: number) {
    var d = new Date(0);
    const secs = d.setUTCSeconds(UNIX_timestamp);

    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var fullTime = a.getTime();
    var totalMinutes = fullTime / (1000 * 60);
    Math.floor(new Date().getTime() / 1000.0);
    return min;
  }
  public static dateFormatter(
    currentFormat: currentFormat | null,
    requiredFormat: currentFormat,
    date: string | Date,
  ) {
    var formattedDate = currentFormat
      ? moment(date, currentFormat).format(requiredFormat)
      : moment(date).format(requiredFormat);
    return formattedDate;
  }

  public static capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  public static toTitleCase(sentence?: string): string {
    const words = sentence?.toLowerCase().split(' ');
    if (words) {
      for (let i = 0; i < words?.length; i++) {
        if (words[i] === ' ') {
          continue;
        }
        words[i] = words[i][0]?.toUpperCase() + words[i].slice(1);
      }
      return words.join(' ');
    } else {
      return '';
    }
  }

  public static dateToQuarter(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = start.getMonth();
    const endMonth = end.getMonth();

    let startQuarter = Math.floor(startMonth / 3) + 1;
    let endQuarter = Math.floor(endMonth / 3) + 1;

    return startQuarter;
  }
  public static convertToRupeesFormat(val: string) {
    let value = parseFloat(val).toFixed(2);
    // Convert value to string
    let valueString = value.toString();

    // Split valueString into integer and decimal parts
    let parts = valueString.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';

    // Add commas to the integer part
    let formattedIntegerPart = '';
    let count = 0;
    for (let i = integerPart.length - 1; i >= 0; i--) {
      formattedIntegerPart = integerPart[i] + formattedIntegerPart;
      count++;
      if (count === 3 && i !== 0) {
        formattedIntegerPart = ',' + formattedIntegerPart;
        count = 0;
      }
    }

    // Join integer and decimal parts with dot
    let formattedValue =
      formattedIntegerPart + (decimalPart !== '' ? '.' + decimalPart : '');

    // Add '₹' symbol in front
    formattedValue = '₹ ' + formattedValue;

    return formattedValue;
  }
}
