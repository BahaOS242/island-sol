import { buildWhatsAppLink } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/**
 * Contextual WhatsApp CTA. Always pass a specific `message` so the
 * conversation opens with context (e.g. the product name) instead of a
 * generic greeting.
 */
export function WhatsAppLink({
  message,
  children,
  variant = "secondary",
  size = "md",
  className = "",
}: {
  message: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Button
      href={buildWhatsAppLink(message)}
      variant={variant}
      size={size}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Button>
  );
}
