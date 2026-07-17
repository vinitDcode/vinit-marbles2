"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PasscodeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode }),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.message ?? "Incorrect passcode.");
          return;
        }

        setPasscode("");
        onOpenChange(false);
        router.push("/admin");
      } catch {
        setError("Could not reach the server. Try again.");
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[9990] bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed left-1/2 top-1/2 z-[9991] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/[0.03] p-8 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <Dialog.Close asChild>
                  <button
                    aria-label="Close"
                    className="absolute right-5 top-5 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </Dialog.Close>

                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                    <Lock size={18} className="text-gold-light" />
                  </div>
                  <Dialog.Title className="font-display text-xl">
                    Restricted Access
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-white/40">
                    Enter the vault passcode to continue.
                  </Dialog.Description>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    type="password"
                    autoFocus
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="••••••••"
                    className="text-center tracking-[0.3em]"
                    error={error ?? undefined}
                  />
                  {error && (
                    <p className="text-center text-xs text-red-400">{error}</p>
                  )}
                  <Button
                    type="submit"
                    variant="gold"
                    className="w-full"
                    disabled={isPending || passcode.length < 4}
                  >
                    {isPending ? "Verifying..." : "Unlock"}
                  </Button>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
