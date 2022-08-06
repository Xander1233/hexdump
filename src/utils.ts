/**
 * Add padding to an hex number
 * n = 0x2a
 * l = 5
 * returned = 0002a
 * @param n The number you want to add the padding to
 * @param l The length of the padding (l - n.length)
 * @returns Hex number with the length l and if needed, padded 0's
 */
export const toHex = (n: number, l: number): string => {
	return n.toString(16).padStart(l, '0');
}