import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-content py-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-5xl">This page could not be <em className="italic text-primary">found</em>.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">The link may be old, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
      </div>
    </div>
  );
}
