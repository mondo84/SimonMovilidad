export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 p-2 w-full h-screen">
        <div className="flex items-center justify-center h-full">
          {children}
        </div>
        <div className="col-span-2 border-s-1 border-s-black-900 flex items-center justify-center !bg-orange !w-full">
          <span className="text-neutral-500/35 text-9xl select-none">
            IOT APP
          </span>
        </div>
      </div>
    </>
  );
}
