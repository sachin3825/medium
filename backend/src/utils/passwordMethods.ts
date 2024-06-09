// Utility function to encode text to ArrayBuffer
async function encodeText(text: string): Promise<ArrayBuffer> {
  return new TextEncoder().encode(text).buffer;
}

// Utility function to hash the password
export async function hashPassword(password: string): Promise<string> {
  const buffer = await encodeText(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return bufferToHex(hashBuffer);
}

// Utility function to convert ArrayBuffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Utility function to compare hashes
export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}
