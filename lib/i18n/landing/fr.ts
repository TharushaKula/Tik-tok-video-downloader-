import type { LandingTranslations } from "../types";

// French (fr) copy for the tool landing pages. Structure (slug, platform,
// related pages, dates) comes from the English entries in lib/landing.

export const landing: LandingTranslations = {
  "tiktok-downloader": {
    name: "Téléchargeur TikTok",
    metaTitle: "Télécharger vidéo TikTok sans filigrane en HD",
    metaDescription:
      "Téléchargez des vidéos TikTok sans filigrane en HD, enregistrez les diaporamas photo ou extrayez le son en MP3. Gratuit, rapide, sans inscription ni appli.",
    h1: "Télécharger une vidéo TikTok sans filigrane",
    sub: "Collez n'importe quel lien TikTok et enregistrez l'original HD propre. Diaporamas photo et bandes-son MP3 inclus.",
    highlights: [
      "Jamais de filigrane",
      "Qualité HD et SD",
      "Diaporamas photo en images",
      "Bande-son en MP3",
    ],
    sections: [
      {
        heading: "Pourquoi le filigrane est absent, et pas masqué",
        body: [
          "Le bouton Enregistrer la vidéo de TikTok incruste un filigrane mobile dans le fichier. ClipKoala récupère la version originale propre que TikTok stocke avant l'ajout du filigrane : rien n'est recadré, flouté ou réencodé. Vous obtenez la même résolution et le même débit que ceux envoyés par le créateur.",
          "Chaque résultat propose des fichiers MP4 en HD et en SD, ainsi qu'un MP3 de la bande-son. Pour les diaporamas photo, chaque diapositive s'affiche comme une image distincte, avec un ZIP de l'ensemble en un clic.",
        ],
      },
      {
        heading: "Quels liens TikTok fonctionnent",
        body: [
          "Les liens complets de vidéos (tiktok.com/@user/video/...), les liens de partage courts de l'application (vm.tiktok.com et vt.tiktok.com) et les liens de diaporamas photo. Les vidéos privées, réservées aux amis ou supprimées ne peuvent pas être récupérées.",
        ],
      },
    ],
    faqs: [
      {
        q: "Comment télécharger un TikTok sans filigrane ?",
        a: "Ouvrez TikTok, appuyez sur Partager sous la vidéo, choisissez Copier le lien et collez-le dans ClipKoala. Choisissez le téléchargement HD et le MP4 sans filigrane est enregistré sur votre appareil. Aucun montage ni recadrage n'est nécessaire.",
      },
      {
        q: "Puis-je télécharger les diaporamas photo TikTok ?",
        a: "Oui. Collez le lien d'un diaporama : chaque diapositive apparaît comme une image à télécharger séparément, avec la bande-son en MP3 et un bouton pour tout télécharger en ZIP.",
      },
      {
        q: "Puis-je enregistrer uniquement le son d'un TikTok ?",
        a: "Oui. Chaque résultat TikTok comprend une option de téléchargement audio qui enregistre la bande-son en fichier MP3.",
      },
      {
        q: "Est-ce que ça fonctionne sur iPhone et Android ?",
        a: "Oui. ClipKoala fonctionne dans n'importe quel navigateur mobile. Sur Android, vous pouvez aussi l'installer comme une application et y partager vos TikTok directement depuis le menu de partage.",
      },
    ],
  },

  "instagram-downloader": {
    name: "Téléchargeur Instagram",
    metaTitle: "Télécharger Reels et vidéos Instagram en HD",
    metaDescription:
      "Téléchargez les Reels, vidéos, photos, carrousels et Stories publiques Instagram en pleine qualité. Gratuit, rapide, sans connexion ni application.",
    h1: "Télécharger des Reels, vidéos et photos Instagram en HD",
    sub: "Collez le lien d'un Reel, d'une publication, d'un carrousel ou d'une Story publique et enregistrez l'original en pleine qualité sur votre appareil.",
    highlights: [
      "Reels et publications vidéo",
      "Photos et carrousels",
      "Stories et à la une publiques",
      "Sans connexion",
    ],
    sections: [
      {
        heading: "Tout ce qu'Instagram vous montre, bien enregistré",
        body: [
          "Instagram ne propose que des favoris dans l'application, qui disparaissent quand une publication est supprimée. ClipKoala vous donne un vrai fichier : les Reels et vidéos en MP4 dans la meilleure qualité fournie par Instagram, les photos en JPG pleine résolution, et les carrousels avec chaque élément listé plus un ZIP de l'ensemble.",
          "Les Stories et à la une publiques fonctionnent tant qu'elles sont en ligne. Rien ne nécessite votre compte Instagram, et nous ne demandons jamais de mot de passe.",
        ],
      },
      {
        heading: "Quels liens Instagram fonctionnent",
        body: [
          "instagram.com/reel/..., instagram.com/p/..., instagram.com/tv/..., les liens de Stories et les liens de Stories à la une de comptes publics. Les publications de comptes privés ne peuvent pas être récupérées, par conception.",
        ],
      },
    ],
    faqs: [
      {
        q: "Comment télécharger un Reel Instagram ?",
        a: "Appuyez sur les trois points ou sur la flèche Partager du Reel, choisissez Copier le lien et collez-le dans ClipKoala. Le MP4 en HD est prêt en quelques secondes.",
      },
      {
        q: "Dois-je me connecter à Instagram ?",
        a: "Non. ClipKoala fonctionne avec toute publication publique, sans votre compte. Nous ne demandons jamais d'identifiants.",
      },
      {
        q: "Puis-je télécharger depuis un compte privé ?",
        a: "Non. Seuls les publications, Reels et Stories publics peuvent être récupérés. Les contenus privés et réservés aux abonnés restent privés.",
      },
      {
        q: "Puis-je enregistrer un carrousel entier d'un coup ?",
        a: "Oui. Chaque photo et vidéo du carrousel est listée séparément, et un bouton pour tout télécharger en ZIP regroupe toute la publication dans un seul fichier.",
      },
    ],
  },

  "facebook-downloader": {
    name: "Téléchargeur Facebook",
    metaTitle: "Télécharger vidéo Facebook et Reels en HD",
    metaDescription:
      "Téléchargez des vidéos et Reels Facebook en HD, y compris les liens fb.watch et de partage. Gratuit, sans inscription, dans le navigateur sur tout appareil.",
    h1: "Télécharger des vidéos et Reels Facebook en HD",
    sub: "Fonctionne avec les liens watch, les liens de partage, les liens courts fb.watch et les Reels. Enregistré dans la meilleure qualité fournie par Facebook.",
    highlights: [
      "Vidéos et Reels",
      "Liens fb.watch et de partage",
      "HD si disponible",
      "Aucun compte requis",
    ],
    sections: [
      {
        heading: "D'une liste « à regarder plus tard » à un fichier bien à vous",
        body: [
          "Facebook vous permet d'enregistrer des vidéos dans une liste interne à Facebook, mais pas sur votre téléphone ou votre ordinateur. Collez le lien d'une vidéo publique dans ClipKoala et vous obtenez un MP4 classique : en HD quand Facebook la fournit, en SD comme alternative plus légère.",
          "Les diffusions en direct peuvent être enregistrées une fois terminées, si la rediffusion est publique. Les Reels fonctionnent exactement comme les vidéos classiques.",
        ],
      },
      {
        heading: "Quels liens Facebook fonctionnent",
        body: [
          "Les liens facebook.com/watch, les liens de publications vidéo, les liens de Reels, les liens facebook.com/share/v/... et les liens courts fb.watch. Les vidéos de groupes privés, d'événements ou de publications réservées aux amis ne peuvent pas être récupérées.",
        ],
      },
    ],
    faqs: [
      {
        q: "Quels liens Facebook fonctionnent ?",
        a: "Les pages vidéo, les liens /watch, les Reels, les liens de partage (facebook.com/share/v/...) et les liens courts fb.watch. Collez celui que l'application vous donne.",
      },
      {
        q: "Pourquoi est-il indiqué que la vidéo est privée ?",
        a: "Seules les vidéos publiques peuvent être récupérées. Les vidéos réservées aux amis, aux groupes ou aux utilisateurs connectés sont inaccessibles. C'est volontaire.",
      },
      {
        q: "Quelle qualité vais-je obtenir ?",
        a: "La meilleure qualité fournie par Facebook pour cette vidéo, généralement HD 720p ou 1080p si disponible, avec une option SD pour des fichiers plus légers.",
      },
    ],
  },

  "youtube-downloader": {
    name: "Téléchargeur YouTube",
    metaTitle: "Télécharger vidéo YouTube en MP4 1080p et MP3",
    metaDescription:
      "Téléchargez des vidéos et Shorts YouTube en MP4 de 360p à 1080p, ou convertissez-les en MP3. Progression en direct, gratuit, illimité, sans logiciel.",
    h1: "Télécharger des vidéos et Shorts YouTube",
    sub: "Choisissez votre qualité, de 360p au Full HD 1080p, ou convertissez directement en MP3 avec progression en direct. Playlists et chaînes s'ajoutent en lot.",
    highlights: [
      "Vidéos et Shorts",
      "MP4 jusqu'en 1080p",
      "Audio MP3, M4A, WAV, FLAC",
      "Playlists et chaînes",
    ],
    sections: [
      {
        heading: "La qualité de votre choix, convertie à la demande",
        body: [
          "YouTube diffuse la vidéo et l'audio séparément, un téléchargeur doit donc les fusionner. ClipKoala le fait à la volée dans la qualité que vous choisissez, de 360p à 1080p, et affiche la progression en direct sur le bouton. La plupart des fichiers sont prêts en quelques secondes ; les longues vidéos HD peuvent prendre jusqu'à une minute.",
          "Vous préférez l'audio ? Choisissez le MP3 à 320 kbps, le M4A, le WAV ou le FLAC sans perte. Collez le lien d'une playlist ou d'une chaîne et ses dernières vidéos s'alignent en un lot à enregistrer en un clic.",
        ],
      },
      {
        heading: "Quels liens YouTube fonctionnent",
        body: [
          "youtube.com/watch, les liens courts youtu.be, youtube.com/shorts, les liens de playlists et les liens de chaînes ou de @pseudo. Les vidéos soumises à une limite d'âge, réservées aux membres ou privées ne peuvent pas être récupérées.",
        ],
      },
    ],
    faqs: [
      {
        q: "Comment convertir une vidéo YouTube en MP3 ?",
        a: "Collez le lien de la vidéo, puis choisissez le téléchargement MP3. L'audio est converti à 320 kbps et enregistré dans vos téléchargements. Consultez la page dédiée YouTube en MP3 pour en savoir plus sur le M4A, le WAV et le FLAC.",
      },
      {
        q: "Pourquoi le téléchargement met-il un moment à démarrer ?",
        a: "Les fichiers YouTube sont convertis à la demande dans la qualité choisie. Vous voyez la progression en direct sur le bouton ; la plupart des fichiers sont prêts en quelques secondes.",
      },
      {
        q: "Les Shorts et les playlists fonctionnent-ils ?",
        a: "Oui. Les liens youtube.com/shorts se téléchargent comme n'importe quelle vidéo, et les liens de playlists ou de chaînes se transforment en un lot de leurs dernières vidéos.",
      },
      {
        q: "Puis-je télécharger des vidéos YouTube en 4K ?",
        a: "Pas encore. Les téléchargements vont jusqu'en Full HD 1080p, ce qui couvre la grande majorité des usages tout en gardant des conversions rapides.",
      },
    ],
  },

  "youtube-to-mp3": {
    name: "YouTube en MP3",
    metaTitle: "Convertir YouTube en MP3 gratuit, 320 kbps",
    metaDescription:
      "Convertissez des vidéos YouTube en MP3 à 320 kbps, ou en M4A, WAV et FLAC sans perte. Convertisseur en ligne gratuit, progression en direct, sans inscription.",
    h1: "Convertir YouTube en MP3, gratuitement et en pleine qualité",
    sub: "Collez un lien YouTube et enregistrez l'audio en MP3 à 320 kbps, ou choisissez le M4A, le WAV ou le FLAC sans perte. Progression en direct, sans logiciel.",
    highlights: [
      "MP3 à 320 kbps",
      "M4A, WAV et FLAC aussi",
      "Progression en direct",
      "Playlists en lot",
    ],
    sections: [
      {
        heading: "Quel format audio choisir ?",
        body: [
          "Le MP3 se lit sur tous les appareils et reste le choix le plus sûr ; ClipKoala l'encode toujours à 320 kbps, le débit le plus élevé que permet le format. Le M4A (AAC) offre un son quasi identique pour des fichiers plus légers et c'est le format natif des appareils Apple. Le WAV n'est pas compressé et pèse lourd, utile si vous comptez retoucher l'audio. Le FLAC est une compression sans perte : l'audio original exact pour environ la moitié de la taille d'un WAV, idéal pour archiver de la musique.",
          "Quel que soit votre choix, la conversion s'effectue sur nos serveurs et le fichier est envoyé à votre navigateur dès qu'il est prêt. Rien n'est installé sur votre appareil.",
        ],
      },
      {
        heading: "Podcasts, cours, mixes et playlists entières",
        body: [
          "Les longs enregistrements se convertissent sans problème : la barre de progression vous tient informé et une notification s'affiche si vous changez d'onglet. Pour convertir de nombreuses vidéos, collez le lien d'une playlist et choisissez le format audio pour chaque élément, ou utilisez Tout enregistrer pour la meilleure option disponible.",
        ],
      },
    ],
    faqs: [
      {
        q: "Quel est le débit des fichiers MP3 ?",
        a: "320 kbps, le maximum permis par le MP3. Rien à régler : chaque conversion MP3 se fait en qualité maximale.",
      },
      {
        q: "La conversion YouTube en MP3 est-elle gratuite ?",
        a: "Oui. Pas de compte, pas de limite au nombre de conversions, et pas de restriction de durée hormis le temps nécessaire au traitement d'une très longue vidéo.",
      },
      {
        q: "Est-il légal de convertir des vidéos YouTube en MP3 ?",
        a: "Convertir vos propres mises en ligne, des contenus Creative Commons ou un audio que vous avez l'autorisation d'utiliser ne pose pas de problème. Télécharger de la musique protégée par le droit d'auteur sans en avoir les droits peut enfreindre la loi et les conditions de YouTube. Respectez les droits des créateurs.",
      },
      {
        q: "Pourquoi le FLAC est-il meilleur que le MP3 pour l'archivage ?",
        a: "Le FLAC conserve chaque bit de l'audio original, alors que le MP3 supprime certains détails pour réduire la taille du fichier. Si vous voulez la meilleure copie possible pour une bibliothèque musicale, choisissez le FLAC ; si vous voulez la compatibilité et un fichier léger, choisissez le MP3.",
      },
    ],
  },

  "twitter-downloader": {
    name: "Téléchargeur X (Twitter)",
    metaTitle: "Télécharger vidéo X (Twitter) et GIF en HD",
    metaDescription:
      "Téléchargez des vidéos et GIF de X (Twitter) en HD. Collez un lien de post x.com ou twitter.com. Gratuit, sans inscription, sur mobile et ordinateur.",
    h1: "Télécharger des vidéos et GIF de X (Twitter)",
    sub: "Collez n'importe quel lien de post x.com ou twitter.com et enregistrez la vidéo ou le GIF dans la meilleure qualité disponible.",
    highlights: [
      "Vidéos de posts en HD",
      "GIF enregistrés en MP4",
      "Liens x.com et twitter.com",
      "Aucun compte requis",
    ],
    sections: [
      {
        heading: "Le MP4 brut, GIF compris",
        body: [
          "X n'offre aucun moyen intégré d'enregistrer la vidéo d'un post. ClipKoala récupère le MP4 de la meilleure qualité fournie par X, généralement la résolution d'origine de la mise en ligne. Sur X, les GIF animés sont en réalité de courtes vidéos en boucle : ils arrivent donc sous forme de petits fichiers MP4 lisibles partout.",
          "Les posts contenant plusieurs vidéos les listent séparément. Le texte du post sert de nom de fichier, pour que les clips restent reconnaissables dans vos téléchargements.",
        ],
      },
      {
        heading: "Quels liens X fonctionnent",
        body: [
          "Les liens x.com/user/status/... et twitter.com/user/status/..., y compris ceux copiés depuis l'application. Les posts de comptes protégés, les médias soumis à une limite d'âge et les posts réservés aux abonnés ne peuvent pas être récupérés.",
        ],
      },
    ],
    faqs: [
      {
        q: "Comment copier le lien d'un post sur X ?",
        a: "Appuyez sur l'icône de partage sous le post et choisissez Copier le lien, puis collez-le dans ClipKoala. Les liens x.com et twitter.com fonctionnent tous les deux.",
      },
      {
        q: "Puis-je télécharger des GIF depuis X ?",
        a: "Oui. Les posts GIF sont enregistrés sous forme de courts clips MP4, lisibles partout et en qualité d'origine.",
      },
      {
        q: "Pourquoi un post ne peut-il pas être récupéré ?",
        a: "Les posts de comptes privés ou soumis à une limite d'âge, ainsi que les posts sans aucun média, ne peuvent pas être téléchargés.",
      },
    ],
  },

  "reddit-downloader": {
    name: "Téléchargeur Reddit",
    metaTitle: "Télécharger vidéo Reddit avec le son (HD, gratuit)",
    metaDescription:
      "Téléchargez des vidéos Reddit avec le son en HD, vidéo et audio fusionnés automatiquement. Liens de posts, de partage et redd.it. Gratuit, sans inscription.",
    h1: "Télécharger des vidéos Reddit, avec le son",
    sub: "Reddit stocke la vidéo et l'audio séparément. ClipKoala vous les fournit déjà fusionnés, pour que votre téléchargement se lise avec le son dans n'importe quel lecteur.",
    highlights: [
      "Vidéo et audio fusionnés",
      "GIF en MP4",
      "Liens de partage et redd.it",
      "Aucun compte requis",
    ],
    sections: [
      {
        heading: "Pourquoi la plupart des vidéos Reddit téléchargées sont muettes, et pas les nôtres",
        body: [
          "L'hébergeur vidéo de Reddit, v.redd.it, diffuse l'image et le son sous forme de deux flux séparés. Enregistrez directement le fichier vidéo et vous obtenez le silence. ClipKoala traite le post via un service qui fusionne les deux en un seul fichier, puis vous l'envoie : le MP4 enregistré se lit avec le son partout, de la galerie de votre téléphone à un logiciel de montage.",
          "Les GIF et les publications d'images Reddit se téléchargent aussi, et le titre du post sert de nom de fichier.",
        ],
      },
      {
        heading: "Quels liens Reddit fonctionnent",
        body: [
          "Les liens complets de posts (reddit.com/r/.../comments/...), les liens de partage mobiles (reddit.com/r/.../s/...), les liens courts redd.it et les liens directs v.redd.it. Les posts de subreddits privés ou mis en quarantaine ne peuvent pas être récupérés.",
        ],
      },
    ],
    faqs: [
      {
        q: "Pourquoi les vidéos Reddit se téléchargent-elles souvent sans le son ?",
        a: "Reddit diffuse la vidéo et l'audio sous forme de flux séparés. Ils sont fusionnés en un seul fichier avant de vous parvenir, pour que ce que vous enregistrez se lise avec le son dans n'importe quel lecteur.",
      },
      {
        q: "Quels liens Reddit fonctionnent ?",
        a: "Les liens complets de posts, les liens de partage mobiles (reddit.com/r/.../s/...), les liens courts redd.it et les liens directs v.redd.it.",
      },
      {
        q: "Puis-je télécharger depuis des subreddits privés ?",
        a: "Non. Seuls les posts visibles publiquement peuvent être récupérés.",
      },
    ],
  },

  "pinterest-downloader": {
    name: "Téléchargeur Pinterest",
    metaTitle: "Télécharger vidéo Pinterest et images en HD",
    metaDescription:
      "Téléchargez les épingles vidéo Pinterest en MP4 et les images en résolution d'origine. Liens pinterest.com et pin.it de tous pays. Gratuit, sans inscription.",
    h1: "Télécharger des vidéos et épingles image Pinterest",
    sub: "Collez le lien d'une épingle. Les épingles vidéo s'enregistrent en MP4 et les épingles image en originaux pleine résolution, pas en aperçus compressés.",
    highlights: [
      "Épingles vidéo en MP4",
      "Images en qualité d'origine",
      "Liens courts pin.it",
      "Tous les domaines nationaux",
    ],
    sections: [
      {
        heading: "Des originaux, pas des miniatures",
        body: [
          "Un clic droit sur une épingle enregistre généralement un aperçu réduit. ClipKoala retrouve le fichier original mis en ligne : les épingles image arrivent en pleine résolution et les épingles vidéo en vrais fichiers MP4. Les épingles Idées de plusieurs pages listent chaque élément séparément.",
        ],
      },
      {
        heading: "Quels liens Pinterest fonctionnent",
        body: [
          "Les liens pinterest.com/pin/... de tous les domaines régionaux (pinterest.fr, pinterest.ca, pinterest.co.uk, etc.) et les liens courts pin.it copiés depuis l'application. Les tableaux secrets ne peuvent pas être récupérés.",
        ],
      },
    ],
    faqs: [
      {
        q: "Comment copier le lien d'une épingle ?",
        a: "Ouvrez l'épingle, appuyez sur l'icône de partage et choisissez Copier le lien. Les liens pinterest.com et les liens courts pin.it fonctionnent tous les deux.",
      },
      {
        q: "Puis-je aussi télécharger les épingles image ?",
        a: "Oui. Les épingles image se téléchargent sous forme de fichier original en pleine résolution, pas d'aperçu compressé.",
      },
      {
        q: "Les domaines nationaux comme pinterest.fr fonctionnent-ils ?",
        a: "Oui. Tous les domaines régionaux de Pinterest sont pris en charge, ainsi que les liens courts pin.it de l'application.",
      },
    ],
  },

  "twitch-clip-downloader": {
    name: "Téléchargeur de clips Twitch",
    metaTitle: "Télécharger clip Twitch en MP4 HD",
    metaDescription:
      "Téléchargez des clips Twitch en MP4 jusqu'en 1080p. Collez un lien clips.twitch.tv ou twitch.tv/clip et choisissez votre qualité. Gratuit, sans inscription.",
    h1: "Télécharger des clips Twitch en HD",
    sub: "Collez n'importe quel lien de clip et enregistrez-le en MP4 dans la qualité de votre choix, jusqu'en 1080p.",
    highlights: [
      "Clips en MP4",
      "Jusqu'en 1080p",
      "Liens clips.twitch.tv et /clip",
      "Aucun compte requis",
    ],
    sections: [
      {
        heading: "Gardez le moment, même quand Twitch passe à autre chose",
        body: [
          "Les clips sont ce qu'il y a de plus facile à partager sur Twitch, et de plus facile à perdre quand une chaîne est supprimée ou qu'un clip est retiré. ClipKoala liste toutes les qualités proposées par Twitch pour un clip, généralement de 360p à 1080p, et enregistre celle que vous choisissez en MP4, prêt pour le montage ou la republication.",
        ],
      },
      {
        heading: "Quels liens Twitch fonctionnent",
        body: [
          "Les liens clips.twitch.tv/... et twitch.tv/channel/clip/.... Les VOD, les anciennes diffusions complètes et les lives ne sont pas encore pris en charge.",
        ],
      },
    ],
    faqs: [
      {
        q: "Comment obtenir le lien d'un clip Twitch ?",
        a: "Sur le clip, cliquez sur Partager et copiez le lien. Les liens clips.twitch.tv/... et twitch.tv/channel/clip/... fonctionnent tous les deux.",
      },
      {
        q: "Quelles qualités puis-je télécharger ?",
        a: "Celles que propose le clip, généralement de 360p à 1080p. ClipKoala liste chaque qualité disponible séparément.",
      },
      {
        q: "Puis-je télécharger des VOD complètes ou des lives ?",
        a: "Pas encore. Seuls les clips sont pris en charge. Les chaînes, les VOD et les lives ne peuvent pas être téléchargés.",
      },
    ],
  },

  "soundcloud-downloader": {
    name: "Téléchargeur SoundCloud",
    metaTitle: "Télécharger SoundCloud en MP3 : titres et pochette",
    metaDescription:
      "Téléchargez des titres SoundCloud en MP3 dans la meilleure qualité permise par l'artiste, avec la pochette. Collez le lien. Gratuit, sans inscription.",
    h1: "Télécharger des titres SoundCloud en MP3",
    sub: "Collez le lien d'un titre et enregistrez l'audio dans la meilleure qualité permise par la personne qui l'a mis en ligne, pochette incluse.",
    highlights: [
      "Titres en MP3",
      "Qualité d'origine",
      "Pochette incluse",
      "Aucun compte requis",
    ],
    sections: [
      {
        heading: "Des copies hors ligne des titres que vous aimez",
        body: [
          "L'écoute hors ligne de SoundCloud est réservée aux abonnés et reste enfermée dans l'application. ClipKoala enregistre un MP3 classique que vous pouvez lire partout, avec le titre et l'artiste renseignés et la pochette jointe. La qualité correspond à ce que la personne qui l'a mis en ligne a rendu disponible.",
        ],
      },
      {
        heading: "Quels liens SoundCloud fonctionnent",
        body: [
          "Les liens soundcloud.com/artiste/titre et les liens courts on.soundcloud.com de l'application. Les titres limités à un extrait par la personne qui les a mis en ligne, ainsi que les titres privés, ne peuvent pas être enregistrés. Les liens de playlists et de profils ne sont pas encore pris en charge.",
        ],
      },
    ],
    faqs: [
      {
        q: "Comment copier le lien d'un titre SoundCloud ?",
        a: "Appuyez sur Partager sur le titre et choisissez Copier le lien. Les liens soundcloud.com et les liens courts on.soundcloud.com fonctionnent tous les deux.",
      },
      {
        q: "Pourquoi certains titres ne peuvent-ils pas être téléchargés ?",
        a: "Certaines personnes désactivent les téléchargements ou ne proposent qu'un extrait. Ces titres ne peuvent pas être enregistrés.",
      },
      {
        q: "Puis-je télécharger des playlists entières ?",
        a: "Pas encore. Collez les liens des titres un par un. Les liens de playlists et de profils ne sont pas pris en charge.",
      },
    ],
  },

  "batch-video-downloader": {
    name: "Téléchargement par lot",
    metaTitle: "Télécharger plusieurs vidéos à la fois (par lot)",
    metaDescription:
      "Téléchargez plusieurs vidéos d'un coup depuis TikTok, YouTube, Instagram, etc. Collez vos liens, importez un .txt ou .csv, ou une playlist YouTube. Gratuit.",
    h1: "Télécharger plusieurs vidéos à la fois",
    sub: "Collez jusqu'à 10 liens de plateformes variées, importez un .txt ou un .csv de liens, ou déposez une playlist YouTube. Tout est récupéré en parallèle.",
    highlights: [
      "Jusqu'à 10 liens par lot",
      "Plateformes mélangées",
      "Import .txt ou .csv",
      "Tout enregistrer en un clic",
    ],
    sections: [
      {
        heading: "Conçu pour les monteurs, les archivistes et les impatients",
        body: [
          "Rassembler des extraits pour un montage, sauvegarder vos propres publications ou enregistrer une playlist avant un vol ne devrait pas obliger à coller les liens un par un. Collez une liste entière dans ClipKoala et il passe automatiquement en mode lot : chaque lien a sa propre ligne avec son état en direct, les options de qualité et un bouton pour réessayer, et Tout enregistrer prend la meilleure qualité de l'ensemble en une seule fois.",
          "Les liens peuvent venir d'une application de notes, d'une colonne de tableur ou d'une conversation. Vous pouvez aussi importer un fichier .txt ou .csv, ou simplement le glisser sur la page. Les liens de playlists et de chaînes YouTube se transforment en leurs dernières vidéos.",
        ],
      },
      {
        heading: "Comment les lots restent rapides",
        body: [
          "Les lots sont limités à 10 liens, récupérés trois par trois, ce qui garde chaque résultat rapide et évite de surcharger les plateformes. Quand un lot est terminé, collez le suivant.",
        ],
      },
    ],
    faqs: [
      {
        q: "Combien de vidéos puis-je télécharger à la fois ?",
        a: "Jusqu'à 10 par lot. Vous pouvez lancer autant de lots que vous le souhaitez, l'un après l'autre.",
      },
      {
        q: "Puis-je mélanger des liens TikTok, YouTube et Instagram dans un même lot ?",
        a: "Oui. La plateforme est détectée pour chaque lien, donc n'importe quel mélange des neuf plateformes prises en charge fonctionne dans un seul lot.",
      },
      {
        q: "Quels types de fichiers puis-je importer ?",
        a: "Les fichiers .txt simples avec un lien par ligne et les exports .csv de tableurs. Les guillemets, les virgules et les colonnes supplémentaires sont gérés automatiquement.",
      },
      {
        q: "Tout enregistrer choisit-il la meilleure qualité ?",
        a: "Oui. Tout enregistrer prend la meilleure option pour chaque vidéo. Dépliez une ligne pour choisir d'abord un autre format ou une autre qualité.",
      },
    ],
  },
};
