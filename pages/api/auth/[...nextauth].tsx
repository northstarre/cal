import { IdentityProvider } from "@prisma/client";
import NextAuth, { Session } from "next-auth";
import { Provider } from "next-auth/providers";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@lib/prisma";
import { randomString } from "@lib/random";
import { hostedCal } from "@lib/saml";
import slugify from "@lib/slugify";

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, IS_GOOGLE_LOGIN_ENABLED } from "@server/lib/constants";

const providers: Provider[] = [
  AzureADB2CProvider({
    id: "b2c",
    name: "Northstarre",
    tenantId: "NorthstarreApp",
    clientId: "359665e3-a4ce-477f-94d1-3a1b41722bab",
    clientSecret: "tXO7Q~iZBD1RH-KeSx6gU3miNY_InaVNQyyEn",
    primaryUserFlow: "B2C_1_DefaultSignIn_SignUP",
    authorization: { params: { scope: "offline_access openid" } },
    idToken: true,
    profile: (profile) => {
      console.log("THE PROFILE", profile);

      return { ...profile, id: profile.emails[0], email: profile.emails[0] };
    },
  }),
];

if (IS_GOOGLE_LOGIN_ENABLED) {
  providers.push(
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  );
}

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("in Jwt callback");

      const autoMergeIdentities = async () => {
        console.log("in autoMergeIdentities", token);
        if (!hostedCal) {
          const existingUser = await prisma.user.findFirst({
            where: { email: token.email! },
          });

          if (!existingUser) {
            return token;
          }

          return {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
          };
        }

        return token;
      };

      if (!user) {
        return await autoMergeIdentities();
      }

      if (account && account.type === "credentials") {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      }

      // The arguments above are from the provider so we need to look up the
      // user based on those values in order to construct a JWT.
      if (account && account.type === "oauth" && account.provider && account.providerAccountId) {
        let idP: IdentityProvider = IdentityProvider.GOOGLE;
        if (account.provider === "saml") {
          idP = IdentityProvider.SAML;
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            AND: [
              {
                identityProvider: idP,
              },
              {
                //identityProviderId: account.providerAccountId as string,
              },
            ],
          },
        });

        if (!existingUser) {
          return await autoMergeIdentities();
        }

        return {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const calendsoSession: Session = {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.id as number,
          username: token.username as string,
        },
      };
      console.log("inside session", calendsoSession);
      return calendsoSession;
    },
    async signIn({ user, account, profile }) {
      // In this case we've already verified the credentials in the authorize
      // callback so we can sign the user in.
      console.log("inside signIn");
      if (account.type === "credentials") {
        return true;
      }

      if (account.type === "oauth") {
        return true;
      }

      if (account.provider) {
        let idP: IdentityProvider = IdentityProvider.GOOGLE;
        if (account.provider === "saml") {
          idP = IdentityProvider.SAML;
        }
        user.email_verified = user.email_verified || profile.email_verified;

        if (!user.email_verified) {
          return "/auth/error?error=unverified-email";
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            AND: [{ identityProvider: idP }, { identityProviderId: user.id as string }],
          },
        });

        if (existingUser) {
          // In this case there's an existing user and their email address
          // hasn't changed since they last logged in.
          if (existingUser.email === user.email) {
            return true;
          }

          // If the email address doesn't match, check if an account already exists
          // with the new email address. If it does, for now we return an error. If
          // not, update the email of their account and log them in.
          const userWithNewEmail = await prisma.user.findFirst({
            where: { email: user.email },
          });

          if (!userWithNewEmail) {
            await prisma.user.update({ where: { id: existingUser.id }, data: { email: user.email } });
            return true;
          } else {
            return "/auth/error?error=new-email-conflict";
          }
        }

        // If there's no existing user for this identity provider and id, create
        // a new account. If an account already exists with the incoming email
        // address return an error for now.
        const existingUserWithEmail = await prisma.user.findFirst({
          where: { email: user.email },
        });

        if (existingUserWithEmail) {
          // if self-hosted then we can allow auto-merge of identity providers if email is verified
          if (!hostedCal && existingUserWithEmail.emailVerified) {
            return true;
          }

          // check if user was invited
          if (
            !existingUserWithEmail.password &&
            !existingUserWithEmail.emailVerified &&
            !existingUserWithEmail.username
          ) {
            await prisma.user.update({
              where: { email: user.email },
              data: {
                // Slugify the incoming name and append a few random characters to
                // prevent conflicts for users with the same name.
                username: slugify(user.name) + "-" + randomString(6),
                emailVerified: new Date(Date.now()),
                name: user.name,
                identityProvider: idP,
                identityProviderId: user.id as string,
              },
            });

            return true;
          }

          if (existingUserWithEmail.identityProvider === IdentityProvider.CAL) {
            return "/auth/error?error=use-password-login";
          }

          return "/auth/error?error=use-identity-login";
        }

        await prisma.user.create({
          data: {
            // Slugify the incoming name and append a few random characters to
            // prevent conflicts for users with the same name.
            username: slugify(user.name) + "-" + randomString(6),
            emailVerified: new Date(Date.now()),
            name: user.name,
            email: user.email,
            identityProvider: idP,
            identityProviderId: user.id as string,
          },
        });

        return true;
      }

      return false;
    },
  },
});
