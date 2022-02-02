/**
 * Sleep for the given number of milliseconds
 * @param ms Time in milliseconds
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
