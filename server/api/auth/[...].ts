import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  providers: [
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { username: string; password: string }) {
        // TODO
        return {};
      },
    }),
  ],
});
