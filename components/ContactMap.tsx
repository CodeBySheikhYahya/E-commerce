interface ContactMapProps {
  embedUrl: string;
  className?: string;
}

export default function ContactMap({ embedUrl, className = "" }: ContactMapProps) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-full max-w-6xl">
        <div className="relative w-full aspect-[4/3] lg:aspect-[21/9]">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Contact Location Map"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
