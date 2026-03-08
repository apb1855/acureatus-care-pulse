import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Accessibility, Navigation } from "lucide-react";
import { clinicData } from "@/data/clinicData";

const ContactSection = () => {
  const main = clinicData.locations[0];
  const secondary = clinicData.locations[1];
  const hours = clinicData.operating_hours;

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Visit Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Main clinic */}
          <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">{main.branch_name}</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground text-sm">{main.address}</p>
                  <p className="text-secondary font-medium text-sm mt-1 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5" />
                    Landmark: {main.landmark}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {main.contact_numbers.map((num) => (
                    <a key={num} href={`tel:${num.replace(/\s/g, "")}`} className="block text-foreground text-sm hover:text-primary transition-colors">
                      {num}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground text-sm">Mon–Sat: {hours.monday_to_saturday}</p>
                  <p className="text-muted-foreground text-sm">Sunday: {hours.sunday}</p>
                </div>
              </div>

              {/* Accessibility */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Accessibility className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Wheelchair Accessible (Elevator, Seating, Restroom)</span>
              </div>
            </div>

            <a
              href={main.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 mt-6 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition min-h-[48px]"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>

          {/* Secondary + Map */}
          <div className="space-y-6">
            {/* Embedded Map - visible only on lg+ */}
            <div className="hidden lg:block rounded-xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.!2d74.856!3d12.876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUyJzM0LjAiTiA3NMKwNTEnMjEuNiJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Acureatus Clinic Location"
              />
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{secondary.branch_name}</h3>
              <p className="text-sm text-foreground">{secondary.address}</p>
              <a href={`tel:${secondary.contact_number?.replace(/\s/g, "")}`} className="text-sm text-primary font-medium mt-2 block">
                {secondary.contact_number}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
