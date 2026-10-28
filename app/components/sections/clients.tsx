import Image from "next/image";

import { clients } from "../../data/clients";
import Container from "../shared/container";
import { ArrowUpRightIcon } from "../ui/icons";

const platformLabel = { shopify: "Shopify", wordpress: "WordPress" } as const;

export default function Clients() {
  const withImage = clients.filter((client) => client.image);
  const textOnly = clients.filter((client) => !client.image);

  return (
    <section aria-labelledby="clients-heading" className="pb-6 lg:pb-10">
      <Container>
        <div className="flex flex-col gap-5 border-y border-line py-6 lg:py-7">
          <h2
            id="clients-heading"
            className="font-mono text-[11px] font-medium tracking-[0.12em] text-dim uppercase md:text-xs"
          >
            Trusted by
          </h2>

          {withImage.length > 0 && (
            <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 sm:scroll-px-6 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0">
              {withImage.map((client) => (
                <li key={client.url} className="w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="client_store"
                    className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-2.5 transition-colors hover:border-line-strong"
                  >
                    <Image
                      src={client.image!}
                      alt={`${client.name} storefront`}
                      width={640}
                      height={400}
                      sizes="(min-width: 1024px) 280px, 72vw"
                      className="aspect-[16/10] h-auto w-full rounded-xl border border-line object-cover object-top"
                    />
                    <span className="flex items-center justify-between px-1.5 pb-1">
                      <span className="flex flex-col">
                        <span className="text-[15px] font-medium">{client.name}</span>
                        <span className="font-mono text-[10px] tracking-wider text-dim uppercase">
                          {platformLabel[client.category]}
                        </span>
                      </span>
                      <ArrowUpRightIcon size={16} className="text-dim transition-colors group-hover:text-ink" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {textOnly.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:gap-x-7">
              {textOnly.map((client) => (
                <li key={client.url}>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="client_store"
                    className="text-[15px] font-medium text-muted transition-colors hover:text-ink lg:text-[17px]"
                  >
                    {client.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
