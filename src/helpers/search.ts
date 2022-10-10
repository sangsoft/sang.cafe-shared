export type PriceRangeContext = undefined | 'low' | 'high' | 'none';


export function getPriceRangeTranslationOption({
  range,
}: {
  range: number[]
}): { min: number, max: number, context: PriceRangeContext } {
  if (!range) {
    return { min: undefined, max: undefined, context: 'none' }
  }
  let context: PriceRangeContext = undefined;
  const min = range[0];
  const max = range[1];

  if (!min && !max) {
    context = 'none';
  } else if (!min) {
    context = 'low';
  } else if (!max) {
    context = 'high';
  }

  return {
    min, max, context,
  };
}

export function getPriceRangeTranslationOptions({
  range,
}: {
  range: { [key: number]: number[] }
}): { min: number, max: number, context: PriceRangeContext, key: number }[] {
  return (Object.keys(range) as unknown as number[])
    .sort((a, b) => a - b)
    .map((key: number) => {
      return {
        ...getPriceRangeTranslationOption({
          range: range[key]
        }),
        key
      };
    });
}