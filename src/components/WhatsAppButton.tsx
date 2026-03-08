import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "919796217888";
  const url = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-semibold">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
