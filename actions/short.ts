'use server';

import { z } from 'zod';

export const shortLink = async (prevState: any, formData: FormData) => {
  const link = formData.get('url');
  const randomLink = Math.random()
    .toString(36)
    .slice(0, 7)
    .replace('.', Math.random().toString(36).slice(0, 1));
  return {
    shortLink: `short.link/${randomLink}`,
  };
};
