import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import env from "@/app/lib/env";
import { getOrCreateUser } from "@/app/lib/data";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********"
                }
            },
            async authorize(credentials, request) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                let user = await getOrCreateUser(credentials.email, credentials.password);
                console.log(user);
                return user;
            }
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        /**
         * You can add other properties of the user incase needed
         * JWT is called first, then the session, so put all the information needed for the user
         * in JWT and also return it into the session as well.
         */
        session: ({ token, session }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    id: user.id
                };
            }
            return token;
        },
        signIn: async (params) => {
            console.log('Signin callback...');
            console.log(params.user);
            // Save the Google here
            return true;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
