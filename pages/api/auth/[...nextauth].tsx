import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import api from "../../../services/api";
export default NextAuth({
  providers: [
    Providers.Facebook({
      clientId: "920550902080019",
      clientSecret: "a7e281f8fddefbb5f5eb2c6328f92ccf",
      scope: "ads_management, public_profile",
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      // Initial sign in

      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return { token };
    },

    async session(session, token) {
      if (token) {
        const { data } = await api.get(
          `businesses?access_token=${token.accessToken}`
        );

        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
        session.content = data.data;
      }

      return session;
    },
  },
});
