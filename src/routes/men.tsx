import { createFileRoute } from "@tanstack/react-router";
import { GroupPage } from "../components/GroupPage";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men's Sherwanis, Kurtas & Suiting Fabrics | Bombay Cloth Center" },
      {
        name: "description",
        content:
          "Groom sherwanis, festive kurta sets, Nehru jackets and premium suiting and shirting fabrics for men in Gadhinglaj.",
      },
      { property: "og:title", content: "Men's Ethnic & Formal Wear | Bombay Cloth Center" },
      {
        property: "og:description",
        content: "Sherwanis, kurtas, Nehru jackets, suiting and shirting under one roof.",
      },
    ],
  }),
  component: () => (
    <GroupPage
      group="Men"
      eyebrow="Men's Collection"
      title="Men"
      intro="From the groom's sherwani to the trusted suiting counter our customers have used for three generations."
      tileTitle="Explore Men's Departments"
    />
  ),
});
