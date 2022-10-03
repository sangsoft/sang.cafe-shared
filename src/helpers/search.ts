export type PriceRangeContext = undefined | 'low' | 'high' | 'none';

export function getPriceRangeTranslationOptions({
  range,
}: {
  range: { [key: number]: number[] }
}): { min: number, max: number, context: PriceRangeContext, key: number }[] {
  return (Object.keys(range) as unknown as number[])
    .sort((a, b) => a - b)
    .map((key: number) => {
      const min = range[key][0];
      const max = range[key][1];

      let context: PriceRangeContext = undefined;
      if (!min && !max) {
        context = 'none';
      } else if (!min) {
        context = 'low';
      } else if (!max) {
        context = 'high';
      }

      return {
        min, max, context, key,
      };
    });
}