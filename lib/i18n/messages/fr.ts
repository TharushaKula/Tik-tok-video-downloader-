import type { LocaleMessages } from "../types";

// French (fr): standard international French, "vous" throughout.

export const messages: LocaleMessages = {
  client: {
    common: {
      paste: "Coller",
      clear: "Effacer",
      dismiss: "Ignorer",
      close: "Fermer",
      retry: "Réessayer",
      save: "Enregistrer",
      new: "Nouveau",
      newAria: "Lancer un nouveau téléchargement",
      fetch: "Récupérer",
      fetching: "Récupération…",
      freeForever: "Gratuit pour toujours",
      noSignUp: "Sans inscription",
      nothingStored: "Rien n'est conservé",
    },

    menu: {
      open: "Ouvrir le menu",
      close: "Fermer le menu",
      title: "Menu",
      downloaders: "Téléchargeurs",
      downloadVideo: "Télécharger une vidéo",
    },

    theme: {
      label: "Thème",
      current: "Thème : {pref}, cliquez pour changer",
      system: "système",
      light: "clair",
      dark: "sombre",
    },

    language: {
      label: "Langue",
      change: "Changer de langue",
    },

    tool: {
      serverUnreachable:
        "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
      serverError:
        "Le serveur a rencontré un problème inattendu. Patientez un instant et réessayez.",
      unsupportedPlatform:
        "Ce lien ne provient pas d'une plateforme prise en charge. Collez un lien TikTok, Instagram, Facebook, YouTube, X, Reddit, Pinterest, Twitch ou SoundCloud.",
      unexpected: "Erreur inattendue",
      linksDetected: {
        one: "{count} lien détecté, récupération en cours",
        other: "{count} liens détectés, récupération de tous les liens",
      },
      clipboardDenied: "Le navigateur a refusé l'accès au presse-papiers",
      clipboardEmpty: "Votre presse-papiers est vide",
      notSupportedLink: "Ce lien ne semble pas pris en charge",
      dropFileHint: "Déposez un lien, ou un fichier .txt/.csv de liens",
      noLinksInFile: "Aucun lien pris en charge dans ce fichier",
      fileReadError: "Impossible de lire ce fichier",
      clipboardNoticed: "Nous avons repéré {what} dans votre presse-papiers",
      clipboardLinks: {
        one: "un lien",
        other: "{count} liens",
      },
      playlistError: "Impossible de charger cette playlist",
      channelError: "Impossible de charger cette chaîne",
      playlistLoadedRecent:
        "Playlist chargée, récupération des {count} vidéos les plus récentes",
      channelLoadedRecent:
        "Chaîne chargée, récupération des {count} vidéos les plus récentes",
      playlistLoaded: {
        one: "Playlist chargée, récupération de {count} vidéo",
        other: "Playlist chargée, récupération de {count} vidéos",
      },
      channelLoaded: {
        one: "Chaîne chargée, récupération de {count} vidéo",
        other: "Chaîne chargée, récupération de {count} vidéos",
      },
      savedToFavorites: "Ajoutée aux favoris",
      removedFromFavorites: "Retirée des favoris",
      dropTitle: "Déposez un lien, ou un .txt/.csv de liens",
      dropBody:
        "Nous détectons la plateforme et récupérons tout immédiatement",
      linkBox: "champ du lien",
      commands: "commandes",
    },

    url: {
      placeholder: "Collez un lien TikTok, YouTube, Instagram ou toute autre vidéo…",
      aria: "URL de la vidéo",
      clearLink: "Effacer le lien",
      pasteLinkAria: "Coller le lien depuis le presse-papiers",
      batch: "Lot",
      batchAria: "Mode lot, collez plusieurs liens",
      getVideo: "Obtenir la vidéo",
      hintEmpty:
        "Collez un lien, ou plusieurs à la fois. La plateforme est détectée automatiquement",
      hintPlaylist:
        "Playlist YouTube détectée, nous récupérerons ses dernières vidéos en lot",
      hintChannel:
        "Chaîne YouTube détectée, nous récupérerons ses dernières mises en ligne en lot",
      hintDetected: "Lien {platform} détecté, appuyez sur Entrée pour le récupérer",
      hintUnsupported: "Ce lien ne semble pas encore pris en charge",
      whichLinksWork: "quels liens fonctionnent",
      trustLine:
        "Publications publiques uniquement, sans compte, et rien n'est conservé sur notre serveur.",
      privateWhy: "Pourquoi les publications privées sont inaccessibles",
      importedLinks: {
        one: "{count} lien importé depuis {file}",
        other: "{count} liens importés depuis {file}",
      },
      batchPlaceholder:
        "Collez les liens, un par ligne…\nhttps://www.tiktok.com/…\nhttps://youtu.be/…",
      batchTextAria: "URL des vidéos, une par ligne",
      pasteLinksAria: "Coller les liens depuis le presse-papiers",
      importFile: "Importer un fichier",
      importFileAria: "Importer des liens depuis un fichier .txt ou .csv",
      singleLink: "Lien unique",
      singleLinkAria: "Revenir au lien unique",
      fetchVideos: "Récupérer les vidéos",
      fetchCount: {
        one: "Récupérer {count} vidéo",
        other: "Récupérer {count} vidéos",
      },
      batchHintEmpty:
        "Un lien par ligne, ou collez n'importe quel texte : les liens sont extraits pour vous",
      batchValid: {
        one: "{count} lien valide",
        other: "{count} liens valides",
      },
      batchUnsupported: "{count} non pris en charge",
      batchCapped: "limité à {max} par lot",
      batchShortcut: "Ctrl/⌘ + Entrée pour récupérer",
    },

    result: {
      sendToPhone: "Envoyer sur le téléphone",
      sendToPhoneAria: "Envoyer sur le téléphone avec un QR code",
      continueOnPhone: "Continuer sur votre téléphone",
      qrBody: "Scannez pour ouvrir cette vidéo dans ClipKoala sur un autre appareil.",
      zipError: "Impossible de créer le ZIP",
      zipSaved: "ZIP de {count} images enregistré",
      zipping: "Compression…",
      zipAll: "Tout télécharger ({count}) en ZIP",
      previewUnavailable: "L'aperçu n'est pas disponible pour cette vidéo",
      closePreview: "Fermer l'aperçu",
      previewVideo: "Aperçu de la vidéo",
      removeFromSaved: "Retirer des favoris",
      saveToFavorites: "Ajouter aux favoris",
      saved: "Enregistrée",
      saveThumbnail: "Enregistrer la miniature",
      saveThumbnailAria: "Enregistrer l'image miniature",
      views: "vues",
      likes: "j'aime",
      comments: "commentaires",
      shares: "partages",
      saveAs: "Enregistrer en",
      noteYouTube:
        "Les fichiers YouTube sont convertis à la volée : vous suivez la progression en direct, et le téléchargement démarre automatiquement dès qu'il est prêt.",
      noteOther:
        "Les fichiers passent par notre serveur : rien à installer, aucune application nécessaire.",
    },

    download: {
      preparingToast:
        "Préparation de votre fichier, le téléchargement démarre dès qu'il est prêt",
      startedToast:
        "Téléchargement lancé, consultez les téléchargements de votre navigateur",
      failed: "Impossible de lancer le téléchargement",
      converting: "Conversion · {percent} %",
      preparing: "Préparation…",
      inDownloads: "Dans vos téléchargements",
      started: "Lancé",
      optionLabel: "Télécharger {what}",
      audio: "l'audio",
      video: "la vidéo",
      image: "l'image",
    },

    batch: {
      title: "Téléchargement par lot",
      progress: "{done} sur {total} récupérées",
      failedCount: "{count} en échec",
      startingAll:
        "Lancement de {count} téléchargements, votre navigateur peut vous demander d'autoriser plusieurs fichiers",
      saving: "Enregistrement…",
      saveAll: "Tout enregistrer ({count})",
      waiting: "En attente…",
      fetchingFrom: "Récupération depuis {platform}…",
      formats: {
        one: "{platform} · {count} format",
        other: "{platform} · {count} formats",
      },
      saveItemAria: "Enregistrer {title}",
      footnote:
        "Tout enregistrer prend la meilleure qualité pour chaque vidéo. Dépliez une ligne pour choisir un autre format.",
      fetchingVideo: "Récupération de la vidéo…",
    },

    errors: {
      title: "Impossible de récupérer ce lien",
      tipOpens: "Vérifiez que le lien s'ouvre dans votre navigateur",
      tipPrivate:
        "Les publications privées, soumises à une limite d'âge ou bloquées dans certaines régions sont inaccessibles",
      tipRecopy:
        "Recopiez le lien depuis le bouton Partager de l'application",
      tipStatusBefore: "Le problème persiste ?",
      tipStatusLink: "Consultez la page d'état",
      tipStatusAfter: "pour voir si la plateforme est en panne",
      tryAgain: "Réessayer",
      details: "Détails : {message}",
      classes: {
        unsupported_url:
          "ClipKoala ne peut pas lire ce lien. Vérifiez qu'il s'agit d'une publication publique d'une plateforme prise en charge.",
        private_or_restricted:
          "Cette publication est privée, soumise à une limite d'âge ou réservée à certaines régions, elle ne peut donc pas être récupérée.",
        not_found:
          "Cette publication est introuvable. Elle a peut-être été supprimée, ou le lien est incomplet.",
        no_media:
          "Aucune vidéo ni aucun audio téléchargeable n'a été trouvé dans cette publication.",
        rate_limited:
          "La plateforme reçoit trop de requêtes en ce moment. Patientez une minute et réessayez.",
        network:
          "La connexion a été interrompue pendant la récupération. Vérifiez votre connexion Internet et réessayez.",
        resolver_down:
          "Le service qui lit cette plateforme rencontre des problèmes. Réessayez dans un instant.",
        unknown: "Un problème est survenu lors de la récupération de ce lien.",
      },
    },

    share: {
      prompt: "Ça vous a été utile ? Partagez cet outil avec quelqu'un : {page}.",
      share: "Partager",
      copyLink: "Copier le lien",
      copied: "Copié",
      copiedToast: "Lien copié, prêt à coller",
      clipboardBlocked: "Votre navigateur a bloqué l'accès au presse-papiers",
      fallbackPitch: "Téléchargeur de vidéos gratuit, sans inscription",
      pitch: {
        tiktok:
          "Enregistre les TikTok en HD sans filigrane, gratuitement et sans compte",
        youtube:
          "Télécharge les vidéos YouTube en MP4 ou les convertit en MP3, gratuitement et sans compte",
        instagram:
          "Enregistre les Reels, publications et carrousels Instagram en pleine qualité, sans connexion",
        facebook:
          "Enregistre les vidéos et Reels Facebook en HD, gratuitement et sans compte",
        twitter:
          "Enregistre les vidéos et GIF des posts X en HD, gratuitement et sans compte",
        reddit:
          "Enregistre les vidéos Reddit avec le son bien intégré, gratuitement et sans compte",
        pinterest:
          "Enregistre les épingles vidéo et image Pinterest en pleine résolution, sans compte",
        twitch:
          "Enregistre les clips Twitch en MP4 jusqu'en 1080p, gratuitement et sans compte",
        soundcloud:
          "Enregistre les titres SoundCloud en MP3 avec la pochette, sans compte",
      },
    },

    feedback: {
      thanks: "Merci, ça nous aide vraiment.",
      job: {
        title: "Qu'enregistriez-vous ?",
        note: "Un seul clic. Cela nous indique simplement quels usages améliorer.",
        options: {
          own_post: "Une de mes propres publications",
          reference_clip: "Un extrait de référence pour un montage",
          audio_offline: "De l'audio à écouter hors ligne",
          teaching: "Quelque chose pour un cours",
          archive: "L'archivage d'une publication publique",
          other: "Autre chose",
        },
      },
      exit: {
        title: "Qu'est-ce qui vous a arrêté ?",
        note: "Un seul clic, et cela aide plus que vous ne le pensez.",
        options: {
          error: "Une erreur s'est produite",
          unsupported: "Mon lien n'était pas pris en charge",
          quality: "La qualité voulue n'était pas proposée",
          trust: "Je n'étais pas sûr que ce soit fiable",
          slow: "C'était trop long",
          browsing: "Rien, je regardais seulement",
        },
      },
    },

    onboarding: {
      newHere: "Nouveau ici ?",
      body: "Ouvrez une vidéo, appuyez sur son bouton Partager, copiez le lien et collez-le ci-dessous. Les options de téléchargement s'affichent en quelques secondes, et coller plusieurs liens à la fois lance un lot.",
      dismiss: "Masquer l'astuce",
    },

    recent: {
      title: "Récents",
      aria: "Téléchargements récents",
      justNow: "à l'instant",
      minutesAgo: "il y a {count} min",
      hoursAgo: "il y a {count} h",
      daysAgo: "il y a {count} j",
    },

    favorites: {
      title: "Favoris",
      aria: "Vidéos enregistrées",
      all: "Toutes",
      tagPlaceholder: "nom du tag",
      newTagAria: "Nouveau tag",
      addTag: "tag",
      removeTag: "Retirer le tag {tag}",
      editTags: "Modifier les tags de {title}",
      remove: "Retirer {title} des favoris",
    },

    usage: {
      saved: {
        one: "Vous avez enregistré {count} vidéo avec ClipKoala",
        other: "Vous avez enregistré {count} vidéos avec ClipKoala",
      },
      mostlyFrom: "surtout depuis",
    },

    filename: {
      settings: "Paramètres des noms de fichiers",
      title: "Noms des fichiers téléchargés",
      body: "Créez votre propre modèle avec les variables ci-dessous.",
      templateAria: "Modèle de nom de fichier",
      preview: "Aperçu",
      reset: "Rétablir par défaut",
      resetToast: "Modèle de nom de fichier rétabli",
      vars: {
        title: "Titre de la vidéo",
        author: "Auteur / chaîne",
        platform: "Plateforme",
        quality: "Qualité",
        date: "Date du jour",
      },
    },

    palette: {
      aria: "Palette de commandes",
      placeholder: "Rechercher des commandes, des vidéos enregistrées, des pages…",
      noMatch: "Aucune commande correspondante",
      groups: {
        actions: "Actions",
        theme: "Thème",
        preferences: "Préférences",
        saved: "Favoris",
        recent: "Récents",
        goTo: "Aller à",
      },
      paste: "Coller un lien et le récupérer",
      pasteHint: "depuis le presse-papiers",
      themeSystem: "Utiliser le thème du système",
      themeLight: "Passer au thème clair",
      themeDark: "Passer au thème sombre",
      toggleSound: "Activer ou désactiver le son de fin",
      soundOn:
        "Son de fin activé, un léger carillon retentit à la fin des conversions",
      soundOff: "Son de fin désactivé",
      home: "Accueil",
      platforms: "Plateformes prises en charge",
      howItWorks: "Comment ça marche",
      faq: "FAQ",
      changelog: "Nouveautés",
      status: "État : ClipKoala fonctionne-t-il ?",
      features: "Fonctionnalités",
      extension: "Extension de navigateur",
      about: "À propos de ClipKoala",
      guides: "Guides pratiques",
    },
  },

  site: {
    meta: {
      homeTitle: "ClipKoala : téléchargeur de vidéos gratuit, sans inscription",
      homeShortTitle: "ClipKoala : téléchargeur de vidéos gratuit",
      description:
        "Téléchargeur de vidéos gratuit pour TikTok, YouTube, Instagram et six autres plateformes. En HD sans filigrane, ou l'audio en MP3. Sans inscription.",
      shortDescription:
        "Téléchargeur de vidéos gratuit pour TikTok, YouTube, Instagram et six autres plateformes. HD, sans filigrane, MP3.",
      tagline: "Enregistrez n'importe quel clip. Gardez-le net.",
      ogAlt:
        "ClipKoala : téléchargeur de vidéos gratuit pour TikTok, YouTube, Instagram et plus",
      ogEyebrow: "Téléchargeur de vidéos gratuit",
      ogSubtitle:
        "Téléchargez des vidéos de 9 plateformes en HD sans filigrane, ou récupérez l'audio en MP3. Sans inscription, sans limites.",
      skipToContent: "Aller au contenu",
    },

    nav: {
      homeAria: "Accueil ClipKoala",
      primaryAria: "Principal",
      downloaders: "Téléchargeurs",
      useCases: "Cas d'usage",
      guides: "Guides",
      answers: "Réponses",
      faq: "FAQ",
      howItWorks: "Comment ça marche",
      downloadVideo: "Télécharger une vidéo",
      about: "À propos",
      extension: "Extension de navigateur",
      changelog: "Nouveautés",
      status: "État",
      glossary: "Glossaire",
      privacy: "Confidentialité",
    },

    footer: {
      blurb:
        "ClipKoala est un téléchargeur de vidéos en ligne gratuit pour neuf plateformes. HD, sans filigrane, sans inscription.",
      downloaders: "Téléchargeurs",
      guides: "Guides",
      allGuides: "Tous les guides",
      answers: "Réponses",
      allAnswers: "Toutes les réponses",
      audiences: "Pour qui",
      allUseCases: "Tous les cas d'usage",
      product: "Produit",
      company: "Entreprise",
      languages: "Langues",
      videoDownloader: "Téléchargeur de vidéos",
      features: "Fonctionnalités",
      extension: "Extension de navigateur",
      batch: "Téléchargements par lot",
      changelog: "Nouveautés",
      roadmap: "Feuille de route",
      status: "État",
      rss: "Flux RSS",
      about: "À propos de ClipKoala",
      faq: "FAQ",
      glossary: "Glossaire",
      press: "Kit presse",
      accessibility: "Accessibilité",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      dmca: "Droits d'auteur et DMCA",
      security: "Signaler un problème",
      inEnglish: "en anglais",
      disclaimer:
        "ClipKoala n'est affilié ni à TikTok, ni à YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch ou SoundCloud. Ne téléchargez que des contenus qui vous appartiennent ou que vous avez l'autorisation d'enregistrer.",
    },

    hero: {
      badge: "Gratuit pour toujours · Sans inscription · 9 plateformes",
      titleLine1: "Téléchargez n'importe quelle vidéo.",
      titleLine2: "Nette, rapide, à vous.",
      body: "ClipKoala enregistre les vidéos de TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch et SoundCloud en HD, sans filigrane. Collez un lien, choisissez une qualité, c'est fait. Ou récupérez seulement l'audio en MP3.",
      platformsAria: "Plateformes prises en charge",
      mascotAlt:
        "Mascotte de ClipKoala : un koala serrant un clap de cinéma orné d'un bouton lecture",
    },

    features: {
      eyebrow: "Pourquoi ClipKoala",
      title: "Tout ce qu'un téléchargeur de vidéos doit faire, rien de superflu",
      body: "Des fichiers propres, de vrais choix de qualité, et un outil qui respecte votre temps et votre vie privée.",
      seeAll: "Voir toutes les fonctionnalités",
      items: [
        {
          title: "Sans filigrane",
          body: "Les vidéos TikTok arrivent sous forme de fichier original propre. Rien n'est recadré, flouté ou réencodé.",
        },
        {
          title: "La meilleure qualité disponible",
          body: "HD et Full HD jusqu'en 1080p, au choix pour chaque téléchargement. Vous voyez toujours ce que vous obtenez avant d'enregistrer.",
        },
        {
          title: "L'audio dans tous les formats",
          body: "MP3 à 320 kbps, M4A, WAV ou FLAC sans perte depuis YouTube. Bandes-son en MP3 depuis TikTok et SoundCloud.",
        },
        {
          title: "Téléchargements par lot",
          body: "Collez jusqu'à 10 liens, importez un .txt ou un .csv, ou déposez une playlist YouTube. Tout enregistrer en un clic.",
        },
        {
          title: "Confidentiel par conception",
          body: "Pas de compte, aucun journal lié à vous, rien n'est conservé. Votre historique reste uniquement dans votre navigateur.",
        },
        {
          title: "Rapide sur tous les appareils",
          body: "Des résultats en deux secondes environ. Une page légère qui fonctionne avec une connexion lente et sur les vieux téléphones.",
        },
      ],
    },

    how: {
      eyebrow: "Comment ça marche",
      title: "Trois étapes, une dizaine de secondes",
      body: "Pas de compte, pas d'application, rien à installer. Fonctionne sur n'importe quel téléphone ou ordinateur.",
      steps: [
        {
          title: "Copiez un lien",
          desc: "Appuyez sur Partager dans TikTok, YouTube, Instagram ou toute application prise en charge, puis copiez le lien de la vidéo.",
        },
        {
          title: "Collez-le dans ClipKoala",
          desc: "La plateforme est détectée automatiquement et la vidéo s'affiche avec tous les formats disponibles en deux secondes environ.",
        },
        {
          title: "Enregistrez votre fichier",
          desc: "Choisissez une qualité, MP4 en HD ou audio en MP3, et le fichier arrive dans vos téléchargements, nommé d'après la vidéo.",
        },
      ],
    },

    platforms: {
      eyebrow: "Plateformes prises en charge",
      title: "Un seul téléchargeur pour tous vos fils",
      body: "Collez un lien de l'une de ces plateformes. ClipKoala la détecte et récupère la meilleure qualité disponible.",
      supports: {
        tiktok: ["Vidéos sans filigrane", "Diaporamas photo", "Audio MP3"],
        instagram: [
          "Reels et publications vidéo",
          "Publications photo",
          "Stories et à la une",
        ],
        facebook: ["Vidéos et Reels", "Liens watch et de partage", "Qualité HD"],
        youtube: ["Vidéos, Shorts et playlists", "MP4 jusqu'en 1080p", "Audio MP3"],
        twitter: ["Vidéos de posts", "GIF en MP4", "Qualité HD"],
        reddit: ["Vidéos avec le son", "GIF en MP4", "Liens de partage et redd.it"],
        pinterest: ["Épingles vidéo", "Épingles image en HD", "Liens courts pin.it"],
        twitch: ["Clips en HD", "Jusqu'en 1080p", "Liens clips.twitch.tv"],
        soundcloud: ["Titres en MP3", "Qualité d'origine", "Pochette"],
      },
    },

    trust: {
      eyebrow: "Fondé sur la confiance",
      title: "Un téléchargeur à recommander même à vos amis les moins technophiles",
      body: "La plupart des sites de téléchargement sont un labyrinthe de faux boutons et de pop-ups. ClipKoala, c'est un champ, un résultat, et une liste claire de ce que vous allez enregistrer.",
      mascotAlt:
        "Le koala de ClipKoala serrant un clap de cinéma orné d'un bouton lecture",
      points: [
        {
          title: "Gratuit, sans piège",
          body: "Pas de compte, pas de paywall, pas de limite de téléchargements, pas de qualité « premium ». Tous les formats sont accessibles à tous.",
        },
        {
          title: "Nous ne gardons pas vos liens",
          body: "Les liens sont traités puis supprimés. Les fichiers transitent sans jamais être stockés. Historique et favoris restent uniquement dans votre navigateur.",
        },
        {
          title: "Ne demande jamais vos mots de passe",
          body: "ClipKoala ne lit que les publications publiques. Il ne peut pas accéder aux comptes privés et ne demande jamais vos identifiants des plateformes.",
        },
        {
          title: "Transparent sur la disponibilité",
          body: "Une page d'état publique effectue des vérifications en direct sur chaque plateforme, pour que vous voyiez par vous-même quand quelque chose ne fonctionne pas.",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "Vos questions, nos réponses",
      more: "D'autres questions ?",
      readFull: "Lire la FAQ complète",
      landingTitle: "Questions sur : {name}",
      home: [
        {
          q: "Qu'est-ce que ClipKoala ?",
          a: "ClipKoala est un téléchargeur de vidéos en ligne gratuit. Collez un lien TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch ou SoundCloud et enregistrez la vidéo en HD, sans filigrane, ou récupérez l'audio en MP3. Il fonctionne dans votre navigateur, sans compte et sans logiciel à installer.",
        },
        {
          q: "Quelles plateformes et quels formats sont pris en charge ?",
          a: "TikTok (vidéos sans filigrane, diaporamas photo, MP3), les Reels, publications, carrousels et Stories publiques Instagram, les vidéos et Reels Facebook, les vidéos, Shorts, playlists et chaînes YouTube (MP4 jusqu'en 1080p ou MP3, M4A, WAV, FLAC), les vidéos et GIF de X (Twitter), les vidéos Reddit avec le son, les épingles vidéo et image Pinterest, les clips Twitch et les titres SoundCloud en MP3.",
        },
        {
          q: "ClipKoala est-il vraiment gratuit ?",
          a: "Oui. Chaque téléchargement, dans toutes les qualités, sans compte, sans limites et sans frais cachés.",
        },
        {
          q: "Les téléchargements TikTok sont-ils vraiment sans filigrane ?",
          a: "Oui. ClipKoala récupère le fichier original que TikTok stocke avant l'ajout du filigrane. Rien n'est recadré, flouté ou réencodé.",
        },
        {
          q: "Puis-je télécharger plusieurs vidéos à la fois ?",
          a: "Oui. Collez plusieurs liens ensemble, ou utilisez le bouton Lot, et ClipKoala en récupère jusqu'à 10 à la fois. Chaque vidéo a sa propre ligne avec les options de qualité, et Tout enregistrer prend la meilleure qualité pour l'ensemble en une seule fois.",
        },
        {
          q: "Puis-je télécharger des vidéos privées ?",
          a: "Non. Seules les publications publiques peuvent être récupérées. Les contenus privés, réservés aux abonnés ou soumis à une limite d'âge sont inaccessibles, volontairement, pour respecter la vie privée des créateurs.",
        },
        {
          q: "Conservez-vous mes liens ou mes téléchargements ?",
          a: "Non. Les liens sont traités à la volée puis supprimés immédiatement. Les fichiers transitent par notre serveur jusqu'à votre navigateur et ne sont jamais conservés. La liste de vos téléchargements récents reste uniquement dans votre navigateur et peut être effacée à tout moment.",
        },
        {
          q: "Est-il permis de télécharger des vidéos ?",
          a: "Le téléchargement est permis pour vos propres contenus, les contenus que vous avez l'autorisation d'enregistrer, et les médias du domaine public ou sous licence Creative Commons. Respectez toujours les droits des créateurs et les conditions d'utilisation de chaque plateforme.",
        },
      ],
    },

    cta: {
      title: "Prêt à enregistrer votre premier clip ?",
      body: "Collez un lien de l'une des neuf plateformes. Gratuit, sans inscription, en deux secondes environ.",
      label: "Télécharger une vidéo",
      homeTitle: "Enregistrez votre premier clip dans les dix prochaines secondes",
      homeBody:
        "Remontez, collez un lien et choisissez une qualité. Sans compte, sans limites, sans filigrane.",
      homeLabel: "Retour au téléchargeur",
      aria: "Commencer",
    },

    landing: {
      allPlatforms: "Toutes les plateformes",
      aboutAria: "À propos de ce téléchargeur",
      guideEyebrow: "Guide pas à pas",
      answersBefore: "Si un lien échoue, les causes les plus fréquentes sont expliquées dans",
      and: "et",
      audienceBefore: "Si cela fait partie d'un projet plus large, le",
      audienceLink: "déroulé pour {name}",
      audienceAfter: "détaille l'ensemble.",
      moreDownloaders: "Plus de téléchargeurs",
      ogEyebrowPlatform: "Téléchargeur {platform}",
      ogEyebrowGeneric: "Téléchargeur de vidéos gratuit",
      ogAlt: "Téléchargeur de vidéos ClipKoala",
    },

    breadcrumbs: {
      aria: "Fil d'Ariane",
      home: "Accueil",
    },

    notFound: {
      title: "Page introuvable",
      heading: "Cette branche est vide",
      body: "La page que vous cherchez a été déplacée ou n'a jamais existé. Le téléchargeur est à un clic, et chaque plateforme a sa propre page.",
      cta: "Ouvrir le téléchargeur",
    },
  },
};
