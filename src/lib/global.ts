import crypto from 'node:crypto';

export const createId = () => {
    // Generate a random 8-digit hexadecimal number
    const randomHex = Math.floor(Math.random() * 0xFFFFFFFFFFFFF).toString(16).toUpperCase().padStart(12, '0');

    // Get the current timestamp
    const timestamp = Date.now().toString(16).toUpperCase().padStart(12, '0');

    // Combine the random hex and timestamp to create a unique ID
    const uniqueId = `${randomHex}-${timestamp}`;

    return uniqueId;
}

export const generateShortHash = (input:string, length = 14) => {
    // Create a SHA-256 hash of the input
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    // Return the first `length` characters of the hash
    //return hash.slice(0, length);
    return hash;
}