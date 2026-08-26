import { createFileRoute } from "@tanstack/react-router";
import { PageRenderer, getPage } from "@/components/PageRenderer";
const Route = createFileRoute("/$")({
  head: ({ params }) => {
    const slug = params._splat ?? "";
    const page = getPage(slug);
    const title = page?.title ?? "CoverRCM";
    const desc = page?.desc ?? "Revenue cycle management and healthcare consulting services.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc }
      ]
    };
  },
  component: SplatPage
});
function SplatPage() {
  const { _splat } = Route.useParams();
  return <PageRenderer slug={_splat ?? ""} />;
}
export {
  Route
};
