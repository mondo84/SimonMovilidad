"use client";
import useIsAuthHook from "@/modules/auth/hooks/useAuth";

const HomePage = () => {
  const { session, status } = useIsAuthHook();
  if (!session || status === "unauthenticated" || status === "loading")
    return <p>Loading ...</p>;

  return (
    <>
      <div>Home List</div>
    </>
  );
};

export default HomePage;
