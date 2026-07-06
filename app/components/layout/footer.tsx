import Container from "../shared/container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8">
      <Container>
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Atif Raza.
          Built with Next.js & Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}