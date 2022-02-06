/**
 * Sleep for the given number of milliseconds
 * @param ms Time in milliseconds
 * @returns Promise that resolves after the given time
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
