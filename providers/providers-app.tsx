import { ProviderProp } from "./react-node.type";
import AuthSessionProvider from "./session-provider";
import CustomQueryClientProvider from "./query-client-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import SpinnerApp from "@/app/components/Spinner/SpinnerApp";
import { SpinnerProvider } from "./spinner-provider";

const ProvidersApp = ({ children }: ProviderProp) => {
  return (
    <AuthSessionProvider>
      <CustomQueryClientProvider>
        <TooltipProvider>
          <SpinnerProvider>
            <SpinnerApp />
            <div>{children}</div>
          </SpinnerProvider>
          <Toaster />
        </TooltipProvider>
      </CustomQueryClientProvider>
    </AuthSessionProvider>
  );
};

export default ProvidersApp;
