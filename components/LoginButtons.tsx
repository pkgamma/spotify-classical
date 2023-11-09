import * as React from "react";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ListIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoginButtons() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    async function fetchProviders() {
      const providers = await getProviders();
      const firstProvider = providers?.[Object.keys(providers)[0]];
      setProvider(firstProvider);
    }
    fetchProviders();
  }, []);

  return (
    <>
      {provider && (
        <div>
          <Button
            key={provider.name}
            onClick={() => signIn(provider.id)}
            variant="outline"
            type="button"
          >
            <ListIcon className="mr-2 h-4 w-4" />
            Login with {provider.name}
          </Button>
        </div>
      )}
    </>
  );
}
