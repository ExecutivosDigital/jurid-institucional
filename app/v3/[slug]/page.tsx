import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allFeatures, findFeature, hints } from "../lib/features";
import { FeaturePage } from "../components/sections/FeaturePage";

type Params = { params: { slug: string } };

/** Todas as 16 funcionalidades viram páginas estáticas no build. */
export function generateStaticParams() {
  return allFeatures.map((f) => ({ slug: f.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const feature = findFeature(params.slug);
  if (!feature) return {};

  const description = hints[feature.id] ?? feature.lead.slice(0, 155);

  return {
    title: `${feature.tab} — JuridIA`,
    description,
    openGraph: {
      title: `${feature.tab} — JuridIA`,
      description,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default function Page({ params }: Params) {
  // Só o slug atravessa a fronteira: o objeto Feature carrega um componente
  // de ícone, que não é serializável de Server para Client Component.
  if (!findFeature(params.slug)) notFound();

  return <FeaturePage slug={params.slug} />;
}
