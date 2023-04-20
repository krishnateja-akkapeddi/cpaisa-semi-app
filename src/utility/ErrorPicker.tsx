export function pickMessageFromErrors(errors: object): string {
  const pickMessage = JSON.stringify(errors).split(':')[1].split('"')[1];

  return pickMessage;
}
