import type { LocaleMessages } from "../types";

// Spanish (neutral, "tú"). Typed against messages/en.ts; see its header for
// the rules every language follows.

export const messages: LocaleMessages = {
  client: {
    common: {
      paste: "Pegar",
      clear: "Borrar",
      dismiss: "Descartar",
      close: "Cerrar",
      retry: "Reintentar",
      save: "Guardar",
      new: "Nuevo",
      newAria: "Iniciar una nueva descarga",
      fetch: "Obtener",
      fetching: "Obteniendo…",
      freeForever: "Gratis para siempre",
      noSignUp: "Sin registro",
      nothingStored: "No guardamos nada",
    },

    menu: {
      open: "Abrir menú",
      close: "Cerrar menú",
      title: "Menú",
      downloaders: "Descargadores",
      downloadVideo: "Descargar un video",
    },

    theme: {
      label: "Tema",
      current: "Tema: {pref}, haz clic para cambiarlo",
      system: "sistema",
      light: "claro",
      dark: "oscuro",
    },

    language: {
      label: "Idioma",
      change: "Cambiar idioma",
    },

    tool: {
      serverUnreachable:
        "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
      serverError:
        "El servidor tuvo un problema inesperado. Espera un momento e inténtalo de nuevo.",
      unsupportedPlatform:
        "Ese enlace no es de una plataforma compatible. Pega un enlace de TikTok, Instagram, Facebook, YouTube, X, Reddit, Pinterest, Twitch o SoundCloud.",
      unexpected: "Error inesperado",
      linksDetected: {
        one: "{count} enlace detectado, obteniéndolo",
        other: "{count} enlaces detectados, obteniéndolos todos",
      },
      clipboardDenied: "El navegador denegó el acceso al portapapeles",
      clipboardEmpty: "Tu portapapeles está vacío",
      notSupportedLink: "Eso no parece un enlace compatible",
      dropFileHint: "Suelta un enlace o un archivo .txt/.csv con enlaces",
      noLinksInFile: "No se encontraron enlaces compatibles en ese archivo",
      fileReadError: "No se pudo leer ese archivo",
      clipboardNoticed: "Detectamos {what} en tu portapapeles",
      clipboardLinks: {
        one: "un enlace",
        other: "{count} enlaces",
      },
      playlistError: "No se pudo cargar esa lista de reproducción",
      channelError: "No se pudo cargar ese canal",
      playlistLoadedRecent:
        "Lista de reproducción cargada, obteniendo los {count} videos más recientes",
      channelLoadedRecent:
        "Canal cargado, obteniendo los {count} videos más recientes",
      playlistLoaded: {
        one: "Lista de reproducción cargada, obteniendo {count} video",
        other: "Lista de reproducción cargada, obteniendo {count} videos",
      },
      channelLoaded: {
        one: "Canal cargado, obteniendo {count} video",
        other: "Canal cargado, obteniendo {count} videos",
      },
      savedToFavorites: "Guardado en favoritos",
      removedFromFavorites: "Eliminado de favoritos",
      dropTitle: "Suelta un enlace o un .txt/.csv con enlaces",
      dropBody: "Detectaremos la plataforma y lo obtendremos todo al instante",
      linkBox: "cuadro de enlace",
      commands: "comandos",
    },

    url: {
      placeholder: "Pega un enlace de TikTok, YouTube, Instagram o cualquier video…",
      aria: "URL del video",
      clearLink: "Borrar enlace",
      pasteLinkAria: "Pegar enlace desde el portapapeles",
      batch: "Lote",
      batchAria: "Modo por lotes, pega varios enlaces",
      getVideo: "Obtener video",
      hintEmpty:
        "Pega un enlace, o varios a la vez. La plataforma se detecta automáticamente",
      hintPlaylist:
        "Lista de reproducción de YouTube detectada, obtendremos sus videos más recientes como un lote",
      hintChannel:
        "Canal de YouTube detectado, obtendremos sus subidas más recientes como un lote",
      hintDetected: "Enlace de {platform} detectado, pulsa Enter para obtenerlo",
      hintUnsupported: "Este enlace todavía no parece compatible",
      whichLinksWork: "qué enlaces funcionan",
      trustLine:
        "Solo publicaciones públicas, sin cuenta, y no guardamos nada en nuestro servidor.",
      privateWhy: "Por qué no se pueden obtener publicaciones privadas",
      importedLinks: {
        one: "Se importó {count} enlace de {file}",
        other: "Se importaron {count} enlaces de {file}",
      },
      batchPlaceholder:
        "Pega enlaces, uno por línea…\nhttps://www.tiktok.com/…\nhttps://youtu.be/…",
      batchTextAria: "URL de videos, una por línea",
      pasteLinksAria: "Pegar enlaces desde el portapapeles",
      importFile: "Importar archivo",
      importFileAria: "Importar enlaces desde un archivo .txt o .csv",
      singleLink: "Un solo enlace",
      singleLinkAria: "Volver a un solo enlace",
      fetchVideos: "Obtener videos",
      fetchCount: {
        one: "Obtener {count} video",
        other: "Obtener {count} videos",
      },
      batchHintEmpty:
        "Un enlace por línea, o pega cualquier texto y extraemos los enlaces por ti",
      batchValid: {
        one: "{count} enlace válido",
        other: "{count} enlaces válidos",
      },
      batchUnsupported: "no compatibles: {count}",
      batchCapped: "máximo {max} por lote",
      batchShortcut: "Ctrl/⌘ + Enter para obtener",
    },

    result: {
      sendToPhone: "Enviar al teléfono",
      sendToPhoneAria: "Enviar al teléfono con un código QR",
      continueOnPhone: "Continúa en tu teléfono",
      qrBody: "Escanea para abrir este video en ClipKoala en otro dispositivo.",
      zipError: "No se pudo crear el ZIP",
      zipSaved: "ZIP con {count} imágenes guardado",
      zipping: "Comprimiendo…",
      zipAll: "Descargar todo ({count}) en ZIP",
      previewUnavailable: "La vista previa no está disponible para este video",
      closePreview: "Cerrar vista previa",
      previewVideo: "Vista previa del video",
      removeFromSaved: "Quitar de guardados",
      saveToFavorites: "Guardar en favoritos",
      saved: "Guardado",
      saveThumbnail: "Guardar miniatura",
      saveThumbnailAria: "Guardar la imagen en miniatura",
      views: "reproducciones",
      likes: "me gusta",
      comments: "comentarios",
      shares: "compartidos",
      saveAs: "Guardar como",
      noteYouTube:
        "Los archivos de YouTube se convierten al momento: verás el progreso en vivo y la descarga empieza automáticamente cuando esté lista.",
      noteOther:
        "Los archivos se obtienen a través de nuestro servidor, así que no hay nada que instalar ni necesitas ninguna app.",
    },

    download: {
      preparingToast:
        "Preparando tu archivo, la descarga empezará cuando esté listo",
      startedToast: "Descarga iniciada, revisa las descargas de tu navegador",
      failed: "No se pudo iniciar la descarga",
      converting: "Convirtiendo · {percent}%",
      preparing: "Preparando…",
      inDownloads: "En tus descargas",
      started: "Iniciada",
      optionLabel: "Descargar {what}",
      audio: "audio",
      video: "video",
      image: "imagen",
    },

    batch: {
      title: "Descarga por lotes",
      progress: "{done} de {total} obtenidos",
      failedCount: "fallidos: {count}",
      startingAll:
        "Iniciando {count} descargas, puede que tu navegador te pida permiso para descargar varios archivos",
      saving: "Guardando…",
      saveAll: "Guardar todo ({count})",
      waiting: "En espera…",
      fetchingFrom: "Obteniendo de {platform}…",
      formats: {
        one: "{platform} · {count} formato",
        other: "{platform} · {count} formatos",
      },
      saveItemAria: "Guardar {title}",
      footnote:
        "Guardar todo descarga la mejor calidad de cada video. Despliega una fila para elegir otro formato.",
      fetchingVideo: "Obteniendo video…",
    },

    errors: {
      title: "No pudimos obtener este enlace",
      tipOpens: "Comprueba que el enlace se abre en tu navegador",
      tipPrivate:
        "Las publicaciones privadas, con restricción de edad o bloqueadas por región no se pueden obtener",
      tipRecopy: "Vuelve a copiar el enlace desde el botón Compartir de la app",
      tipStatusBefore: "¿Sigue pasando?",
      tipStatusLink: "Consulta la página de estado",
      tipStatusAfter: "para ver si la plataforma está caída",
      tryAgain: "Intentar de nuevo",
      details: "Detalles: {message}",
      classes: {
        unsupported_url:
          "ClipKoala no puede leer ese enlace. Comprueba que sea una publicación pública de una plataforma compatible.",
        private_or_restricted:
          "Esta publicación es privada, tiene restricción de edad o está limitada a algunas regiones, así que no se puede obtener.",
        not_found:
          "No se encontró esta publicación. Puede que se haya eliminado o que el enlace esté incompleto.",
        no_media:
          "No se encontró ningún video ni audio descargable en esta publicación.",
        rate_limited:
          "La plataforma está recibiendo demasiadas solicitudes ahora mismo. Espera un minuto e inténtalo de nuevo.",
        network:
          "La conexión se cortó mientras obteníamos la publicación. Revisa tu internet e inténtalo de nuevo.",
        resolver_down:
          "El servicio que lee esta plataforma está teniendo problemas. Inténtalo de nuevo en un momento.",
        unknown: "Algo salió mal al obtener este enlace.",
      },
    },

    share: {
      prompt: "¿Te resultó útil? Recomiéndale esta herramienta a alguien: {page}.",
      share: "Compartir",
      copyLink: "Copiar enlace",
      copied: "Copiado",
      copiedToast: "Enlace copiado, listo para pegar",
      clipboardBlocked: "Tu navegador bloqueó el acceso al portapapeles",
      fallbackPitch: "Descargador de videos gratis, sin registro",
      pitch: {
        tiktok: "Guarda TikToks en HD sin marca de agua, gratis y sin cuenta",
        youtube:
          "Descarga videos de YouTube en MP4 o los convierte a MP3, gratis y sin cuenta",
        instagram:
          "Guarda Reels, publicaciones y carruseles de Instagram en calidad completa, sin iniciar sesión",
        facebook: "Guarda videos y Reels de Facebook en HD, gratis y sin cuenta",
        twitter:
          "Guarda videos y GIFs de publicaciones de X en HD, gratis y sin cuenta",
        reddit:
          "Guarda videos de Reddit con el sonido incluido de verdad, gratis y sin cuenta",
        pinterest:
          "Guarda pines de video e imagen de Pinterest en resolución completa, sin cuenta",
        twitch: "Guarda clips de Twitch en MP4 hasta 1080p, gratis y sin cuenta",
        soundcloud:
          "Guarda pistas de SoundCloud en MP3 con la portada, sin cuenta",
      },
    },

    feedback: {
      thanks: "Gracias, de verdad nos ayuda.",
      job: {
        title: "¿Qué estabas guardando?",
        note: "Un toque. Solo nos dice qué usos mejorar.",
        options: {
          own_post: "Una publicación mía",
          reference_clip: "Un clip de referencia para una edición",
          audio_offline: "Audio para escuchar sin conexión",
          teaching: "Algo para una clase o lección",
          archive: "Archivar una publicación pública",
          other: "Otra cosa",
        },
      },
      exit: {
        title: "¿Qué te detuvo?",
        note: "Un toque, y ayuda más de lo que imaginas.",
        options: {
          error: "Falló con un error",
          unsupported: "Mi enlace no era compatible",
          quality: "No estaba la calidad que quería",
          trust: "No tenía claro si era seguro",
          slow: "Tardaba demasiado",
          browsing: "Nada, solo estaba mirando",
        },
      },
    },

    onboarding: {
      newHere: "¿Primera vez aquí?",
      body: "Abre cualquier video, toca su botón Compartir, copia el enlace y pégalo abajo. Las opciones de descarga aparecen en segundos, y si pegas varios enlaces a la vez se inicia un lote.",
      dismiss: "Descartar consejo",
    },

    recent: {
      title: "Recientes",
      aria: "Descargas recientes",
      justNow: "ahora mismo",
      minutesAgo: "hace {count} min",
      hoursAgo: "hace {count} h",
      daysAgo: "hace {count} d",
    },

    favorites: {
      title: "Guardados",
      aria: "Videos guardados",
      all: "Todos",
      tagPlaceholder: "nombre de la etiqueta",
      newTagAria: "Nueva etiqueta",
      addTag: "etiqueta",
      removeTag: "Quitar la etiqueta {tag}",
      editTags: "Editar etiquetas de {title}",
      remove: "Quitar {title} de guardados",
    },

    usage: {
      saved: {
        one: "Has guardado {count} video con ClipKoala",
        other: "Has guardado {count} videos con ClipKoala",
      },
      mostlyFrom: "sobre todo de",
    },

    filename: {
      settings: "Ajustes del nombre de archivo",
      title: "Nombres de los archivos descargados",
      body: "Crea tu propio patrón con las variables de abajo.",
      templateAria: "Plantilla del nombre de archivo",
      preview: "Vista previa",
      reset: "Restablecer el predeterminado",
      resetToast: "Patrón de nombre restablecido",
      vars: {
        title: "Título del video",
        author: "Autor / canal",
        platform: "Plataforma",
        quality: "Calidad",
        date: "Fecha de hoy",
      },
    },

    palette: {
      aria: "Paleta de comandos",
      placeholder: "Busca comandos, videos guardados, páginas…",
      noMatch: "No hay comandos que coincidan",
      groups: {
        actions: "Acciones",
        theme: "Tema",
        preferences: "Preferencias",
        saved: "Guardados",
        recent: "Recientes",
        goTo: "Ir a",
      },
      paste: "Pegar un enlace y obtenerlo",
      pasteHint: "desde el portapapeles",
      themeSystem: "Usar el tema del sistema",
      themeLight: "Cambiar al tema claro",
      themeDark: "Cambiar al tema oscuro",
      toggleSound: "Activar o desactivar el sonido al terminar",
      soundOn:
        "Sonido al terminar activado, oirás un tono suave cuando terminen las conversiones",
      soundOff: "Sonido al terminar desactivado",
      home: "Inicio",
      platforms: "Plataformas compatibles",
      howItWorks: "Cómo funciona",
      faq: "Preguntas frecuentes",
      changelog: "Novedades",
      status: "Estado: ¿funciona ClipKoala?",
      features: "Funciones",
      extension: "Extensión para el navegador",
      about: "Acerca de ClipKoala",
      guides: "Guías paso a paso",
    },
  },

  site: {
    meta: {
      homeTitle: "ClipKoala: descargador de videos gratis y sin registro",
      homeShortTitle: "ClipKoala: descargador de videos gratis",
      description:
        "Descarga videos gratis de TikTok, YouTube, Instagram y seis plataformas más. Guárdalos en HD sin marca de agua o saca el audio en MP3. Sin registro.",
      shortDescription:
        "Descargador de videos gratis para TikTok, YouTube, Instagram y seis plataformas más. HD, sin marca de agua, MP3. Sin registro.",
      tagline: "Guarda cualquier clip. Siempre limpio.",
      ogAlt:
        "ClipKoala: descargador de videos gratis para TikTok, YouTube, Instagram y más",
      ogEyebrow: "Descargador de videos gratis",
      ogSubtitle:
        "Descarga videos de 9 plataformas en HD sin marca de agua, o saca el audio en MP3. Sin registro, sin límites.",
      skipToContent: "Saltar al contenido",
    },

    nav: {
      homeAria: "Inicio de ClipKoala",
      primaryAria: "Principal",
      downloaders: "Descargadores",
      useCases: "Casos de uso",
      guides: "Guías",
      answers: "Respuestas",
      faq: "Preguntas frecuentes",
      howItWorks: "Cómo funciona",
      downloadVideo: "Descargar un video",
      about: "Acerca de",
      extension: "Extensión para el navegador",
      changelog: "Novedades",
      status: "Estado",
      glossary: "Glosario",
      privacy: "Privacidad",
    },

    footer: {
      blurb:
        "ClipKoala es un descargador de videos online gratis para nueve plataformas. HD, sin marca de agua, sin registro.",
      downloaders: "Descargadores",
      guides: "Guías",
      allGuides: "Todas las guías",
      answers: "Respuestas",
      allAnswers: "Todas las respuestas",
      audiences: "Para quién es",
      allUseCases: "Todos los casos de uso",
      product: "Producto",
      company: "Empresa",
      languages: "Idiomas",
      videoDownloader: "Descargador de videos",
      features: "Funciones",
      extension: "Extensión para el navegador",
      batch: "Descargas por lotes",
      changelog: "Novedades",
      roadmap: "Hoja de ruta",
      status: "Estado",
      rss: "Feed RSS",
      about: "Acerca de ClipKoala",
      faq: "Preguntas frecuentes",
      glossary: "Glosario",
      press: "Kit de prensa",
      accessibility: "Accesibilidad",
      terms: "Términos del servicio",
      privacy: "Política de privacidad",
      dmca: "Derechos de autor y DMCA",
      security: "Informar de un problema",
      inEnglish: "en inglés",
      disclaimer:
        "ClipKoala no está afiliado a TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch ni SoundCloud. Descarga solo contenido que te pertenezca o que tengas permiso para guardar.",
    },

    hero: {
      badge: "Gratis para siempre · Sin registro · 9 plataformas",
      titleLine1: "Descarga cualquier video.",
      titleLine2: "Limpio, rápido, tuyo.",
      body: "ClipKoala guarda videos de TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch y SoundCloud en HD, sin marca de agua. Pega un enlace, elige una calidad y listo. O quédate solo con el audio en MP3.",
      platformsAria: "Plataformas compatibles",
      mascotAlt:
        "Mascota de ClipKoala: un koala abrazando una claqueta con un botón de reproducción",
    },

    features: {
      eyebrow: "Por qué ClipKoala",
      title: "Todo lo que debe hacer un descargador de videos, y nada de lo que no",
      body: "Archivos limpios, opciones de calidad reales y una herramienta que respeta tu tiempo y tu privacidad.",
      seeAll: "Ver todas las funciones",
      items: [
        {
          title: "Sin marca de agua",
          body: "Los videos de TikTok llegan como el archivo original limpio. Nada se recorta, se difumina ni se vuelve a codificar.",
        },
        {
          title: "La mejor calidad disponible",
          body: "HD y Full HD hasta 1080p, a elegir en cada descarga. Siempre ves lo que vas a obtener antes de guardar.",
        },
        {
          title: "Audio en cualquier formato",
          body: "MP3 a 320kbps, M4A, WAV o FLAC sin pérdida desde YouTube. Audio en MP3 desde TikTok y SoundCloud.",
        },
        {
          title: "Descargas por lotes",
          body: "Pega hasta 10 enlaces, importa un .txt o .csv, o suelta una lista de reproducción de YouTube. Guarda todo con un clic.",
        },
        {
          title: "Privado por diseño",
          body: "Sin cuenta, sin registros de actividad vinculados a ti, nada almacenado. Tu historial vive solo en tu navegador.",
        },
        {
          title: "Rápido en cualquier dispositivo",
          body: "Resultados en unos dos segundos. Una página ligera que funciona con conexiones lentas y teléfonos antiguos.",
        },
      ],
    },

    how: {
      eyebrow: "Cómo funciona",
      title: "Tres pasos, unos diez segundos",
      body: "Sin cuenta, sin app, nada que instalar. Funciona en cualquier teléfono o PC.",
      steps: [
        {
          title: "Copia un enlace",
          desc: "Toca Compartir en TikTok, YouTube, Instagram o cualquier app compatible y copia el enlace del video.",
        },
        {
          title: "Pégalo en ClipKoala",
          desc: "La plataforma se detecta automáticamente y el video aparece con todos los formatos disponibles en unos dos segundos.",
        },
        {
          title: "Guarda tu archivo",
          desc: "Elige una calidad, MP4 en HD o audio en MP3, y el archivo llega a tus descargas con el nombre del video.",
        },
      ],
    },

    platforms: {
      eyebrow: "Plataformas compatibles",
      title: "Un solo descargador para todos tus feeds",
      body: "Pega un enlace de cualquiera de estas plataformas. ClipKoala la detecta y obtiene la mejor calidad disponible.",
      supports: {
        tiktok: [
          "Videos sin marca de agua",
          "Presentaciones de fotos",
          "Audio MP3",
        ],
        instagram: [
          "Reels y publicaciones de video",
          "Publicaciones de fotos",
          "Stories y destacadas",
        ],
        facebook: [
          "Videos y Reels",
          "Enlaces de Watch y compartidos",
          "Calidad HD",
        ],
        youtube: [
          "Videos, Shorts y listas de reproducción",
          "MP4 hasta 1080p",
          "Audio MP3",
        ],
        twitter: ["Videos de tuits", "GIFs en MP4", "Calidad HD"],
        reddit: [
          "Videos con sonido",
          "GIFs en MP4",
          "Enlaces compartidos y redd.it",
        ],
        pinterest: [
          "Pines de video",
          "Pines de imagen en HD",
          "Enlaces cortos pin.it",
        ],
        twitch: ["Clips en HD", "Hasta 1080p", "Enlaces de clips.twitch.tv"],
        soundcloud: ["Pistas en MP3", "Calidad original", "Portada"],
      },
    },

    trust: {
      eyebrow: "Basado en la confianza",
      title: "Un descargador que puedes recomendar a tu amigo menos tecnológico",
      body: "La mayoría de los sitios de descarga son un laberinto de botones falsos y ventanas emergentes. ClipKoala es un cuadro, un resultado y una lista clara de lo que vas a guardar.",
      mascotAlt:
        "El koala de ClipKoala abrazando una claqueta con un botón de reproducción",
      points: [
        {
          title: "Gratis, sin trampa",
          body: "Sin cuenta, sin muro de pago, sin límites de descarga, sin un nivel de calidad 'premium'. Todos los formatos están disponibles para todos.",
        },
        {
          title: "No guardamos tus enlaces",
          body: "Los enlaces se procesan y se descartan. Los archivos pasan en streaming y nunca se almacenan. El historial y los favoritos viven solo en tu navegador.",
        },
        {
          title: "Nunca pide tus contraseñas",
          body: "ClipKoala solo lee publicaciones públicas. No puede acceder a cuentas privadas y nunca solicita credenciales de las plataformas.",
        },
        {
          title: "Transparentes con la disponibilidad",
          body: "Una página de estado pública hace comprobaciones en vivo en cada plataforma, para que puedas ver con tus propios ojos cuándo algo no funciona.",
        },
      ],
    },

    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Tus preguntas, respondidas",
      more: "¿Tienes más preguntas?",
      readFull: "Lee todas las preguntas frecuentes",
      landingTitle: "Preguntas frecuentes: {name}",
      home: [
        {
          q: "¿Qué es ClipKoala?",
          a: "ClipKoala es un descargador de videos online gratis. Pega un enlace de TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch o SoundCloud y guarda el video en HD, sin marca de agua, o quédate con el audio en MP3. Funciona en tu navegador, sin cuenta y sin instalar ningún programa.",
        },
        {
          q: "¿Qué plataformas y formatos son compatibles?",
          a: "TikTok (videos sin marca de agua, presentaciones de fotos, MP3), Reels, publicaciones, carruseles y Stories públicas de Instagram, videos y Reels de Facebook, videos, Shorts, listas de reproducción y canales de YouTube (MP4 hasta 1080p o MP3, M4A, WAV, FLAC), videos y GIFs de X (Twitter), videos de Reddit con sonido, pines de video e imagen de Pinterest, clips de Twitch y pistas de SoundCloud en MP3.",
        },
        {
          q: "¿ClipKoala es realmente gratis?",
          a: "Sí. Todas las descargas, en todas las calidades, sin cuenta, sin límites y sin cargos ocultos.",
        },
        {
          q: "¿Las descargas de TikTok de verdad no tienen marca de agua?",
          a: "Sí. ClipKoala obtiene el archivo original que TikTok almacena antes de aplicar la marca de agua. Nada se recorta, se difumina ni se vuelve a codificar.",
        },
        {
          q: "¿Puedo descargar varios videos a la vez?",
          a: "Sí. Pega varios enlaces juntos, o usa el botón Lote, y ClipKoala obtiene hasta 10 a la vez. Cada video tiene su propia fila con opciones de calidad, y Guardar todo descarga la mejor calidad de todos de una sola vez.",
        },
        {
          q: "¿Puedo descargar videos privados?",
          a: "No. Solo se pueden obtener publicaciones públicas. El contenido privado, solo para seguidores o con restricción de edad no es accesible, por diseño, para respetar la privacidad de los creadores.",
        },
        {
          q: "¿Guardan mis enlaces o descargas?",
          a: "No. Los enlaces se procesan al momento y se descartan de inmediato. Los archivos pasan por nuestro servidor hasta tu navegador y nunca se conservan. Tu lista de descargas recientes vive solo en tu propio navegador y puedes borrarla cuando quieras.",
        },
        {
          q: "¿Está permitido descargar videos?",
          a: "Descargar está bien si se trata de tu propio contenido, de contenido que tienes permiso para guardar o de material de dominio público o Creative Commons. Respeta siempre los derechos de los creadores y los términos de servicio de cada plataforma.",
        },
      ],
    },

    cta: {
      title: "¿Todo listo para guardar tu primer clip?",
      body: "Pega un enlace de cualquiera de las nueve plataformas. Gratis, sin registro, en unos dos segundos.",
      label: "Descargar un video",
      homeTitle: "Guarda tu primer clip en los próximos diez segundos",
      homeBody:
        "Desplázate hacia arriba, pega un enlace y elige una calidad. Sin cuenta, sin límites, sin marca de agua.",
      homeLabel: "Volver al descargador",
      aria: "Empezar",
    },

    landing: {
      allPlatforms: "Todas las plataformas",
      aboutAria: "Acerca de este descargador",
      guideEyebrow: "Guía paso a paso",
      answersBefore: "Si un enlace falla, las causas más comunes se explican en",
      and: "y",
      audienceBefore: "Si esto forma parte de un trabajo más grande, el",
      audienceLink: "flujo de trabajo para {name}",
      audienceAfter: "lo explica de principio a fin.",
      moreDownloaders: "Más descargadores",
      ogEyebrowPlatform: "Descargador de {platform}",
      ogEyebrowGeneric: "Descargador de videos gratis",
      ogAlt: "Descargador de videos ClipKoala",
    },

    breadcrumbs: {
      aria: "Ruta de navegación",
      home: "Inicio",
    },

    notFound: {
      title: "Página no encontrada",
      heading: "Esta rama está vacía",
      body: "La página que buscabas se ha movido o nunca existió. El descargador está a un clic, y cada plataforma tiene su propia página.",
      cta: "Abrir el descargador",
    },
  },
};
