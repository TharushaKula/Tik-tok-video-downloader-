import type { LandingTranslations } from "../types";

// Spanish copy for the tool landing pages. Structure (slug, platform,
// related pages, dates) comes from the English entry in lib/landing.

export const landing: LandingTranslations = {
  "tiktok-downloader": {
    name: "Descargador de TikTok",
    metaTitle: "Descargar videos de TikTok sin marca de agua (HD)",
    metaDescription:
      "Descarga videos de TikTok sin marca de agua en HD, guarda presentaciones de fotos o extrae el sonido en MP3. Gratis, rápido, sin registro ni apps.",
    h1: "Descarga videos de TikTok sin marca de agua",
    sub: "Pega cualquier enlace de TikTok y guarda el original limpio en HD. Incluye presentaciones de fotos y el audio en MP3.",
    highlights: [
      "Sin marca de agua, nunca",
      "Calidad HD y SD",
      "Presentaciones de fotos como imágenes",
      "Audio en MP3",
    ],
    sections: [
      {
        heading: "Por qué la marca de agua desaparece, no se oculta",
        body: [
          "El botón Guardar video de TikTok graba una marca de agua en movimiento dentro del archivo. ClipKoala obtiene la versión original limpia que TikTok almacena antes de aplicar la marca de agua, así que nada se recorta, se difumina ni se vuelve a codificar. Obtienes la misma resolución y tasa de bits que subió el creador.",
          "Cada resultado ofrece archivos MP4 en HD y SD, y un MP3 del audio. Las presentaciones de fotos muestran cada diapositiva como una imagen aparte, con un ZIP de un clic para todo el conjunto.",
        ],
      },
      {
        heading: "Qué enlaces de TikTok funcionan",
        body: [
          "Enlaces completos de video (tiktok.com/@usuario/video/...), enlaces cortos para compartir desde la app (vm.tiktok.com y vt.tiktok.com) y enlaces de presentaciones de fotos. Los videos privados, solo para amigos o eliminados no se pueden obtener.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo descargo un TikTok sin marca de agua?",
        a: "Abre TikTok, toca Compartir en el video, elige Copiar enlace y pégalo en ClipKoala. Elige Descargar HD y el MP4 sin marca de agua se guarda en tu dispositivo. No hay que editar ni recortar nada.",
      },
      {
        q: "¿Puedo descargar presentaciones de fotos de TikTok?",
        a: "Sí. Pega el enlace de la presentación y cada diapositiva aparece como una descarga de imagen aparte, junto con el audio en MP3 y un botón para descargar todo en ZIP.",
      },
      {
        q: "¿Puedo guardar solo el sonido de un TikTok?",
        a: "Sí. Cada resultado de TikTok incluye una opción para descargar el audio, que guarda el sonido como archivo MP3.",
      },
      {
        q: "¿Funciona en iPhone y Android?",
        a: "Sí. ClipKoala funciona en cualquier navegador móvil. En Android también puedes instalarlo como app y compartir TikToks directamente con él desde el menú Compartir.",
      },
    ],
  },

  "instagram-downloader": {
    name: "Descargador de Instagram",
    metaTitle: "Descargar Reels y videos de Instagram en HD gratis",
    metaDescription:
      "Descarga Reels, videos, fotos, carruseles y Stories públicas de Instagram en calidad completa. Gratis, rápido, sin iniciar sesión y sin apps.",
    h1: "Descarga Reels, videos y fotos de Instagram en HD",
    sub: "Pega el enlace de un Reel, una publicación, un carrusel o una Story pública y guarda el original en calidad completa en tu dispositivo.",
    highlights: [
      "Reels y publicaciones de video",
      "Fotos y carruseles",
      "Stories y destacadas públicas",
      "Sin iniciar sesión",
    ],
    sections: [
      {
        heading: "Todo lo que Instagram te deja ver, bien guardado",
        body: [
          "Instagram solo ofrece marcadores dentro de la app, que desaparecen cuando se elimina una publicación. ClipKoala te da un archivo de verdad: Reels y videos en MP4 con la mayor calidad que ofrece Instagram, fotos en JPG a resolución completa y carruseles con cada elemento listado, además de un ZIP con todo el conjunto.",
          "Las Stories y destacadas públicas funcionan mientras están publicadas. Nada requiere tu cuenta de Instagram y nunca te pedimos una contraseña.",
        ],
      },
      {
        heading: "Qué enlaces de Instagram funcionan",
        body: [
          "instagram.com/reel/..., instagram.com/p/..., instagram.com/tv/..., enlaces de Stories y enlaces de destacadas de cuentas públicas. Las publicaciones de cuentas privadas no se pueden obtener, por diseño.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo descargo un Reel de Instagram?",
        a: "Toca los tres puntos o la flecha de Compartir en el Reel, elige Copiar enlace y pégalo en ClipKoala. El MP4 en HD está listo en segundos.",
      },
      {
        q: "¿Necesito iniciar sesión en Instagram?",
        a: "No. ClipKoala funciona con cualquier publicación pública sin tu cuenta. Nunca pedimos credenciales.",
      },
      {
        q: "¿Puedo descargar de una cuenta privada?",
        a: "No. Solo se pueden obtener publicaciones, Reels y Stories públicas. El contenido privado y solo para seguidores sigue siendo privado.",
      },
      {
        q: "¿Puedo guardar un carrusel completo de una vez?",
        a: "Sí. Cada foto y video del carrusel aparece por separado, y un botón para descargar todo en ZIP reúne la publicación entera en un solo archivo.",
      },
    ],
  },

  "facebook-downloader": {
    name: "Descargador de Facebook",
    metaTitle: "Descargar videos de Facebook y Reels en HD gratis",
    metaDescription:
      "Descarga videos y Reels de Facebook en HD, incluidos enlaces fb.watch y compartidos. Gratis, sin registro, desde tu navegador en cualquier dispositivo.",
    h1: "Descarga videos y Reels de Facebook en HD",
    sub: "Funciona con enlaces de Watch, enlaces compartidos, enlaces cortos fb.watch y Reels. Se guardan en la mejor calidad que ofrece Facebook.",
    highlights: [
      "Videos y Reels",
      "Enlaces fb.watch y compartidos",
      "HD cuando está disponible",
      "Sin cuenta",
    ],
    sections: [
      {
        heading: "De una lista para ver más tarde a un archivo tuyo",
        body: [
          "Facebook te deja guardar videos en una lista dentro de Facebook, pero no en tu teléfono ni en tu PC. Pega cualquier enlace de video público en ClipKoala y obtienes un MP4 normal: en HD cuando Facebook lo ofrece, y en SD como alternativa más ligera.",
          "Las transmisiones en vivo se pueden guardar cuando termina la emisión y la repetición es pública. Los Reels funcionan exactamente igual que los videos normales.",
        ],
      },
      {
        heading: "Qué enlaces de Facebook funcionan",
        body: [
          "Enlaces facebook.com/watch, enlaces de publicaciones de video, enlaces de Reels, enlaces facebook.com/share/v/... y enlaces cortos fb.watch. Los videos dentro de grupos privados, eventos o publicaciones solo para amigos no se pueden obtener.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué enlaces de Facebook funcionan?",
        a: "Páginas de video, enlaces /watch, Reels, enlaces compartidos (facebook.com/share/v/...) y enlaces cortos fb.watch. Pega el que te dé la app.",
      },
      {
        q: "¿Por qué dice que el video es privado?",
        a: "Solo se pueden obtener videos públicos. No es posible acceder a videos restringidos a amigos, grupos o usuarios con sesión iniciada. Es intencionado.",
      },
      {
        q: "¿Qué calidad obtengo?",
        a: "La mejor calidad que Facebook ofrece para ese video, normalmente HD 720p o 1080p cuando está disponible, con una opción SD para archivos más pequeños.",
      },
    ],
  },

  "youtube-downloader": {
    name: "Descargador de YouTube",
    metaTitle: "Descargar videos de YouTube: MP4 hasta 1080p y MP3",
    metaDescription:
      "Descarga videos y Shorts de YouTube en MP4 de 360p a 1080p, o conviértelos a MP3. Progreso en vivo, gratis e ilimitado, sin instalar programas.",
    h1: "Descarga videos y Shorts de YouTube",
    sub: "Elige la calidad, de 360p a Full HD 1080p, o convierte directamente a MP3 con progreso en vivo. Las listas de reproducción y los canales se ponen en cola como un lote.",
    highlights: [
      "Videos y Shorts",
      "MP4 hasta 1080p",
      "Audio MP3, M4A, WAV y FLAC",
      "Listas de reproducción y canales",
    ],
    sections: [
      {
        heading: "La calidad que elijas, convertida al momento",
        body: [
          "YouTube transmite el video y el audio por separado, así que un descargador tiene que unirlos. ClipKoala lo hace al momento en la calidad que elijas, de 360p hasta 1080p, y muestra el progreso en vivo en el propio botón. La mayoría de los archivos están listos en segundos; los videos largos en HD pueden tardar hasta un minuto.",
          "¿Prefieres el audio? Elige MP3 a 320kbps, M4A, WAV o FLAC sin pérdida. Pega el enlace de una lista de reproducción o de un canal y sus videos más recientes se alinean como un lote que puedes guardar con un clic.",
        ],
      },
      {
        heading: "Qué enlaces de YouTube funcionan",
        body: [
          "youtube.com/watch, enlaces cortos youtu.be, youtube.com/shorts, enlaces de listas de reproducción y enlaces de canales o @usuario. Los videos con restricción de edad, solo para miembros o privados no se pueden obtener.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo convierto un video de YouTube a MP3?",
        a: "Pega el enlace del video y elige Descargar MP3. El audio se convierte a 320kbps y se guarda en tus descargas. Consulta la página específica de YouTube a MP3 para ver los detalles sobre M4A, WAV y FLAC.",
      },
      {
        q: "¿Por qué la descarga tarda un momento en empezar?",
        a: "Los archivos de YouTube se convierten a la calidad que elijas en el momento. Verás el progreso en vivo en el botón; la mayoría de los archivos están listos en segundos.",
      },
      {
        q: "¿Funcionan los Shorts y las listas de reproducción?",
        a: "Sí. Los enlaces youtube.com/shorts se descargan como cualquier video, y los enlaces de listas de reproducción o canales se convierten en un lote con sus videos más recientes.",
      },
      {
        q: "¿Puedo descargar videos de YouTube en 4K?",
        a: "Todavía no. Las descargas llegan hasta 1080p Full HD, que cubre la gran mayoría de los usos y mantiene las conversiones rápidas.",
      },
    ],
  },

  "youtube-to-mp3": {
    name: "YouTube a MP3",
    metaTitle: "Convertir YouTube a MP3 gratis a 320kbps online",
    metaDescription:
      "Convierte videos de YouTube a MP3 a 320kbps, o a M4A, WAV y FLAC sin pérdida. Convertidor online gratis con progreso en vivo, sin registro ni instalaciones.",
    h1: "Convierte YouTube a MP3 gratis y con la máxima calidad",
    sub: "Pega un enlace de YouTube y guarda el audio como MP3 a 320kbps, o elige M4A, WAV o FLAC sin pérdida. Progreso en vivo, sin programas.",
    highlights: [
      "MP3 a 320kbps",
      "También M4A, WAV y FLAC",
      "Progreso de conversión en vivo",
      "Listas de reproducción como lote",
    ],
    sections: [
      {
        heading: "¿Qué formato de audio deberías elegir?",
        body: [
          "El MP3 se reproduce en cualquier dispositivo y es la opción segura; ClipKoala siempre lo codifica a 320kbps, la tasa de bits más alta que admite el formato. El M4A (AAC) suena prácticamente igual con archivos más pequeños y es el formato nativo de los dispositivos Apple. El WAV no tiene compresión y ocupa mucho, útil si piensas editar el audio. El FLAC es compresión sin pérdida: el audio original exacto en aproximadamente la mitad del tamaño de un WAV, ideal para archivar música.",
          "Elijas lo que elijas, la conversión se hace en nuestros servidores y llega a tu navegador en cuanto está lista. No se instala nada en tu dispositivo.",
        ],
      },
      {
        heading: "Podcasts, clases, mezclas y listas de reproducción completas",
        body: [
          "Las grabaciones largas se convierten sin problema; la barra de progreso te mantiene al tanto y recibes una notificación si cambias de pestaña. Para convertir muchos videos, pega el enlace de una lista de reproducción y elige el formato de audio en cada elemento, o usa Guardar todo para la mejor opción disponible.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué tasa de bits tienen los archivos MP3?",
        a: "320kbps, el máximo que admite el MP3. No hay nada que configurar; todas las conversiones a MP3 se hacen con la máxima calidad.",
      },
      {
        q: "¿La conversión de YouTube a MP3 es gratis?",
        a: "Sí. No hay cuenta, no hay límite en el número de conversiones y no hay restricción de duración, más allá del tiempo que tarda en procesarse un video muy largo.",
      },
      {
        q: "¿Es legal convertir videos de YouTube a MP3?",
        a: "Convertir tus propios videos, contenido Creative Commons o audio que tienes permiso para usar está bien. Descargar música con derechos de autor sobre la que no tienes derechos puede infringir la ley y los términos de YouTube. Respeta los derechos de los creadores.",
      },
      {
        q: "¿Por qué el FLAC es mejor que el MP3 para archivar?",
        a: "El FLAC conserva cada bit del audio original, mientras que el MP3 descarta algo de detalle para reducir el archivo. Si quieres la mejor copia posible para una biblioteca de música, elige FLAC; si quieres compatibilidad y poco tamaño, elige MP3.",
      },
    ],
  },

  "twitter-downloader": {
    name: "Descargador de X (Twitter)",
    metaTitle: "Descargar videos de X (Twitter) y GIFs en HD",
    metaDescription:
      "Descarga videos y GIFs de X (Twitter) en HD. Pega cualquier enlace de publicación de x.com o twitter.com. Gratis, sin registro, en el teléfono o en el PC.",
    h1: "Descarga videos y GIFs de X (Twitter)",
    sub: "Pega cualquier enlace de publicación de x.com o twitter.com y guarda el video o el GIF en la mejor calidad disponible.",
    highlights: [
      "Videos de publicaciones en HD",
      "GIFs guardados como MP4",
      "Enlaces de x.com y twitter.com",
      "Sin cuenta",
    ],
    sections: [
      {
        heading: "El MP4 original, GIFs incluidos",
        body: [
          "X no tiene ninguna forma integrada de guardar el video de una publicación. ClipKoala obtiene el MP4 de mayor calidad que ofrece X, normalmente la resolución con la que se subió. Los GIFs animados de X en realidad son videos cortos en bucle, así que llegan como archivos MP4 pequeños que se reproducen en cualquier sitio.",
          "Las publicaciones con varios videos muestran cada uno por separado. El texto de la publicación se usa como nombre de archivo para que los clips sigan siendo reconocibles en tus descargas.",
        ],
      },
      {
        heading: "Qué enlaces de X funcionan",
        body: [
          "Enlaces x.com/usuario/status/... y twitter.com/usuario/status/..., incluidos los copiados desde la app. Las publicaciones de cuentas protegidas, el contenido con restricción de edad y las publicaciones solo para suscriptores no se pueden obtener.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo copio el enlace de una publicación en X?",
        a: "Toca el icono de compartir debajo de la publicación, elige Copiar enlace y pégalo en ClipKoala. Funcionan tanto los enlaces de x.com como los de twitter.com.",
      },
      {
        q: "¿Puedo descargar GIFs de X?",
        a: "Sí. Las publicaciones con GIF se guardan como clips MP4 cortos, que se reproducen en cualquier sitio y mantienen la calidad original.",
      },
      {
        q: "¿Por qué no se puede obtener una publicación?",
        a: "Las publicaciones de cuentas privadas o con restricción de edad, y las publicaciones sin ningún contenido multimedia, no se pueden descargar.",
      },
    ],
  },

  "reddit-downloader": {
    name: "Descargador de Reddit",
    metaTitle: "Descargar videos de Reddit con sonido (HD, gratis)",
    metaDescription:
      "Descarga videos de Reddit con sonido en HD. El video y el audio se unen automáticamente. Funciona con enlaces de publicaciones, compartidos y redd.it. Gratis.",
    h1: "Descarga videos de Reddit, con sonido",
    sub: "Reddit almacena el video y el audio por separado. ClipKoala te los da ya unidos, así que tu descarga se reproduce con sonido en cualquier reproductor.",
    highlights: [
      "Video y audio unidos",
      "GIFs en MP4",
      "Enlaces compartidos y redd.it",
      "Sin cuenta",
    ],
    sections: [
      {
        heading: "Por qué la mayoría de las descargas de Reddit no tienen sonido, y las nuestras sí",
        body: [
          "El servidor de video de Reddit, v.redd.it, sirve la imagen y el audio como dos transmisiones separadas. Si guardas el archivo de video directamente, obtienes silencio. ClipKoala procesa la publicación a través de un servicio que une las dos en un solo archivo y te lo envía, así que el MP4 que guardas se reproduce con sonido en todas partes, desde la galería de tu teléfono hasta un editor de video.",
          "Los GIFs y las publicaciones de imagen de Reddit también se descargan, y el título de la publicación se usa como nombre de archivo.",
        ],
      },
      {
        heading: "Qué enlaces de Reddit funcionan",
        body: [
          "Enlaces completos de publicaciones (reddit.com/r/.../comments/...), enlaces para compartir desde el móvil (reddit.com/r/.../s/...), enlaces cortos redd.it y enlaces directos de v.redd.it. Las publicaciones de subreddits privados o en cuarentena no se pueden obtener.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Por qué los videos de Reddit suelen descargarse sin sonido?",
        a: "Reddit sirve el video y el audio como transmisiones separadas. Aquí se unen en un solo archivo antes de llegar a ti, así que lo que guardas se reproduce con sonido en cualquier reproductor.",
      },
      {
        q: "¿Qué enlaces de Reddit funcionan?",
        a: "Enlaces completos de publicaciones, enlaces para compartir desde el móvil (reddit.com/r/.../s/...), enlaces cortos redd.it y enlaces directos de v.redd.it.",
      },
      {
        q: "¿Puedo descargar de subreddits privados?",
        a: "No. Solo se pueden obtener publicaciones visibles públicamente.",
      },
    ],
  },

  "pinterest-downloader": {
    name: "Descargador de Pinterest",
    metaTitle: "Descargar videos e imágenes de Pinterest en HD",
    metaDescription:
      "Descarga pines de video de Pinterest en MP4 y pines de imagen en resolución original. Funciona con enlaces pinterest.com y pin.it de cualquier país. Gratis.",
    h1: "Descarga videos y pines de imagen de Pinterest",
    sub: "Pega el enlace de un pin. Los pines de video se guardan en MP4 y los de imagen como originales a resolución completa, no como vistas previas comprimidas.",
    highlights: [
      "Pines de video en MP4",
      "Imágenes en calidad original",
      "Enlaces cortos pin.it",
      "Dominios de todos los países",
    ],
    sections: [
      {
        heading: "Originales, no miniaturas",
        body: [
          "Al hacer clic derecho en un pin, normalmente se guarda una vista previa reducida. ClipKoala busca la subida original, así que los pines de imagen llegan a resolución completa y los de video como archivos MP4 de verdad. Los Idea Pins con varias páginas muestran cada elemento por separado.",
        ],
      },
      {
        heading: "Qué enlaces de Pinterest funcionan",
        body: [
          "Enlaces pinterest.com/pin/... de cualquier dominio regional (pinterest.es, pinterest.com.mx, pinterest.co.uk, etc.) y enlaces cortos pin.it copiados desde la app. Los tableros secretos no se pueden obtener.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo copio el enlace de un pin?",
        a: "Abre el pin, toca el icono de compartir y elige Copiar enlace. Funcionan tanto los enlaces de pinterest.com como los enlaces cortos pin.it.",
      },
      {
        q: "¿También puedo descargar pines de imagen?",
        a: "Sí. Los pines de imagen se descargan como el archivo original a resolución completa, no como una vista previa comprimida.",
      },
      {
        q: "¿Funcionan dominios de otros países como pinterest.es?",
        a: "Sí. Todos los dominios regionales de Pinterest son compatibles, además de los enlaces cortos pin.it de la app.",
      },
    ],
  },

  "twitch-clip-downloader": {
    name: "Descargador de clips de Twitch",
    metaTitle: "Descargar clips de Twitch en MP4 hasta 1080p",
    metaDescription:
      "Descarga clips de Twitch en MP4 hasta 1080p. Pega cualquier enlace de clips.twitch.tv o twitch.tv/clip y elige la calidad. Gratis y sin registro.",
    h1: "Descarga clips de Twitch en HD",
    sub: "Pega cualquier enlace de un clip y guárdalo en MP4 en la calidad que elijas, hasta 1080p.",
    highlights: [
      "Clips en MP4",
      "Hasta 1080p",
      "Enlaces clips.twitch.tv y /clip",
      "Sin cuenta",
    ],
    sections: [
      {
        heading: "Conserva el momento cuando Twitch ya pasó a otra cosa",
        body: [
          "Los clips son lo más fácil de compartir en Twitch y lo más fácil de perder cuando se elimina un canal o se borra un clip. ClipKoala muestra todas las calidades que Twitch ofrece para un clip, normalmente de 360p a 1080p, y guarda la que elijas como un MP4 listo para editar o volver a publicar.",
        ],
      },
      {
        heading: "Qué enlaces de Twitch funcionan",
        body: [
          "Enlaces clips.twitch.tv/... y twitch.tv/canal/clip/.... Los VODs, las emisiones pasadas completas y las transmisiones en vivo todavía no son compatibles.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo consigo el enlace de un clip de Twitch?",
        a: "En el clip, haz clic en Compartir y copia el enlace. Funcionan tanto los enlaces clips.twitch.tv/... como los twitch.tv/canal/clip/....",
      },
      {
        q: "¿Qué calidades puedo descargar?",
        a: "Las que ofrezca el clip, normalmente de 360p hasta 1080p. ClipKoala muestra cada calidad disponible por separado.",
      },
      {
        q: "¿Puedo descargar VODs completos o transmisiones en vivo?",
        a: "Todavía no. Solo se admiten clips. Los canales, los VODs y las transmisiones en vivo no se pueden descargar.",
      },
    ],
  },

  "soundcloud-downloader": {
    name: "Descargador de SoundCloud",
    metaTitle: "Descargar canciones de SoundCloud en MP3",
    metaDescription:
      "Descarga canciones de SoundCloud en MP3 con la mejor calidad que permite quien las sube, con la portada. Pega cualquier enlace. Gratis y sin registro.",
    h1: "Descarga canciones de SoundCloud en MP3",
    sub: "Pega el enlace de una canción y guarda el audio con la mejor calidad que permite quien la subió, con la portada incluida.",
    highlights: [
      "Canciones en MP3",
      "Calidad original",
      "Portada incluida",
      "Sin cuenta",
    ],
    sections: [
      {
        heading: "Copias sin conexión de las canciones que te encantan",
        body: [
          "La escucha sin conexión de SoundCloud requiere una suscripción y se queda dentro de la app. ClipKoala guarda un MP3 normal que puedes reproducir en cualquier sitio, etiquetado con el título y el artista de la canción y acompañado de la portada. La calidad coincide con la que ofreció quien la subió.",
        ],
      },
      {
        heading: "Qué enlaces de SoundCloud funcionan",
        body: [
          "Enlaces soundcloud.com/artista/cancion y enlaces cortos on.soundcloud.com desde la app. Las canciones que quien las sube ha dejado solo como vista previa, y las canciones privadas, no se pueden guardar. Los enlaces de listas de reproducción y de perfiles todavía no son compatibles.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo copio el enlace de una canción de SoundCloud?",
        a: "Toca Compartir en la canción y elige Copiar enlace. Funcionan tanto los enlaces de soundcloud.com como los enlaces cortos on.soundcloud.com.",
      },
      {
        q: "¿Por qué algunas canciones no se pueden descargar?",
        a: "Algunos usuarios que suben música desactivan las descargas u ofrecen solo una vista previa. Esas canciones no se pueden guardar.",
      },
      {
        q: "¿Puedo descargar listas de reproducción completas?",
        a: "Todavía no. Pega los enlaces de las canciones una por una. Los enlaces de listas de reproducción y de perfiles no son compatibles.",
      },
    ],
  },

  "batch-video-downloader": {
    name: "Descarga por lotes",
    metaTitle: "Descargar varios videos a la vez: descarga por lotes",
    metaDescription:
      "Descarga varios videos a la vez de TikTok, YouTube, Instagram y más. Pega una lista de enlaces, importa un .txt o .csv o suelta una lista de YouTube. Gratis.",
    h1: "Descarga varios videos a la vez",
    sub: "Pega hasta 10 enlaces de cualquier combinación de plataformas, importa un .txt o .csv con enlaces o suelta una lista de reproducción de YouTube. Todo se obtiene en paralelo.",
    highlights: [
      "Hasta 10 enlaces por lote",
      "Mezcla plataformas libremente",
      "Importa .txt o .csv",
      "Guarda todo con un clic",
    ],
    sections: [
      {
        heading: "Pensado para editores, archivistas y los impacientes",
        body: [
          "Reunir clips para una edición, hacer una copia de seguridad de tus propias publicaciones o guardar una lista de reproducción antes de un vuelo no debería significar pegar enlaces de uno en uno. Pega una lista completa en ClipKoala y cambia automáticamente al modo por lotes: cada enlace tiene su propia fila con estado en vivo, opciones de calidad y un botón para reintentar, y Guardar todo descarga la mejor calidad de todo de una sola vez.",
          "Los enlaces pueden venir de una app de notas, una columna de una hoja de cálculo o un chat. También puedes importar un archivo .txt o .csv, o simplemente arrastrarlo a la página. Los enlaces de listas de reproducción y canales de YouTube se convierten en sus videos más recientes.",
        ],
      },
      {
        heading: "Cómo se mantienen rápidos los lotes",
        body: [
          "Los lotes tienen un máximo de 10 enlaces y se obtienen de tres en tres, lo que mantiene cada resultado rápido y evita sobrecargar las plataformas. Cuando termine un lote, pega el siguiente.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuántos videos puedo descargar a la vez?",
        a: "Hasta 10 por lote. Puedes hacer tantos lotes como quieras, uno tras otro.",
      },
      {
        q: "¿Puedo mezclar enlaces de TikTok, YouTube e Instagram en un mismo lote?",
        a: "Sí. La plataforma se detecta en cada enlace, así que cualquier combinación de las nueve plataformas compatibles funciona en un solo lote.",
      },
      {
        q: "¿Qué tipos de archivo puedo importar?",
        a: "Archivos .txt de texto plano con un enlace por línea y archivos .csv exportados desde hojas de cálculo. Las comillas, las comas y las columnas extra se gestionan automáticamente.",
      },
      {
        q: "¿Guardar todo elige la mejor calidad?",
        a: "Sí. Guardar todo toma la mejor opción de cada video. Despliega cualquier fila para elegir antes otro formato o calidad.",
      },
    ],
  },
};
