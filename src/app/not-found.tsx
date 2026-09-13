import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-20">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          This page went dark.
        </h1>
        <p className="mt-4 text-slate-600">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/products" variant="primary">
            Shop Power Stations
          </Button>
          <Button href="/" variant="secondary" className="text-ink">
            Back Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
