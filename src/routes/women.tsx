import { createFileRoute } from "@tanstack/react-router";
import { GroupPage } from "../components/GroupPage";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women's Ethnic Wear & Sarees | Bombay Cloth Center" },
      {
        name: "description",
        content:
          "Paithani and Banarasi silks, designer sarees, bridal lehengas, sharara sets and premium dress materials for women in Gadhinglaj.",
      },
      { property: "og:title", content: "Women's Ethnic Wear & Sarees | Bombay Cloth Center" },
      {
        property: "og:description",
        content: "Sarees, lehengas, sharara sets and dress materials curated since 1965.",
      },
    ],
  }),
  component: () => (
    <GroupPage
      group="Women"
      eyebrow="Women's Collection"
      title="Women"
      intro="Silks that hold their fall, embroidery that survives generations, and dress materials your tailor will thank you for."
      tileTitle="Explore Women's Departments"
    />
  ),
});
