import { clinicData } from "@/data/clinicData";

const Footer = () => (
  <footer className="py-10 bg-primary text-primary-foreground">
    <div className="container text-center">
      <p className="text-sm text-primary-foreground/60 mb-2">
        An initiative of {clinicData.business_identity.initiative_of.join(" & ")}
      </p>
      <p className="text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} {clinicData.business_identity.name}. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
