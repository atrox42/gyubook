import Image from "next/image";
import type { CatalogItem } from "@/lib/catalog";

export function CatalogCard({ item }: { item: CatalogItem }) {
  const name = item.color ? `${item.name} / ${item.color}` : item.name;

  return (
    <article className="catalog-card">
      <div className="catalog-nukki">
        <Image
          src={item.thumb}
          alt={item.name}
          fill
          sizes="(max-width: 959px) 50vw, 25vw"
          className="object-contain"
        />
      </div>

      <div className="catalog-meta">
        <p className="catalog-name">{name}</p>
        <p className="catalog-price">{item.price ?? ""}</p>
      </div>

      <p className="catalog-wear-label">WEAR</p>
      <div className="catalog-wear">
        <Image
          src={item.wear}
          alt={`${item.name} 착용`}
          fill
          sizes="(max-width: 959px) 50vw, 25vw"
          className="object-contain object-top"
        />
      </div>

      {item.affiliateUrl ? (
        <a
          href={item.affiliateUrl}
          target="_blank"
          rel="noreferrer sponsored"
          className="catalog-buy"
        >
          구매
        </a>
      ) : (
        <span className="catalog-buy is-wait">링크 준비중</span>
      )}
    </article>
  );
}
