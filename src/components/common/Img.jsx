import { useState } from 'react';

export default function Img({ src, fallbackSeed, alt = '', className = '', ...rest }) {
  const [errored, setErrored] = useState(false);
  const fallback = `https://picsum.photos/seed/${fallbackSeed || alt || 'estateai'}/900/650`;

  return (
    <img
      src={errored ? fallback : src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={className}
      {...rest}
    />
  );
}
