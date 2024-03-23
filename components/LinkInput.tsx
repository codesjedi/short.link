'use client';

import { Confetti } from '@neoconfetti/react';
import { useFormState } from 'react-dom';

import { shortLink } from '@/actions/short';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEffect, useRef, useState } from 'react';
import { useToast } from './ui/use-toast';
import { Label } from './ui/label';

const formInitialState = {
  shortLink: '',
};

const LinkInput = () => {
  const [state, formAction] = useFormState(shortLink, formInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [showShortUrl, setshowShortUrl] = useState(!!state.shortLink);
  const { toast } = useToast();

  useEffect(() => {
    if (state.shortLink) {
      setshowShortUrl(true);
    }
  }, [state.shortLink]);

  return (
    <div className="border p-8 rounded-sm">
      <h1 className="text-3xl w-full text-center py-8 font-bold">
        Shorten a long link
      </h1>
      <form
        action={formAction}
        className="flex flex-row space-x-6"
        ref={formRef}
      >
        <div>
          <Label htmlFor="url">Paste a long URL</Label>
          <Input
            className="min-w-96"
            type="text"
            id="url"
            placeholder="google.com"
          />
        </div>
        <div className="flex flex-col justify-end">
          <Button type="submit" className="" disabled={showShortUrl}>
            Shorten
          </Button>
        </div>
      </form>
      <div className="h-16 mt-4 mx-auto flex justify-center">
        {showShortUrl ? (
          <div className="flex items-center">
            <Button
              variant={'ghost'}
              onClick={() => {
                navigator.clipboard.writeText(state.shortLink);
                toast({
                  title: 'Copied to clipboard',
                  description: state.shortLink,
                });
              }}
              className="text-center align-top"
            >
              Your short link: {state.shortLink}
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => {
                formRef.current?.reset();
                setshowShortUrl(false);
              }}
              className="hover:font-bold mx-8 cursor-pointer"
            >
              Reset
            </Button>
            <Confetti />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LinkInput;
