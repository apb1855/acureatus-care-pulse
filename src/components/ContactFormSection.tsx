import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, Phone, MessageSquare } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters").regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(15, "Phone is too long").regex(/^[+]?[\d\s-]+$/, "Invalid phone number"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactFormSection = () => {
  const { t } = useI18n();
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: data.name, from_email: data.email, phone: data.phone,
        subject: data.subject, message: data.message, to_email: "acureatus@gmail.com",
      }, EMAILJS_PUBLIC_KEY);
      toast.success("Message sent! We'll get back to you shortly.");
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 md:py-28 bg-muted/20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{t("contact.title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t("contact.subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto">
          <div className="rounded-xl bg-card border border-border p-6 md:p-10">
            <Form {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {t("contact.name")} *</FormLabel>
                      <FormControl><Input placeholder={t("contact.name")} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {t("contact.email")} *</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {t("contact.phone")} *</FormLabel>
                      <FormControl><Input placeholder="+91 XXXXX XXXXX" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {t("contact.subject")} *</FormLabel>
                      <FormControl><Input placeholder={t("contact.subject")} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.message")} *</FormLabel>
                    <FormControl><Textarea placeholder={t("contact.message")} className="resize-none" rows={5} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full gap-2" disabled={sending}>
                  <Send className="w-4 h-4" />
                  {sending ? t("contact.sending") : t("contact.send")}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;
