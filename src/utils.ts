// Add padding to the left of an hex number
// Example:
// padLeft(0x2a, 5) => "0002a"
export const toHex = (n: number, l: number) => n.toString(16).padStart(l, '0');