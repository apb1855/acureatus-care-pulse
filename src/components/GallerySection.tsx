import { motion } from "framer-motion";
import { galleryImages } from "@/data/galleryData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A glimpse into our clinic, treatments, and patient care journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {galleryImages.map((img, i) => (
                <CarouselItem key={i} className="pl-3 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-xl aspect-[3/2] bg-card border border-border shadow-sm">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end">
                      <p className="text-primary-foreground text-xs font-medium p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-5" />
            <CarouselNext className="-right-4 md:-right-5" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
