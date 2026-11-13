export function filterDuplicate<AArrInput extends (string | number | unknown)[]>(input: AArrInput): AArrInput {
  return input.filter((d, i) => input.indexOf(d) === i) as AArrInput;
}

export function assertArrayOfString(input: any, label: string = 'Input'): asserts input is string[] {
  if (!Array.isArray(input) || input.every((i) => typeof i !== 'string')) {
    throw new Error(`${label} must be an array of strings`);
  }
}

export function toTitleCase(str: string, delimiter?: string) {
  if (typeof str != 'string') return '';

  delimiter = delimiter || str.match(/[\s\-]/)?.[0] || ' ';

  return str
    .trim()
    .toLowerCase()
    .split(delimiter)
    .map(function transform(word, idx) {
      const keep = new Set(['and', 'of', 'the']);
      if (idx > 0 && keep.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(delimiter);
}
