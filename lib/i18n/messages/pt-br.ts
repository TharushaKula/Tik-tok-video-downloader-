import type { LocaleMessages } from "../types";

// Brazilian Portuguese (pt-BR). Typed against the English source in ./en.ts;
// see that file for the rules (placeholders, plurals, brand names, no
// em-dashes).

export const messages: LocaleMessages = {
  client: {
    common: {
      paste: "Colar",
      clear: "Limpar",
      dismiss: "Dispensar",
      close: "Fechar",
      retry: "Tentar de novo",
      save: "Salvar",
      new: "Novo",
      newAria: "Começar um novo download",
      fetch: "Buscar",
      fetching: "Buscando…",
      freeForever: "Grátis para sempre",
      noSignUp: "Sem cadastro",
      nothingStored: "Nada é armazenado",
    },

    menu: {
      open: "Abrir menu",
      close: "Fechar menu",
      title: "Menu",
      downloaders: "Baixadores",
      downloadVideo: "Baixar um vídeo",
    },

    theme: {
      label: "Tema",
      current: "Tema: {pref}, clique para mudar",
      system: "sistema",
      light: "claro",
      dark: "escuro",
    },

    language: {
      label: "Idioma",
      change: "Mudar idioma",
    },

    tool: {
      serverUnreachable:
        "Não conseguimos acessar o servidor. Verifique sua conexão e tente de novo.",
      serverError:
        "O servidor teve um problema inesperado. Espere um instante e tente de novo.",
      unsupportedPlatform:
        "Esse link não é de uma plataforma compatível. Cole um link do TikTok, Instagram, Facebook, YouTube, X, Reddit, Pinterest, Twitch ou SoundCloud.",
      unexpected: "Erro inesperado",
      linksDetected: {
        one: "{count} link detectado, buscando agora",
        other: "{count} links detectados, buscando todos",
      },
      clipboardDenied: "O navegador bloqueou o acesso à área de transferência",
      clipboardEmpty: "Sua área de transferência está vazia",
      notSupportedLink: "Isso não parece um link compatível",
      dropFileHint: "Solte um link ou um arquivo .txt/.csv com links",
      noLinksInFile: "Nenhum link compatível encontrado nesse arquivo",
      fileReadError: "Não foi possível ler esse arquivo",
      clipboardNoticed: "Encontramos {what} na sua área de transferência",
      clipboardLinks: {
        one: "um link",
        other: "{count} links",
      },
      playlistError: "Não foi possível carregar essa playlist",
      channelError: "Não foi possível carregar esse canal",
      playlistLoadedRecent:
        "Playlist carregada, buscando os {count} vídeos mais recentes",
      channelLoadedRecent:
        "Canal carregado, buscando os {count} vídeos mais recentes",
      playlistLoaded: {
        one: "Playlist carregada, buscando {count} vídeo",
        other: "Playlist carregada, buscando {count} vídeos",
      },
      channelLoaded: {
        one: "Canal carregado, buscando {count} vídeo",
        other: "Canal carregado, buscando {count} vídeos",
      },
      savedToFavorites: "Salvo nos favoritos",
      removedFromFavorites: "Removido dos favoritos",
      dropTitle: "Solte um link ou um .txt/.csv com links",
      dropBody: "Vamos detectar a plataforma e buscar tudo na hora",
      linkBox: "campo de link",
      commands: "comandos",
    },

    url: {
      placeholder: "Cole um link do TikTok, YouTube, Instagram ou de qualquer vídeo…",
      aria: "URL do vídeo",
      clearLink: "Limpar link",
      pasteLinkAria: "Colar link da área de transferência",
      batch: "Lote",
      batchAria: "Modo lote, cole vários links",
      getVideo: "Baixar vídeo",
      hintEmpty:
        "Cole um link, ou vários de uma vez. A plataforma é detectada automaticamente",
      hintPlaylist:
        "Playlist do YouTube detectada, vamos buscar os vídeos mais recentes em lote",
      hintChannel:
        "Canal do YouTube detectado, vamos buscar os envios mais recentes em lote",
      hintDetected: "Link do {platform} detectado, pressione Enter para buscar",
      hintUnsupported: "Isso ainda não parece um link compatível",
      whichLinksWork: "quais links funcionam",
      trustLine:
        "Só posts públicos, sem conta, e nada fica armazenado no nosso servidor.",
      privateWhy: "Por que posts privados não podem ser baixados",
      importedLinks: {
        one: "{count} link importado de {file}",
        other: "{count} links importados de {file}",
      },
      batchPlaceholder:
        "Cole os links, um por linha…\nhttps://www.tiktok.com/…\nhttps://youtu.be/…",
      batchTextAria: "URLs dos vídeos, uma por linha",
      pasteLinksAria: "Colar links da área de transferência",
      importFile: "Importar arquivo",
      importFileAria: "Importar links de um arquivo .txt ou .csv",
      singleLink: "Link único",
      singleLinkAria: "Voltar para link único",
      fetchVideos: "Buscar vídeos",
      fetchCount: {
        one: "Buscar {count} vídeo",
        other: "Buscar {count} vídeos",
      },
      batchHintEmpty:
        "Um link por linha, ou cole qualquer texto, os links são separados para você",
      batchValid: {
        one: "{count} link válido",
        other: "{count} links válidos",
      },
      batchUnsupported: "{count} sem suporte",
      batchCapped: "limite de {max} por lote",
      batchShortcut: "Ctrl/⌘ + Enter para buscar",
    },

    result: {
      sendToPhone: "Enviar para o celular",
      sendToPhoneAria: "Enviar para o celular com um QR code",
      continueOnPhone: "Continue no seu celular",
      qrBody: "Escaneie para abrir este vídeo no ClipKoala em outro aparelho.",
      zipError: "Não foi possível criar o ZIP",
      zipSaved: "ZIP com {count} imagens salvo",
      zipping: "Compactando…",
      zipAll: "Baixar tudo ({count}) em ZIP",
      previewUnavailable: "A prévia não está disponível para este vídeo",
      closePreview: "Fechar prévia",
      previewVideo: "Ver prévia do vídeo",
      removeFromSaved: "Remover dos salvos",
      saveToFavorites: "Salvar nos favoritos",
      saved: "Salvo",
      saveThumbnail: "Salvar miniatura",
      saveThumbnailAria: "Salvar imagem de miniatura",
      views: "visualizações",
      likes: "curtidas",
      comments: "comentários",
      shares: "compartilhamentos",
      saveAs: "Salvar como",
      noteYouTube:
        "Os arquivos do YouTube são convertidos na hora: você acompanha o progresso ao vivo e o download começa automaticamente quando estiver pronto.",
      noteOther:
        "Os arquivos passam pelo nosso servidor, então você não instala nada e não precisa de app.",
    },

    download: {
      preparingToast: "Preparando seu arquivo, o download começa quando estiver pronto",
      startedToast: "Download iniciado, confira os downloads do navegador",
      failed: "Não foi possível iniciar o download",
      converting: "Convertendo · {percent}%",
      preparing: "Preparando…",
      inDownloads: "Nos seus downloads",
      started: "Iniciado",
      optionLabel: "Baixar {what}",
      audio: "áudio",
      video: "vídeo",
      image: "imagem",
    },

    batch: {
      title: "Download em lote",
      progress: "{done} de {total} buscados",
      failedCount: "{count} com falha",
      startingAll:
        "Iniciando {count} downloads, o navegador pode pedir permissão para baixar vários arquivos",
      saving: "Salvando…",
      saveAll: "Salvar tudo ({count})",
      waiting: "Aguardando…",
      fetchingFrom: "Buscando no {platform}…",
      formats: {
        one: "{platform} · {count} formato",
        other: "{platform} · {count} formatos",
      },
      saveItemAria: "Salvar {title}",
      footnote:
        "Salvar tudo baixa a melhor qualidade de cada vídeo. Abra uma linha para escolher outro formato.",
      fetchingVideo: "Buscando vídeo…",
    },

    errors: {
      title: "Não conseguimos buscar esse link",
      tipOpens: "Confira se o link abre no seu navegador",
      tipPrivate:
        "Posts privados, com restrição de idade ou bloqueados por região não podem ser baixados",
      tipRecopy: "Tente copiar o link de novo pelo botão Compartilhar do app",
      tipStatusBefore: "Continua acontecendo?",
      tipStatusLink: "Confira a página de status",
      tipStatusAfter: "para ver se a plataforma está fora do ar",
      tryAgain: "Tentar de novo",
      details: "Detalhes: {message}",
      classes: {
        unsupported_url:
          "O ClipKoala não consegue ler esse link. Confira se é um post público de uma plataforma compatível.",
        private_or_restricted:
          "Este post é privado, tem restrição de idade ou está limitado a algumas regiões, então não pode ser baixado.",
        not_found:
          "Não encontramos este post. Ele pode ter sido apagado ou o link pode estar incompleto.",
        no_media: "Nenhum vídeo ou áudio para baixar foi encontrado neste post.",
        rate_limited:
          "A plataforma está recebendo pedidos demais agora. Espere um minuto e tente de novo.",
        network:
          "A conexão caiu durante a busca. Verifique sua internet e tente de novo.",
        resolver_down:
          "O serviço que lê esta plataforma está com problemas. Tente de novo em instantes.",
        unknown: "Algo deu errado ao buscar este link.",
      },
    },

    share: {
      prompt: "Achou útil? Mande o {page} para alguém.",
      share: "Compartilhar",
      copyLink: "Copiar link",
      copied: "Copiado",
      copiedToast: "Link copiado, pronto para colar",
      clipboardBlocked: "Seu navegador bloqueou o acesso à área de transferência",
      fallbackPitch: "Baixador de vídeos grátis, sem cadastro",
      pitch: {
        tiktok: "Salva vídeos do TikTok em HD sem marca d'água, grátis e sem conta",
        youtube:
          "Baixa vídeos do YouTube em MP4 ou converte para MP3, grátis e sem conta",
        instagram:
          "Salva Reels, posts e carrosséis do Instagram em qualidade total, sem login",
        facebook: "Salva vídeos e Reels do Facebook em HD, grátis e sem conta",
        twitter: "Salva vídeos e GIFs de posts do X em HD, grátis e sem conta",
        reddit:
          "Salva vídeos do Reddit com o som junto de verdade, grátis e sem conta",
        pinterest:
          "Salva pins de vídeo e de imagem do Pinterest em resolução máxima, sem conta",
        twitch: "Salva clipes da Twitch em MP4 até 1080p, grátis e sem conta",
        soundcloud: "Salva faixas do SoundCloud em MP3 com a capa, sem conta",
      },
    },

    feedback: {
      thanks: "Obrigado, isso ajuda de verdade.",
      job: {
        title: "O que você estava salvando?",
        note: "Um toque. Só serve para sabermos quais usos melhorar.",
        options: {
          own_post: "Um post meu",
          reference_clip: "Um clipe de referência para uma edição",
          audio_offline: "Áudio para ouvir offline",
          teaching: "Algo para uma aula",
          archive: "Arquivar um post público",
          other: "Outra coisa",
        },
      },
      exit: {
        title: "O que te impediu?",
        note: "Um toque, e ajuda mais do que você imagina.",
        options: {
          error: "Deu erro",
          unsupported: "Meu link não era compatível",
          quality: "Não tinha a qualidade que eu queria",
          trust: "Não tive certeza se era seguro",
          slow: "Estava demorando demais",
          browsing: "Nada, só estava dando uma olhada",
        },
      },
    },

    onboarding: {
      newHere: "Primeira vez aqui?",
      body: "Abra qualquer vídeo, toque no botão Compartilhar, copie o link e cole abaixo. As opções de download aparecem em segundos, e colar vários links de uma vez inicia um lote.",
      dismiss: "Dispensar dica",
    },

    recent: {
      title: "Recentes",
      aria: "Downloads recentes",
      justNow: "agora mesmo",
      minutesAgo: "há {count} min",
      hoursAgo: "há {count} h",
      daysAgo: "há {count} d",
    },

    favorites: {
      title: "Salvos",
      aria: "Vídeos salvos",
      all: "Todos",
      tagPlaceholder: "nome da tag",
      newTagAria: "Nova tag",
      addTag: "tag",
      removeTag: "Remover tag {tag}",
      editTags: "Editar tags de {title}",
      remove: "Remover {title} dos salvos",
    },

    usage: {
      saved: {
        one: "Você já salvou {count} vídeo com o ClipKoala",
        other: "Você já salvou {count} vídeos com o ClipKoala",
      },
      mostlyFrom: "principalmente de",
    },

    filename: {
      settings: "Configurações do nome do arquivo",
      title: "Nomes dos arquivos baixados",
      body: "Monte seu próprio padrão com as variáveis abaixo.",
      templateAria: "Modelo de nome do arquivo",
      preview: "Prévia",
      reset: "Restaurar padrão",
      resetToast: "Padrão de nome restaurado",
      vars: {
        title: "Título do vídeo",
        author: "Autor / canal",
        platform: "Plataforma",
        quality: "Qualidade",
        date: "Data de hoje",
      },
    },

    palette: {
      aria: "Paleta de comandos",
      placeholder: "Busque comandos, vídeos salvos, páginas…",
      noMatch: "Nenhum comando encontrado",
      groups: {
        actions: "Ações",
        theme: "Tema",
        preferences: "Preferências",
        saved: "Salvos",
        recent: "Recentes",
        goTo: "Ir para",
      },
      paste: "Colar um link e buscar",
      pasteHint: "da área de transferência",
      themeSystem: "Usar tema do sistema",
      themeLight: "Mudar para tema claro",
      themeDark: "Mudar para tema escuro",
      toggleSound: "Ativar ou desativar som de conclusão",
      soundOn:
        "Som de conclusão ativado, você vai ouvir um toque suave quando as conversões terminarem",
      soundOff: "Som de conclusão desativado",
      home: "Início",
      platforms: "Plataformas compatíveis",
      howItWorks: "Como funciona",
      faq: "Perguntas frequentes",
      changelog: "Novidades",
      status: "Status: o ClipKoala está funcionando?",
      features: "Recursos",
      extension: "Extensão para navegador",
      about: "Sobre o ClipKoala",
      guides: "Guias passo a passo",
    },
  },

  site: {
    meta: {
      homeTitle: "Baixar vídeos online grátis e sem cadastro | ClipKoala",
      homeShortTitle: "ClipKoala: baixador de vídeos grátis",
      description:
        "Baixe vídeos grátis do TikTok, YouTube, Instagram e mais seis plataformas. Em HD, sem marca d'água, ou só o áudio em MP3. Sem cadastro.",
      shortDescription:
        "Baixador de vídeos grátis para TikTok, YouTube, Instagram e mais seis plataformas. HD, sem marca d'água, MP3. Sem cadastro.",
      tagline: "Salve qualquer clipe. Sempre limpo.",
      ogAlt:
        "ClipKoala: baixador de vídeos grátis para TikTok, YouTube, Instagram e mais",
      ogEyebrow: "Baixador de vídeos grátis",
      ogSubtitle:
        "Baixe vídeos de 9 plataformas em HD sem marca d'água, ou pegue o áudio em MP3. Sem cadastro, sem limites.",
      skipToContent: "Pular para o conteúdo",
    },

    nav: {
      homeAria: "Página inicial do ClipKoala",
      primaryAria: "Principal",
      downloaders: "Baixadores",
      useCases: "Casos de uso",
      guides: "Guias",
      answers: "Respostas",
      faq: "FAQ",
      howItWorks: "Como funciona",
      downloadVideo: "Baixar um vídeo",
      about: "Sobre",
      extension: "Extensão para navegador",
      changelog: "Novidades",
      status: "Status",
      glossary: "Glossário",
      privacy: "Privacidade",
    },

    footer: {
      blurb:
        "O ClipKoala é um baixador de vídeos online grátis para nove plataformas. HD, sem marca d'água, sem cadastro.",
      downloaders: "Baixadores",
      guides: "Guias",
      allGuides: "Todos os guias",
      answers: "Respostas",
      allAnswers: "Todas as respostas",
      audiences: "Para quem é",
      allUseCases: "Todos os casos de uso",
      product: "Produto",
      company: "Empresa",
      languages: "Idiomas",
      videoDownloader: "Baixador de vídeos",
      features: "Recursos",
      extension: "Extensão para navegador",
      batch: "Downloads em lote",
      changelog: "Novidades",
      roadmap: "Roadmap",
      status: "Status",
      rss: "Feed RSS",
      about: "Sobre o ClipKoala",
      faq: "Perguntas frequentes",
      glossary: "Glossário",
      press: "Kit de imprensa",
      accessibility: "Acessibilidade",
      terms: "Termos de uso",
      privacy: "Política de privacidade",
      dmca: "Direitos autorais e DMCA",
      security: "Relatar um problema",
      inEnglish: "em inglês",
      disclaimer:
        "O ClipKoala não tem vínculo com TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch ou SoundCloud. Baixe apenas conteúdo que é seu ou que você tem permissão para salvar.",
    },

    hero: {
      badge: "Grátis para sempre · Sem cadastro · 9 plataformas",
      titleLine1: "Baixe qualquer vídeo.",
      titleLine2: "Limpo, rápido, seu.",
      body: "O ClipKoala salva vídeos do TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch e SoundCloud em HD, sem marca d'água. Cole um link, escolha a qualidade e pronto. Ou pegue só o áudio em MP3.",
      platformsAria: "Plataformas compatíveis",
      mascotAlt:
        "Mascote do ClipKoala: um coala abraçando uma claquete com um botão de play",
    },

    features: {
      eyebrow: "Por que o ClipKoala",
      title: "Tudo o que um baixador de vídeos deve fazer, e nada do que não deve",
      body: "Arquivos limpos, opções reais de qualidade e uma ferramenta que respeita seu tempo e sua privacidade.",
      seeAll: "Ver todos os recursos",
      items: [
        {
          title: "Sem marca d'água",
          body: "Os vídeos do TikTok chegam como o arquivo original limpo. Nada é cortado, borrado ou recodificado.",
        },
        {
          title: "A melhor qualidade disponível",
          body: "HD e Full HD até 1080p, escolhidos a cada download. Você sempre vê o que vai receber antes de salvar.",
        },
        {
          title: "Áudio em qualquer formato",
          body: "MP3 a 320kbps, M4A, WAV ou FLAC sem perdas do YouTube. Trilhas sonoras em MP3 do TikTok e do SoundCloud.",
        },
        {
          title: "Downloads em lote",
          body: "Cole até 10 links, importe um .txt ou .csv, ou solte uma playlist do YouTube. Salve tudo com um clique.",
        },
        {
          title: "Privado por padrão",
          body: "Sem conta, sem registros ligados a você, nada armazenado. Seu histórico fica só no seu navegador.",
        },
        {
          title: "Rápido em qualquer aparelho",
          body: "Resultados em cerca de dois segundos. Uma página leve que funciona em conexões lentas e celulares antigos.",
        },
      ],
    },

    how: {
      eyebrow: "Como funciona",
      title: "Três passos, uns dez segundos",
      body: "Sem conta, sem app, nada para instalar. Funciona em qualquer celular ou computador.",
      steps: [
        {
          title: "Copie um link",
          desc: "Toque em Compartilhar no TikTok, YouTube, Instagram ou qualquer app compatível e copie o link do vídeo.",
        },
        {
          title: "Cole no ClipKoala",
          desc: "A plataforma é detectada automaticamente e o vídeo aparece com todos os formatos disponíveis em cerca de dois segundos.",
        },
        {
          title: "Salve seu arquivo",
          desc: "Escolha a qualidade, MP4 em HD ou áudio em MP3, e o arquivo vai para os seus downloads com o nome do vídeo.",
        },
      ],
    },

    platforms: {
      eyebrow: "Plataformas compatíveis",
      title: "Um baixador para todos os feeds",
      body: "Cole um link de qualquer uma destas plataformas. O ClipKoala detecta qual é e busca a melhor qualidade disponível.",
      supports: {
        tiktok: ["Vídeos sem marca d'água", "Slideshows de fotos", "Áudio em MP3"],
        instagram: ["Reels e posts de vídeo", "Posts de fotos", "Stories e destaques"],
        facebook: [
          "Vídeos e Reels",
          "Links do Watch e de compartilhamento",
          "Qualidade HD",
        ],
        youtube: ["Vídeos, Shorts e playlists", "MP4 até 1080p", "Áudio em MP3"],
        twitter: ["Vídeos de posts", "GIFs em MP4", "Qualidade HD"],
        reddit: [
          "Vídeos com som",
          "GIFs em MP4",
          "Links de compartilhamento e redd.it",
        ],
        pinterest: ["Pins de vídeo", "Pins de imagem em HD", "Links curtos pin.it"],
        twitch: ["Clipes em HD", "Até 1080p", "Links clips.twitch.tv"],
        soundcloud: ["Faixas em MP3", "Qualidade original", "Capa da faixa"],
      },
    },

    trust: {
      eyebrow: "Feito para ser confiável",
      title: "Um baixador que você pode indicar até para o amigo menos ligado em tecnologia",
      body: "A maioria dos sites de download é um labirinto de botões falsos e pop-ups. O ClipKoala é um campo, um resultado e uma lista clara do que você está prestes a salvar.",
      mascotAlt: "O coala do ClipKoala abraçando uma claquete com um botão de play",
      points: [
        {
          title: "Grátis, sem pegadinha",
          body: "Sem conta, sem paywall, sem limite de downloads, sem nível de qualidade 'premium'. Todos os formatos estão disponíveis para todo mundo.",
        },
        {
          title: "Não guardamos seus links",
          body: "Os links são processados e descartados. Os arquivos só passam pelo servidor e nunca ficam armazenados. Histórico e favoritos ficam só no seu navegador.",
        },
        {
          title: "Nunca pede suas senhas",
          body: "O ClipKoala só lê posts públicos. Ele não acessa contas privadas e nunca pede credenciais das plataformas.",
        },
        {
          title: "Transparente sobre a disponibilidade",
          body: "Uma página de status pública faz verificações ao vivo em todas as plataformas, para você ver com os próprios olhos quando algo está fora do ar.",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "Perguntas respondidas",
      more: "Mais dúvidas?",
      readFull: "Ver todas as perguntas frequentes",
      landingTitle: "{name}: perguntas frequentes",
      home: [
        {
          q: "O que é o ClipKoala?",
          a: "O ClipKoala é um baixador de vídeos online grátis. Cole um link do TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch ou SoundCloud e salve o vídeo em HD, sem marca d'água, ou pegue o áudio em MP3. Funciona no seu navegador, sem conta e sem programa para instalar.",
        },
        {
          q: "Quais plataformas e formatos são compatíveis?",
          a: "TikTok (vídeos sem marca d'água, slideshows de fotos, MP3), Reels, posts, carrosséis e Stories públicos do Instagram, vídeos e Reels do Facebook, vídeos, Shorts, playlists e canais do YouTube (MP4 até 1080p ou MP3, M4A, WAV, FLAC), vídeos e GIFs do X (Twitter), vídeos do Reddit com som, pins de vídeo e de imagem do Pinterest, clipes da Twitch e faixas do SoundCloud em MP3.",
        },
        {
          q: "O ClipKoala é grátis mesmo?",
          a: "Sim. Todo download, em qualquer qualidade, sem conta, sem limites e sem taxas escondidas.",
        },
        {
          q: "Os downloads do TikTok são mesmo sem marca d'água?",
          a: "Sim. O ClipKoala busca o arquivo original que o TikTok guarda antes de aplicar a marca d'água. Nada é cortado, borrado ou recodificado.",
        },
        {
          q: "Posso baixar vários vídeos de uma vez?",
          a: "Sim. Cole vários links juntos, ou use o botão Lote, e o ClipKoala busca até 10 por vez. Cada vídeo ganha sua própria linha com opções de qualidade, e Salvar tudo baixa a melhor qualidade de todos de uma só vez.",
        },
        {
          q: "Posso baixar vídeos privados?",
          a: "Não. Só posts públicos podem ser baixados. Conteúdo privado, só para seguidores ou com restrição de idade não é acessível, de propósito, para respeitar a privacidade dos criadores.",
        },
        {
          q: "Vocês guardam meus links ou downloads?",
          a: "Não. Os links são processados na hora e descartados imediatamente. Os arquivos passam pelo nosso servidor direto para o seu navegador e nunca ficam guardados. Sua lista de downloads recentes fica só no seu navegador e pode ser apagada a qualquer momento.",
        },
        {
          q: "É permitido baixar vídeos?",
          a: "Baixar não tem problema quando é o seu próprio conteúdo, conteúdo que você tem permissão para salvar ou mídia em domínio público ou Creative Commons. Sempre respeite os direitos dos criadores e os termos de uso de cada plataforma.",
        },
      ],
    },

    cta: {
      title: "Pronto para salvar seu primeiro clipe?",
      body: "Cole um link de qualquer uma das nove plataformas. Grátis, sem cadastro, em cerca de dois segundos.",
      label: "Baixar um vídeo",
      homeTitle: "Salve seu primeiro clipe nos próximos dez segundos",
      homeBody:
        "Role para cima, cole um link e escolha a qualidade. Sem conta, sem limites, sem marca d'água.",
      homeLabel: "Voltar para o baixador",
      aria: "Comece agora",
    },

    landing: {
      allPlatforms: "Todas as plataformas",
      aboutAria: "Sobre este baixador",
      guideEyebrow: "Guia passo a passo",
      answersBefore: "Se um link falhar, as causas mais comuns estão explicadas em",
      and: "e",
      audienceBefore: "Se isso faz parte de um trabalho maior, o",
      audienceLink: "fluxo de trabalho para {name}",
      audienceAfter: "mostra o processo completo.",
      moreDownloaders: "Mais baixadores",
      ogEyebrowPlatform: "Baixador de {platform}",
      ogEyebrowGeneric: "Baixador de vídeos grátis",
      ogAlt: "Baixador de vídeos ClipKoala",
    },

    breadcrumbs: {
      aria: "Trilha de navegação",
      home: "Início",
    },

    notFound: {
      title: "Página não encontrada",
      heading: "Este galho está vazio",
      body: "A página que você procurava mudou de lugar ou nunca existiu. O baixador está a um clique, e cada plataforma tem sua própria página.",
      cta: "Abrir o baixador",
    },
  },
};
