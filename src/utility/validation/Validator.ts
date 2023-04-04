interface Params {
  [key: string]: any;
}

class Validator {
  private constructor() {}

  static isValidMobileNumber = (mobileNumber?: string): boolean => {
    const regex = new RegExp('^[6-9][0-9]{9}$');
    return regex.test(mobileNumber ?? '');
  };

  static isValidGSTNumber = (gstNumber?: string): boolean => {
    const regex = new RegExp(
      '[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}',
    );
    return regex.test(gstNumber ?? '');
  };

  static isValidPanNumber = (panNumber?: string): boolean => {
    const regex = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}$');
    return regex.test(panNumber ?? '');
  };

  static isValidName = (name?: string): boolean => {
    const regex = new RegExp('^.{5,}$');
    return regex.test(name ?? '');
  };

  static isValidShopName = (shopName?: string): boolean => {
    const regex = new RegExp('^.{5,}$');
    return regex.test(shopName ?? '');
  };

  static isValidAddress = (adderss?: string): boolean => {
    const regex = new RegExp('^.{5,}$');
    return regex.test(adderss ?? '');
  };

  static isValidPincode = (pincode?: string): boolean => {
    const regex = new RegExp('^[1-9][0-9]{5}$');
    return regex.test(pincode ?? '');
  };

  static isValidLicenseNo = (licenseNo?: string): boolean => {
    const regex = new RegExp('^.{5,}$');
    return regex.test(licenseNo ?? '');
  };

  static removeEmpty(obj: Params) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !obj[key]) {
        delete obj[key];
      }
    }
    return obj;
  }
}

export default Validator;
