export const getOne = <T>(results: readonly T[], query: string): T => {
    if (results.length === 0) throw new Error(`Item not found: ${query}`);
    if (results.length > 1) throw new Error(`Multiple items found: ${query}`);
    return results[0];
};
