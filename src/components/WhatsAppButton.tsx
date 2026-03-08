import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "919796217888";
  const url = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-105 p-3 hover:pr-5 bottom-24"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[8rem] group-hover:ml-2">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
