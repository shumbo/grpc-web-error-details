/**
 * Add paddings to a base64 string to make it valid
 * @param unpadded Base64 string without paddings
 * @returns Padded base64 string
 */
export function pad(unpadded: string): string {
  while (unpadded.length % 4 !== 0) {
    unpadded += "=";
  }
  return unpadded;
}
