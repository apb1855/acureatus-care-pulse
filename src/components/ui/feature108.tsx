import { forwardRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge,
  heading,
  description,
  tabs = [],
}: Feature108Props) => {
  const [openModal, setOpenModal] = useState<TabContent | null>(null);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          {badge && <Badge variant="outline" className="text-sm font-medium text-primary border-primary/30">{badge}</Badge>}
          {heading && (
            <h2 className="max-w-2xl text-3xl md:text-4xl font-display font-bold text-foreground">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground max-w-xl">{description}</p>
          )}
        </div>

        <Tabs defaultValue={tabs[0]?.value} className="w-full">
          <TabsList className="flex w-full justify-center gap-1.5 sm:gap-2 bg-transparent mb-8 flex-wrap">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1 sm:gap-2 rounded-lg px-2.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
              >
                {tab.icon} <span className="hidden xs:inline sm:inline">{tab.label}</span>
                <span className="inline xs:hidden sm:hidden">{tab.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid gap-8 lg:grid-cols-2 items-center rounded-xl border border-border bg-card p-6 md:p-10">
                <div className="flex flex-col gap-4">
                  <Badge variant="secondary" className="w-fit">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {tab.content.description}
                  </p>
                  <div className="mt-2">
                    <Button onClick={() => setOpenModal(tab.content)}>
                      {tab.content.buttonText}
                    </Button>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="w-full h-auto rounded-lg object-cover aspect-video"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={!!openModal} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-2xl">
          {openModal && (
            <>
              <DialogHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {openModal.badge}
                </Badge>
                <DialogTitle className="text-xl md:text-2xl font-display font-bold">
                  {openModal.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground leading-relaxed mt-2">
                  {openModal.description}
                </DialogDescription>
              </DialogHeader>
              <div className="overflow-hidden rounded-lg mt-4">
                <img
                  src={openModal.imageSrc}
                  alt={openModal.imageAlt}
                  className="w-full h-auto rounded-lg object-cover aspect-video"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export { Feature108 };
