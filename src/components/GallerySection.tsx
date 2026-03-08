import { motion } from "framer-motion";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Physiotherapy Session",
    desc: "Hands-on manual therapy treatment",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Rehabilitation Exercise",
    desc: "Guided patient recovery program",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Advanced Equipment",
    desc: "State-of-the-art medical devices",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Spinal Therapy",
    desc: "Specialized spinal treatment care",
    url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=600&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Clinical Consultation",
    desc: "Expert diagnosis and care planning",
    url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Modern Clinic",
    desc: "Clean and welcoming facility",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Balance Training",
    desc: "Fitness and mobility exercises",
    url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <InteractiveBentoGallery
            mediaItems={mediaItems}
            title="Gallery"
            description="A glimpse into our clinic, treatments, and patient care journey."
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
