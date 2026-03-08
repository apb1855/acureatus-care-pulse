import { motion } from "framer-motion";
import { ImageGallery } from "@/components/ui/carousel-circular-image-gallery";

const galleryImages = [
  {
    title: "Physiotherapy Session",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop",
  },
  {
    title: "Rehabilitation Exercise",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
  },
  {
    title: "Advanced Equipment",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=600&fit=crop",
  },
  {
    title: "Spinal Therapy",
    url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=600&fit=crop",
  },
  {
    title: "Clinical Consultation",
    url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop",
  },
  {
    title: "Modern Clinic",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=600&fit=crop",
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
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A glimpse into our clinic, treatments, and patient care journey.
          </p>
        </motion.div>
        <ImageGallery images={galleryImages} />
      </div>
    </section>
  );
};

export default GallerySection;
