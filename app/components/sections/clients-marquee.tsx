import { clients } from "../../data/clients";
import Container from "../shared/container";

function ClientList() {
  return (
    <>
      {clients.map((client) => (
        <span
          key={client}
          className="whitespace-nowrap font-display-lg text-xl text-white/40 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] md:text-2xl"
        >
          {client}
        </span>
      ))}
    </>
  );
}

export default function ClientsMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-outline-variant/10 bg-black py-12">
      <Container className="mb-8">
        <h3 className="text-center font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50">
          Trusted By Industry Leaders
        </h3>
      </Container>

      <div className="marquee-track flex select-none overflow-hidden">
        <div className="animate-marquee flex flex-none items-center gap-12 py-4 md:gap-24">
          <ClientList />
        </div>
        <div
          aria-hidden="true"
          className="animate-marquee flex flex-none items-center gap-12 py-4 md:gap-24"
        >
          <ClientList />
        </div>
      </div>
    </section>
  );
}
