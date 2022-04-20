import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useScript from '../../libs/useScript';

const Head: React.FC = React.memo(() => {
  const ionModule = useScript(`https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js`, { type: 'module' });
  const ionNoModule = useScript(`https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js`, { noModule: true });
  useEffect(() => undefined, [ionModule, ionNoModule]);

  return (
    <Helmet>
      <html lang="ko" />
      <title>BOJ Print Prettier</title>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
      />
      <style>@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital@0;1&display=swap');</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
});

export default Head;
