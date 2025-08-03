// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth, signIn, signOut } from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen flex flex-col">
      {session && (
        <Suspense fallback={<Preloader />}>
          <UserHome session={session} />
        </Suspense>
      )}
      {!session && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-8 text-center space-y-6 hover-lift">
            <div className="space-y-2">
              <div className="w-16 h-16 ig-gradient rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">I</span>
              </div>
              <h1 className="text-2xl font-bold font-serif">
                Welcome to Infocus
              </h1>
              <p className="text-muted-foreground">
                Share your moments with the world
              </p>
            </div>

            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                className="btn btn-primary w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover-lift-sm"
                type="submit"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            <div className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
