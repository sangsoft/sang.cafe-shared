export function findClustersOfAdjacentNumbers(ar?: number[]): number[][] {
  if (!ar) {
    return [];
  }
  return ar
    .sort((a, b) => a - b)
    .reduce((result, value) => {
      const lastCluster = result[result.length - 1];
      if (lastCluster && value - (lastCluster[lastCluster.length - 1] || 0) === 1) {
        lastCluster.push(value);
        return [...result];
      } else {
        return [...result, [value]];
      }
    }, []);
}
