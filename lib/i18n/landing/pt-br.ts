import type { LandingTranslations } from "../types";

// Brazilian Portuguese (pt-BR) copy for the tool landing pages. Structure
// (slug, platform, related pages, dates) comes from the English entries in
// lib/landing.ts; only the translatable text lives here.

export const landing: LandingTranslations = {
  "tiktok-downloader": {
    name: "Baixador de TikTok",
    metaTitle: "Baixar vídeo do TikTok sem marca d'água (HD, grátis)",
    metaDescription:
      "Baixe vídeos do TikTok sem marca d'água em HD, salve slideshows de fotos ou extraia o som em MP3. Grátis, rápido, sem cadastro e sem app.",
    h1: "Baixar vídeos do TikTok sem marca d'água",
    sub: "Cole qualquer link do TikTok e salve o original limpo em HD. Slideshows de fotos e trilhas sonoras em MP3 inclusos.",
    highlights: [
      "Sem marca d'água, sempre",
      "Qualidade HD e SD",
      "Slideshows de fotos como imagens",
      "Trilha sonora em MP3",
    ],
    sections: [
      {
        heading: "Por que a marca d'água some de verdade, e não fica só escondida",
        body: [
          "O próprio botão Salvar vídeo do TikTok grava uma marca d'água em movimento no arquivo. O ClipKoala busca a versão original limpa que o TikTok guarda antes de aplicar a marca d'água, então nada é cortado, borrado ou recodificado. Você recebe a mesma resolução e taxa de bits que o criador enviou.",
          "Todo resultado oferece arquivos MP4 em HD e SD, além de um MP3 da trilha sonora. Nos slideshows de fotos, cada slide aparece como uma imagem separada, com um ZIP de um clique para o conjunto inteiro.",
        ],
      },
      {
        heading: "Quais links do TikTok funcionam",
        body: [
          "Links completos de vídeo (tiktok.com/@usuario/video/...), links curtos de compartilhamento do app (vm.tiktok.com e vt.tiktok.com) e links de slideshows de fotos. Vídeos privados, só para amigos e apagados não podem ser baixados.",
        ],
      },
    ],
    faqs: [
      {
        q: "Como baixar um vídeo do TikTok sem marca d'água?",
        a: "Abra o TikTok, toque em Compartilhar no vídeo, escolha Copiar link e cole no ClipKoala. Escolha Baixar HD e o MP4 sem marca d'água é salvo no seu aparelho. Não há nenhuma edição nem corte.",
      },
      {
        q: "Dá para baixar slideshows de fotos do TikTok?",
        a: "Sim. Cole o link de um slideshow e cada slide aparece como um download de imagem separado, junto com a trilha sonora em MP3 e um botão Baixar tudo em ZIP.",
      },
      {
        q: "Posso salvar só o som de um TikTok?",
        a: "Sim. Todo resultado do TikTok inclui a opção Baixar áudio, que salva a trilha sonora como arquivo MP3.",
      },
      {
        q: "Funciona no iPhone e no Android?",
        a: "Sim. O ClipKoala roda em qualquer navegador de celular. No Android, você também pode instalá-lo como app e compartilhar vídeos do TikTok direto para ele pelo menu de compartilhamento.",
      },
    ],
  },

  "instagram-downloader": {
    name: "Baixador de Instagram",
    metaTitle: "Baixar Reels e vídeos do Instagram (HD, sem login)",
    metaDescription:
      "Baixe Reels, vídeos, fotos, carrosséis e Stories públicos do Instagram em qualidade total. Grátis, rápido, sem login e sem precisar de app.",
    h1: "Baixar Reels, vídeos e fotos do Instagram em HD",
    sub: "Cole o link de um Reel, post, carrossel ou Story público e salve o original em qualidade total no seu aparelho.",
    highlights: [
      "Reels e posts de vídeo",
      "Fotos e carrosséis",
      "Stories e destaques públicos",
      "Sem login",
    ],
    sections: [
      {
        heading: "Tudo o que o Instagram deixa você ver, salvo do jeito certo",
        body: [
          "O Instagram só oferece itens salvos dentro do app, que somem quando o post é apagado. O ClipKoala entrega um arquivo de verdade: Reels e vídeos em MP4 na maior qualidade que o Instagram disponibiliza, fotos em JPG na resolução total e carrosséis com cada item listado, mais um ZIP do conjunto inteiro.",
          "Stories e destaques públicos funcionam enquanto estão no ar. Nada exige a sua conta do Instagram, e nunca pedimos senha.",
        ],
      },
      {
        heading: "Quais links do Instagram funcionam",
        body: [
          "instagram.com/reel/..., instagram.com/p/..., instagram.com/tv/..., links de Stories e links de destaques de contas públicas. Posts de contas privadas não podem ser baixados, de propósito.",
        ],
      },
    ],
    faqs: [
      {
        q: "Como baixar um Reel do Instagram?",
        a: "Toque nos três pontinhos ou na seta de compartilhar do Reel, escolha Copiar link e cole no ClipKoala. O MP4 em HD fica pronto em segundos.",
      },
      {
        q: "Preciso fazer login no Instagram?",
        a: "Não. O ClipKoala funciona com qualquer post público sem a sua conta. Nunca pedimos credenciais.",
      },
      {
        q: "Posso baixar de uma conta privada?",
        a: "Não. Só posts, Reels e Stories públicos podem ser baixados. Conteúdo privado e só para seguidores continua privado.",
      },
      {
        q: "Posso salvar um carrossel inteiro de uma vez?",
        a: "Sim. Cada foto e vídeo do carrossel aparece separado, e um botão Baixar tudo em ZIP junta o post inteiro em um único arquivo.",
      },
    ],
  },

  "facebook-downloader": {
    name: "Baixador de Facebook",
    metaTitle: "Baixar vídeos e Reels do Facebook em HD, grátis",
    metaDescription:
      "Baixe vídeos e Reels do Facebook em HD, incluindo links fb.watch e de compartilhamento. Grátis, sem cadastro, direto no navegador de qualquer aparelho.",
    h1: "Baixar vídeos e Reels do Facebook em HD",
    sub: "Funciona com links do Watch, links de compartilhamento, links curtos fb.watch e Reels. Salvo na melhor qualidade que o Facebook disponibiliza.",
    highlights: [
      "Vídeos e Reels",
      "Links fb.watch e de compartilhamento",
      "HD quando disponível",
      "Sem precisar de conta",
    ],
    sections: [
      {
        heading: "De uma lista para ver depois a um arquivo que é seu",
        body: [
          "O Facebook deixa você salvar vídeos em uma lista dentro do Facebook, mas não no seu celular ou computador. Cole qualquer link de vídeo público no ClipKoala e você recebe um MP4 normal: em HD quando o Facebook oferece, e em SD como alternativa menor.",
          "Transmissões ao vivo podem ser salvas depois que a transmissão termina e o replay fica público. Reels funcionam exatamente como vídeos comuns.",
        ],
      },
      {
        heading: "Quais links do Facebook funcionam",
        body: [
          "Links facebook.com/watch, links de posts de vídeo, links de Reels, links facebook.com/share/v/... e links curtos fb.watch. Vídeos dentro de grupos privados, eventos ou posts só para amigos não podem ser baixados.",
        ],
      },
    ],
    faqs: [
      {
        q: "Quais links do Facebook funcionam?",
        a: "Páginas de vídeo, links /watch, Reels, links de compartilhamento (facebook.com/share/v/...) e links curtos fb.watch. Cole o que o app te der.",
      },
      {
        q: "Por que aparece que o vídeo é privado?",
        a: "Só vídeos públicos podem ser baixados. Vídeos restritos a amigos, grupos ou a quem está logado não podem ser acessados. Isso é intencional.",
      },
      {
        q: "Qual qualidade eu recebo?",
        a: "A melhor qualidade que o Facebook disponibiliza para aquele vídeo, normalmente HD 720p ou 1080p quando disponível, com uma opção SD para arquivos menores.",
      },
    ],
  },

  "youtube-downloader": {
    name: "Baixador de YouTube",
    metaTitle: "Baixar vídeos do YouTube: MP4 até 1080p e MP3",
    metaDescription:
      "Baixe vídeos e Shorts do YouTube em MP4 de 360p a 1080p ou converta para MP3. Progresso ao vivo, grátis e ilimitado, sem programa para instalar.",
    h1: "Baixar vídeos e Shorts do YouTube",
    sub: "Escolha a qualidade, de 360p a Full HD 1080p, ou converta direto para MP3 com progresso ao vivo. Playlists e canais entram na fila como um lote.",
    highlights: [
      "Vídeos e Shorts",
      "MP4 até 1080p",
      "Áudio em MP3, M4A, WAV e FLAC",
      "Playlists e canais",
    ],
    sections: [
      {
        heading: "A qualidade que você escolher, convertida na hora",
        body: [
          "O YouTube transmite vídeo e áudio separadamente, então um baixador precisa juntar os dois. O ClipKoala faz isso na hora, na qualidade que você escolher, de 360p até 1080p, e mostra o progresso ao vivo no próprio botão. A maioria dos arquivos fica pronta em segundos; vídeos longos em HD podem levar até um minuto.",
          "Prefere áudio? Escolha MP3 a 320kbps, M4A, WAV ou FLAC sem perdas. Cole o link de uma playlist ou de um canal e os vídeos mais recentes entram em um lote que você salva com um clique.",
        ],
      },
      {
        heading: "Quais links do YouTube funcionam",
        body: [
          "youtube.com/watch, links curtos youtu.be, youtube.com/shorts, links de playlists e links de canais ou de @handle. Vídeos com restrição de idade, exclusivos para membros e privados não podem ser baixados.",
        ],
      },
    ],
    faqs: [
      {
        q: "Como converter um vídeo do YouTube para MP3?",
        a: "Cole o link do vídeo e escolha Baixar MP3. O áudio é convertido a 320kbps e salvo nos seus downloads. Veja a página dedicada de YouTube para MP3 para detalhes sobre M4A, WAV e FLAC.",
      },
      {
        q: "Por que o download demora um pouco para começar?",
        a: "Os arquivos do YouTube são convertidos na hora para a qualidade escolhida. Você vê o progresso ao vivo no botão; a maioria fica pronta em segundos.",
      },
      {
        q: "Shorts e playlists funcionam?",
        a: "Sim. Links youtube.com/shorts são baixados como qualquer vídeo, e links de playlists ou canais viram um lote com os vídeos mais recentes.",
      },
      {
        q: "Dá para baixar vídeos do YouTube em 4K?",
        a: "Ainda não. Os downloads vão até 1080p Full HD, o que atende a grande maioria dos usos e mantém as conversões rápidas.",
      },
    ],
  },

  "youtube-to-mp3": {
    name: "YouTube para MP3",
    metaTitle: "Converter YouTube para MP3 grátis em 320kbps",
    metaDescription:
      "Converta vídeos do YouTube para MP3 a 320kbps, ou para M4A, WAV e FLAC sem perdas. Conversor online grátis, com progresso ao vivo e sem cadastro.",
    h1: "Converter YouTube para MP3, grátis e em qualidade máxima",
    sub: "Cole um link do YouTube e salve o áudio em MP3 a 320kbps, ou escolha M4A, WAV ou FLAC sem perdas. Progresso ao vivo, sem programa.",
    highlights: [
      "MP3 a 320kbps",
      "Também M4A, WAV e FLAC",
      "Progresso da conversão ao vivo",
      "Playlists em lote",
    ],
    sections: [
      {
        heading: "Qual formato de áudio escolher?",
        body: [
          "O MP3 toca em qualquer aparelho e é a escolha segura; o ClipKoala sempre codifica em 320kbps, a maior taxa de bits que o formato suporta. O M4A (AAC) soa praticamente igual com arquivos menores e é o formato nativo dos aparelhos da Apple. O WAV não tem compressão e é grande, útil quando você pretende editar o áudio. O FLAC é compressão sem perdas: o áudio original exato em cerca de metade do tamanho do WAV, ideal para arquivar músicas.",
          "Seja qual for a sua escolha, a conversão roda nos nossos servidores e é enviada ao seu navegador assim que fica pronta. Nada é instalado no seu aparelho.",
        ],
      },
      {
        heading: "Podcasts, aulas, mixes e playlists inteiras",
        body: [
          "Gravações longas convertem sem problema; a barra de progresso mantém você informado e uma notificação aparece se você mudar de aba. Para converter muitos vídeos, cole o link de uma playlist e escolha o formato de áudio em cada item, ou use Salvar tudo para pegar a melhor opção disponível.",
        ],
      },
    ],
    faqs: [
      {
        q: "Qual é a taxa de bits dos arquivos MP3?",
        a: "320kbps, o máximo que o MP3 suporta. Não há nada para configurar; toda conversão para MP3 roda na qualidade máxima.",
      },
      {
        q: "A conversão de YouTube para MP3 é grátis?",
        a: "Sim. Não precisa de conta, não há limite de conversões e não existe restrição de duração além do tempo que um vídeo muito longo leva para ser processado.",
      },
      {
        q: "É legal converter vídeos do YouTube para MP3?",
        a: "Converter seus próprios envios, conteúdo Creative Commons ou áudio que você tem permissão para usar não tem problema. Baixar músicas protegidas por direitos autorais sem ter os direitos pode violar a lei e os termos do YouTube. Respeite os direitos dos criadores.",
      },
      {
        q: "Por que o FLAC é melhor que o MP3 para arquivar?",
        a: "O FLAC mantém cada bit do áudio original, enquanto o MP3 descarta alguns detalhes para diminuir o arquivo. Se você quer a melhor cópia possível para uma biblioteca de músicas, escolha FLAC; se quer compatibilidade e arquivo pequeno, escolha MP3.",
      },
    ],
  },

  "twitter-downloader": {
    name: "Baixador de X (Twitter)",
    metaTitle: "Baixar vídeos e GIFs do X (Twitter) em HD, grátis",
    metaDescription:
      "Baixe vídeos e GIFs do X (Twitter) em HD. Cole qualquer link de post do x.com ou twitter.com. Grátis, sem cadastro, no celular e no computador.",
    h1: "Baixar vídeos e GIFs do X (Twitter)",
    sub: "Cole qualquer link de post do x.com ou twitter.com e salve o vídeo ou GIF na melhor qualidade disponível.",
    highlights: [
      "Vídeos de posts em HD",
      "GIFs salvos em MP4",
      "Links x.com e twitter.com",
      "Sem precisar de conta",
    ],
    sections: [
      {
        heading: "O MP4 original, inclusive dos GIFs",
        body: [
          "O X não tem um jeito nativo de salvar o vídeo de um post. O ClipKoala busca o MP4 de maior qualidade que o X disponibiliza, geralmente na resolução em que foi enviado. Os GIFs animados do X são, na verdade, vídeos curtos em loop, então chegam como pequenos arquivos MP4 que tocam em qualquer lugar.",
          "Posts com vários vídeos listam cada um separadamente. O texto do post vira o nome do arquivo, para os clipes continuarem fáceis de reconhecer nos seus downloads.",
        ],
      },
      {
        heading: "Quais links do X funcionam",
        body: [
          "Links x.com/usuario/status/... e twitter.com/usuario/status/..., incluindo links copiados do app. Posts de contas protegidas, mídia com restrição de idade e posts só para assinantes não podem ser baixados.",
        ],
      },
    ],
    faqs: [
      {
        q: "Como copiar o link de um post no X?",
        a: "Toque no ícone de compartilhar embaixo do post e escolha Copiar link, depois cole no ClipKoala. Links x.com e twitter.com funcionam.",
      },
      {
        q: "Dá para baixar GIFs do X?",
        a: "Sim. Posts com GIF são salvos como clipes curtos em MP4, que tocam em qualquer lugar e mantêm a qualidade original.",
      },
      {
        q: "Por que um post não pode ser baixado?",
        a: "Posts de contas privadas ou com restrição de idade, e posts sem nenhuma mídia, não podem ser baixados.",
      },
    ],
  },

  "reddit-downloader": {
    name: "Baixador de Reddit",
    metaTitle: "Baixar vídeos do Reddit com som (HD, grátis)",
    metaDescription:
      "Baixe vídeos do Reddit com som em HD. Vídeo e áudio já vêm juntos. Funciona com links de posts, de compartilhamento e redd.it. Grátis, sem cadastro.",
    h1: "Baixar vídeos do Reddit, com o som",
    sub: "O Reddit guarda vídeo e áudio separados. O ClipKoala entrega os dois já juntos, então seu download toca com som em qualquer player.",
    highlights: [
      "Vídeo e áudio juntos",
      "GIFs em MP4",
      "Links de compartilhamento e redd.it",
      "Sem precisar de conta",
    ],
    sections: [
      {
        heading: "Por que a maioria dos downloads do Reddit fica sem som, e os nossos não",
        body: [
          "O host de vídeos do Reddit, v.redd.it, entrega a imagem e o áudio em dois fluxos separados. Se você salva o arquivo de vídeo direto, fica sem som. O ClipKoala resolve o post por um serviço que junta os dois em um único arquivo e envia esse arquivo para você, então o MP4 que você salva toca com som em qualquer lugar, da galeria do celular a um editor de vídeo.",
          "GIFs e posts de imagem do Reddit também podem ser baixados, e o título do post vira o nome do arquivo.",
        ],
      },
      {
        heading: "Quais links do Reddit funcionam",
        body: [
          "Links completos de posts (reddit.com/r/.../comments/...), links de compartilhamento do celular (reddit.com/r/.../s/...), links curtos redd.it e links diretos v.redd.it. Posts em subreddits privados ou em quarentena não podem ser baixados.",
        ],
      },
    ],
    faqs: [
      {
        q: "Por que os vídeos do Reddit costumam baixar sem som?",
        a: "O Reddit entrega o vídeo e o áudio em fluxos separados. Eles são juntados em um único arquivo antes de chegar até você, então o que você salva toca com som em qualquer player.",
      },
      {
        q: "Quais links do Reddit funcionam?",
        a: "Links completos de posts, links de compartilhamento do celular (reddit.com/r/.../s/...), links curtos redd.it e links diretos v.redd.it.",
      },
      {
        q: "Posso baixar de subreddits privados?",
        a: "Não. Só posts visíveis publicamente podem ser baixados.",
      },
    ],
  },

  "pinterest-downloader": {
    name: "Baixador de Pinterest",
    metaTitle: "Baixar vídeos do Pinterest: pins e imagens em HD",
    metaDescription:
      "Baixe pins de vídeo do Pinterest em MP4 e pins de imagem na resolução original. Links pinterest.com e pin.it de qualquer país. Grátis, sem cadastro.",
    h1: "Baixar vídeos e pins de imagem do Pinterest",
    sub: "Cole o link de um pin. Pins de vídeo são salvos em MP4 e pins de imagem como originais em resolução total, não prévias comprimidas.",
    highlights: [
      "Pins de vídeo em MP4",
      "Imagens na qualidade original",
      "Links curtos pin.it",
      "Domínios de todos os países",
    ],
    sections: [
      {
        heading: "Originais, não miniaturas",
        body: [
          "Clicar com o botão direito em um pin geralmente salva uma prévia reduzida. O ClipKoala busca o envio original, então pins de imagem chegam em resolução total e pins de vídeo como arquivos MP4 de verdade. Pins de ideia com várias páginas listam cada item separadamente.",
        ],
      },
      {
        heading: "Quais links do Pinterest funcionam",
        body: [
          "Links pinterest.com/pin/... de qualquer domínio regional (pinterest.co.uk, pinterest.de e assim por diante) e links curtos pin.it copiados do app. Pastas secretas não podem ser baixadas.",
        ],
      },
    ],
    faqs: [
      {
        q: "Como copiar o link de um pin?",
        a: "Abra o pin, toque no ícone de compartilhar e escolha Copiar link. Links pinterest.com e links curtos pin.it funcionam.",
      },
      {
        q: "Dá para baixar pins de imagem também?",
        a: "Sim. Pins de imagem são baixados como o arquivo original em resolução total, não uma prévia comprimida.",
      },
      {
        q: "Domínios de outros países, como pinterest.co.uk, funcionam?",
        a: "Sim. Todos os domínios regionais do Pinterest são compatíveis, assim como os links curtos pin.it do app.",
      },
    ],
  },

  "twitch-clip-downloader": {
    name: "Baixador de clipes da Twitch",
    metaTitle: "Baixar clipes da Twitch: salve em MP4 e HD",
    metaDescription:
      "Baixe clipes da Twitch em MP4 até 1080p. Cole qualquer link clips.twitch.tv ou twitch.tv/clip e escolha a qualidade. Grátis, sem cadastro.",
    h1: "Baixar clipes da Twitch em HD",
    sub: "Cole qualquer link de clipe e salve em MP4 na qualidade que preferir, até 1080p.",
    highlights: [
      "Clipes em MP4",
      "Até 1080p",
      "Links clips.twitch.tv e /clip",
      "Sem precisar de conta",
    ],
    sections: [
      {
        heading: "Guarde o momento depois que a Twitch segue em frente",
        body: [
          "Os clipes são a parte da Twitch mais fácil de compartilhar e a mais fácil de perder quando um canal é apagado ou um clipe é removido. O ClipKoala lista todas as qualidades que a Twitch oferece para um clipe, normalmente de 360p a 1080p, e salva a que você escolher em MP4, pronto para editar ou repostar.",
        ],
      },
      {
        heading: "Quais links da Twitch funcionam",
        body: [
          "Links clips.twitch.tv/... e twitch.tv/canal/clip/.... VODs, transmissões passadas completas e lives ainda não são compatíveis.",
        ],
      },
    ],
    faqs: [
      {
        q: "Como pegar o link de um clipe da Twitch?",
        a: "No clipe, clique em Compartilhar e copie o link. Links clips.twitch.tv/... e twitch.tv/canal/clip/... funcionam.",
      },
      {
        q: "Quais qualidades posso baixar?",
        a: "As que o clipe oferecer, normalmente de 360p até 1080p. O ClipKoala lista cada qualidade disponível separadamente.",
      },
      {
        q: "Posso baixar VODs completos ou lives?",
        a: "Ainda não. Só clipes são compatíveis. Canais, VODs e lives não podem ser baixados.",
      },
    ],
  },

  "soundcloud-downloader": {
    name: "Baixador de SoundCloud",
    metaTitle: "Baixar músicas do SoundCloud em MP3, grátis",
    metaDescription:
      "Baixe músicas do SoundCloud em MP3 na melhor qualidade que o autor permite, com a capa. Cole qualquer link de faixa. Grátis, sem cadastro.",
    h1: "Baixar músicas do SoundCloud em MP3",
    sub: "Cole o link de uma faixa e salve o áudio na melhor qualidade que o autor permite, com a capa incluída.",
    highlights: [
      "Faixas em MP3",
      "Qualidade original",
      "Capa incluída",
      "Sem precisar de conta",
    ],
    sections: [
      {
        heading: "Cópias offline das faixas que você ama",
        body: [
          "O modo offline do SoundCloud fica preso a uma assinatura e dentro do app. O ClipKoala salva um MP3 normal que você pode tocar em qualquer lugar, com o título da faixa e o artista nas tags e a capa junto. A qualidade corresponde ao que o autor disponibilizou.",
        ],
      },
      {
        heading: "Quais links do SoundCloud funcionam",
        body: [
          "Links soundcloud.com/artista/faixa e links curtos on.soundcloud.com do app. Faixas que o autor deixou só como prévia, e faixas privadas, não podem ser salvas. Links de playlists e de perfis ainda não são compatíveis.",
        ],
      },
    ],
    faqs: [
      {
        q: "Como copiar o link de uma faixa do SoundCloud?",
        a: "Toque em Compartilhar na faixa e escolha Copiar link. Links soundcloud.com e links curtos on.soundcloud.com funcionam.",
      },
      {
        q: "Por que algumas faixas não podem ser baixadas?",
        a: "Alguns autores desativam downloads ou oferecem só prévias. Essas faixas não podem ser salvas.",
      },
      {
        q: "Posso baixar playlists inteiras?",
        a: "Ainda não. Cole links de faixas individuais. Links de playlists e de perfis não são compatíveis.",
      },
    ],
  },

  "batch-video-downloader": {
    name: "Download em lote",
    metaTitle: "Baixar vários vídeos de uma vez: download em lote",
    metaDescription:
      "Baixe vários vídeos de uma vez do TikTok, YouTube, Instagram e mais. Cole uma lista de links, importe um .txt ou .csv ou use uma playlist do YouTube. Grátis.",
    h1: "Baixar vários vídeos de uma vez",
    sub: "Cole até 10 links de qualquer combinação de plataformas, importe um .txt ou .csv com links ou solte uma playlist do YouTube. Tudo é buscado em paralelo.",
    highlights: [
      "Até 10 links por lote",
      "Misture plataformas à vontade",
      "Importe .txt ou .csv",
      "Salve tudo com um clique",
    ],
    sections: [
      {
        heading: "Feito para editores, arquivistas e impacientes",
        body: [
          "Juntar clipes para uma edição, fazer backup dos seus próprios posts ou salvar uma playlist antes de um voo não deveria significar colar links um por um. Cole uma lista inteira no ClipKoala e ele muda para o modo lote automaticamente: cada link ganha sua própria linha com status ao vivo, opções de qualidade e um botão para tentar de novo, e Salvar tudo baixa a melhor qualidade de tudo de uma só vez.",
          "Os links podem vir de um app de notas, de uma coluna de planilha ou de uma conversa. Você também pode importar um arquivo .txt ou .csv, ou simplesmente arrastá-lo para a página. Links de playlists e de canais do YouTube viram os vídeos mais recentes deles.",
        ],
      },
      {
        heading: "Como os lotes continuam rápidos",
        body: [
          "Os lotes têm limite de 10 links e são buscados três de cada vez, o que mantém cada resultado rápido e evita sobrecarregar as plataformas. Quando um lote terminar, cole o próximo.",
        ],
      },
    ],
    faqs: [
      {
        q: "Quantos vídeos posso baixar de uma vez?",
        a: "Até 10 por lote. Você pode fazer quantos lotes quiser, um depois do outro.",
      },
      {
        q: "Posso misturar links do TikTok, YouTube e Instagram em um lote?",
        a: "Sim. A plataforma é detectada link por link, então qualquer combinação das nove plataformas compatíveis funciona em um único lote.",
      },
      {
        q: "Quais tipos de arquivo posso importar?",
        a: "Arquivos .txt simples com um link por linha e arquivos .csv exportados de planilhas. Aspas, vírgulas e colunas extras são tratadas automaticamente.",
      },
      {
        q: "O Salvar tudo escolhe a melhor qualidade?",
        a: "Sim. Salvar tudo pega a melhor opção de cada vídeo. Abra qualquer linha para escolher outro formato ou qualidade antes.",
      },
    ],
  },
};
