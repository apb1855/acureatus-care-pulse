import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clinicData } from "@/data/clinicData";
import { useI18n } from "@/hooks/useI18n";

const googleReviews = [
  {
    name: "Ananya Shetty",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent clinic! Dr. Harish accurately diagnosed my chronic knee pain in the first session. The robotic spinal decompression treatment was very effective. Highly recommended!",
    avatar: "A",
  },
  {
    name: "Karthik Nair",
    rating: 5,
    date: "1 month ago",
    text: "The AI-based motion analysis here is unlike anything I've seen. They found imbalances other clinics missed. The team is professional and caring.",
    avatar: "K",
  },
  {
    name: "Priya Bhat",
    rating: 4,
    date: "1 month ago",
    text: "Very good experience. The laser therapy sessions helped my shoulder pain significantly. Clean facility with modern equipment. Appointment system is smooth.",
    avatar: "P",
  },
  {
    name: "Mohammed Ashraf",
    rating: 5,
    date: "2 months ago",
    text: "My mother recovered wonderfully after her stroke thanks to the neuro-rehab program. The patience and expertise of the therapists is commendable.",
    avatar: "M",
  },
  {
    name: "Deepa Rao",
    rating: 5,
    date: "3 months ago",
    text: "As a competitive swimmer, the Athletic Performance Lab has been a game changer. The gait analysis and conditioning program improved my performance noticeably.",
    avatar: "D",
  },
  {
    name: "Suresh Poojary",
    rating: 4,
    date: "3 months ago",
    text: "Good clinic with advanced technology. The shockwave therapy really helped my heel pain. Only downside is the wait time can be a bit long during peak hours.",
    avatar: "S",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

const GoogleReviewsSection = () => {
  const { t } = useI18n();
  const { business_identity } = clinicData;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {t("reviews.title")}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl font-bold text-foreground">{business_identity.rating}</span>
                <StarRating rating={Math.round(business_identity.rating)} />
              </div>
              <span className="text-muted-foreground">
                ({business_identity.review_count} {t("reviews.reviewsOn")})
              </span>
            </div>
            <a
              href={clinicData.locations[0].google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              {t("reviews.viewOnGoogle")}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {googleReviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-border bg-card p-6 h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                  "{review.text}"
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
