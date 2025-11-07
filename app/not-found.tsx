import Image from 'next/image';

export default function NotFound() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .not-found-container {
            align-items: flex-start !important;
            min-height: auto !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            margin-bottom: 0 !important;
          }
          main {
            padding-bottom: 0 !important;
          }
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }} className="not-found-container">
        <Image
          src="/404.png"
          alt="404 Not Found"
          width={1200}
          height={800}
          style={{ width: '100%', height: 'auto', maxWidth: '100%', objectFit: 'contain' }}
          priority
        />
      </div>
    </>
  );
}

