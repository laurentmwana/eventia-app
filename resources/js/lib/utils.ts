import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function excerpt(
    text: string,
    limit: number = 100,
    separator: string = '...'
  ): string {
    if (text.length <= limit) {
      return text;
    }

    let truncated = text.substring(0, limit);

    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
      truncated = truncated.substring(0, lastSpaceIndex);
    }

    return truncated + separator;
  }
