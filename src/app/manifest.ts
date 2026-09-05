import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.nameKo,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d0a",
    theme_color: "#0b0d0a",
  };
}
