"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface MediaItemType {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
}

const MediaItem = ({ item, className, onClick }: { item: MediaItemType; className?: string; onClick?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    const options = { root: null, rootMargin: '50px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsInView(entry.isIntersecting));
    }, options);
    if (videoRef.current) observer.observe(videoRef.current);
    return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
  }, []);

  useEffect(() => {
    let mounted = true;
    const handleVideoPlay = async () => {
      if (!videoRef.current || !isInView || !mounted) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise((resolve) => {
            if (videoRef.current) videoRef.current.oncanplay = resolve;
          });
          if (mounted) {
            setIsBuffering(false);
            await videoRef.current.play();
          }
        }
      } catch (error) {
        console.warn("Video playback failed:", error);
      }
    };
    if (isInView) handleVideoPlay();
    else if (videoRef.current) videoRef.current.pause();
    return () => {
      mounted = false;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [isInView]);

  if (item.type === 'video') {
    return (
      <div className={`relative w-full h-full ${className}`} onClick={onClick}>
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            src={item.url}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-xl">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={`w-full h-full object-cover rounded-xl ${className}`}
      onClick={onClick}
    />
  );
};

interface GalleryModalProps {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType | null) => void;
  mediaItems: MediaItemType[];
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md"
        onClick={onClose}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <MediaItem item={selectedItem} className="w-full h-full rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/60 to-transparent rounded-b-2xl">
              <h3 className="text-lg font-display font-bold text-primary-foreground">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-primary-foreground/80">
                {selectedItem.desc}
              </p>
            </div>
          </motion.div>
        </div>

        <button
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }));
        }}
        className="fixed z-50 left-1/2 bottom-4 -translate-x-1/2 touch-none"
      >
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}>
          <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-card/90 border border-border backdrop-blur-lg shadow-lg">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }}
                className={`relative group w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:z-20 ${
                  selectedItem.id === item.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:ring-2 hover:ring-primary/30'
                }`}
                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 0,
                  y: -10,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
              >
                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-colors" />
                {selectedItem.id === item.id && (
                  <motion.div layoutId="active-dock" className="absolute inset-0 ring-2 ring-primary rounded-lg" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItemType[];
  title: string;
  description: string;
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {description}
        </p>
      </div>

      <div className="relative">
        <AnimatePresence>
          {selectedItem ? (
            <GalleryModal
              selectedItem={selectedItem}
              isOpen={!!selectedItem}
              onClose={() => setSelectedItem(null)}
              setSelectedItem={setSelectedItem}
              mediaItems={items}
            />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[120px] md:auto-rows-[150px]"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`relative overflow-hidden rounded-xl cursor-pointer bg-card border border-border ${item.span}`}
                  onClick={() => !isDragging && setSelectedItem(item)}
                  variants={{
                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                    visible: {
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      transition: { type: 'spring', stiffness: 350, damping: 25, delay: index * 0.05 },
                    },
                  }}
                  whileHover={{ scale: 1.02 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(_, info) => {
                    setIsDragging(false);
                    const moveDistance = info.offset.x + info.offset.y;
                    if (Math.abs(moveDistance) > 50) {
                      const newItems = [...items];
                      const draggedItem = newItems[index];
                      const targetIndex =
                        moveDistance > 0
                          ? Math.min(index + 1, items.length - 1)
                          : Math.max(index - 1, 0);
                      newItems.splice(index, 1);
                      newItems.splice(targetIndex, 0, draggedItem);
                      setItems(newItems);
                    }
                  }}
                >
                  <MediaItem item={item} className="w-full h-full" onClick={() => !isDragging && setSelectedItem(item)} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="w-8 h-[2px] bg-secondary mb-2" />
                      <h3 className="text-sm font-display font-bold text-primary-foreground">
                        {item.title}
                      </h3>
                      <p className="text-xs text-primary-foreground/80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveBentoGallery;
