import { Mail, MapPin, MessageCircle } from "lucide-react";

type ContactInfoPanelProps = {
  whatsappPhone: string;
  email: string;
  addressLines: string[];
  mapsQuery?: string;
  className?: string;
};

export default function ContactInfoPanel({
  whatsappPhone,
  email,
  addressLines,
  mapsQuery,
  className = "",
}: ContactInfoPanelProps) {
  const sanitizedPhone = whatsappPhone.replace(/[^0-9]/g, "");
  const whatsappHref = `https://wa.me/${sanitizedPhone}`;
  const mailHref = `mailto:${email}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapsQuery ?? addressLines.join(", ")
  )}`;

  return (
    <div
      className={`bg-white text-gray-800 p-6 sm:p-8 space-y-8 ${className}`}
    >
      <InfoRow
        href={whatsappHref}
        icon={<MessageCircle className="h-6 w-6 text-gray-600" />}
        title="Whatsapp"
        value={whatsappPhone}
      />

      <InfoRow
        href={mailHref}
        icon={<Mail className="h-6 w-6 text-gray-600" />}
        title="EMAIL"
        value={email}
      />

      <InfoRow
        href={mapsHref}
        icon={<MapPin className="h-6 w-6 text-gray-600" />}
        title="LOCATION"
        value={addressLines.join("\n")}
        multiline
      />
    </div>
  );
}

function InfoRow({
  href,
  icon,
  title,
  value,
  multiline = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-5 group"
    >
      <div className="shrink-0 grid place-items-center h-14 w-14 rounded-full bg-gray-100">
        <div className="p-1">{icon}</div>
      </div>
      <div className="flex-1">
        <div
          className="text-sm uppercase tracking-wide text-gray-900 inline-block border-b border-gray-500 pb-1 mb-1"
          style={{ fontFamily: "var(--header-font-family)" }}
        >
          {title}
        </div>
        {multiline ? (
          <p className="mt-2 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {value}
          </p>
        ) : (
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">{value}</p>
        )}
      </div>
    </a>
  );
}


