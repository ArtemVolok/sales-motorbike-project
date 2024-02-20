import { useCallback } from 'react';

export interface IUseHttp<TResponse> {
  (
    url: string,
    method: string,
    body?: Record<string, string | number | string[] | number[] | null>,
    contentType?: Record<string, string>,
    credentials?: RequestCredentials,
  ): Promise<TResponse>;
}

export const useHttp = () => {
  const request = useCallback(
    async (
      url: string,
      method: string,
      body?:
        | Record<string, string | number | string[] | number[] | null>
        | FormData,
      contentType: string = 'application/json',
      credentials?: RequestCredentials,
    ) => {
      try {
        console.log('inside useHttp');
        console.log('body before', body);
        const innerBody = body ? JSON.stringify(body) : null;
        console.log('innerBody', innerBody);

        console.log('headers', contentType);

        // const headers = {
        //   'Content-Type': contentType ? contentType : 'application/json',
        //   // Authorization: `Bearer ${storage}`,
        // };

        if (!credentials) {
          credentials = 'include';
        }

        const response = await fetch(url, {
          method,
          body: innerBody,
          // headers,
          credentials,
          mode: 'cors',
        });

        const data = await response.json();

        return data;
      } catch (err) {
        return {
          error: true,
          message: 'Something went wrong, try again later.',
        };
      }
    },
    [],
  );

  return { request };
};
