import BannerNewsLetterDetail from "@/components/BannerNewsLetterDetail";
import BodyNewsLetterDetail from "@/components/BodyNewsLetterDetail";
import RelatedPost from "@/components/RelatedPost";

export default function NewsletterDetail({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Sección 1: BannerNewsLetterDetail */}
      <BannerNewsLetterDetail />
      
      {/* Sección 2: BodyNewsLetterDetail */}
      <BodyNewsLetterDetail />
      
      {/* Sección 3: RelatedPost */}
      <RelatedPost />
    </div>
  );
}

