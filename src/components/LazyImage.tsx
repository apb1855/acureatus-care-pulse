import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

const LazyImage = ({ src, alt, className, wrapperClassName, ...props }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => setError(true), []);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {/* Skeleton placeholder */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Failed to load</span>
        </div>
      )}

      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
