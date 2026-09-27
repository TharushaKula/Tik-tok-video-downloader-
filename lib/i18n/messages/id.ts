import type { LocaleMessages } from "../types";

// Indonesian (Bahasa Indonesia). Typed against the English source in ./en.ts.
// Friendly "kamu" register; common loanwords (download, link, watermark)
// are kept because that is what people actually type and search.

export const messages: LocaleMessages = {
  client: {
    common: {
      paste: "Tempel",
      clear: "Hapus",
      dismiss: "Abaikan",
      close: "Tutup",
      retry: "Coba lagi",
      save: "Simpan",
      new: "Baru",
      newAria: "Mulai download baru",
      fetch: "Ambil",
      fetching: "Mengambil…",
      freeForever: "Gratis selamanya",
      noSignUp: "Tanpa daftar",
      nothingStored: "Tidak ada yang disimpan",
    },

    menu: {
      open: "Buka menu",
      close: "Tutup menu",
      title: "Menu",
      downloaders: "Downloader",
      downloadVideo: "Download video",
    },

    theme: {
      label: "Tema",
      current: "Tema: {pref}, klik untuk mengganti",
      system: "sistem",
      light: "terang",
      dark: "gelap",
    },

    language: {
      label: "Bahasa",
      change: "Ganti bahasa",
    },

    tool: {
      serverUnreachable:
        "Kami tidak bisa terhubung ke server. Periksa koneksi kamu lalu coba lagi.",
      serverError:
        "Server mengalami masalah tak terduga. Tunggu sebentar lalu coba lagi.",
      unsupportedPlatform:
        "Link itu bukan dari platform yang didukung. Tempel link dari TikTok, Instagram, Facebook, YouTube, X, Reddit, Pinterest, Twitch, atau SoundCloud.",
      unexpected: "Terjadi kesalahan tak terduga",
      linksDetected: {
        one: "{count} link terdeteksi, sedang diambil",
        other: "{count} link terdeteksi, semuanya sedang diambil",
      },
      clipboardDenied: "Akses clipboard ditolak oleh browser",
      clipboardEmpty: "Clipboard kamu kosong",
      notSupportedLink: "Sepertinya itu bukan link yang didukung",
      dropFileHint: "Lepaskan link, atau file .txt/.csv berisi link",
      noLinksInFile: "Tidak ada link yang didukung di file itu",
      fileReadError: "Tidak bisa membaca file itu",
      clipboardNoticed: "Kami melihat ada {what} di clipboard kamu",
      clipboardLinks: {
        one: "sebuah link",
        other: "{count} link",
      },
      playlistError: "Tidak bisa memuat playlist itu",
      channelError: "Tidak bisa memuat channel itu",
      playlistLoadedRecent:
        "Playlist dimuat, mengambil {count} video terbaru",
      channelLoadedRecent: "Channel dimuat, mengambil {count} video terbaru",
      playlistLoaded: {
        one: "Playlist dimuat, mengambil {count} video",
        other: "Playlist dimuat, mengambil {count} video",
      },
      channelLoaded: {
        one: "Channel dimuat, mengambil {count} video",
        other: "Channel dimuat, mengambil {count} video",
      },
      savedToFavorites: "Disimpan ke favorit",
      removedFromFavorites: "Dihapus dari favorit",
      dropTitle: "Lepaskan link, atau file .txt/.csv berisi link",
      dropBody: "Kami akan mendeteksi platformnya dan langsung mengambil semuanya",
      linkBox: "kotak link",
      commands: "perintah",
    },

    url: {
      placeholder: "Tempel link TikTok, YouTube, Instagram, atau video apa pun…",
      aria: "URL video",
      clearLink: "Hapus link",
      pasteLinkAria: "Tempel link dari clipboard",
      batch: "Massal",
      batchAria: "Mode massal, tempel beberapa link",
      getVideo: "Ambil video",
      hintEmpty:
        "Tempel satu link, atau beberapa sekaligus. Platform terdeteksi otomatis",
      hintPlaylist:
        "Playlist YouTube terdeteksi, kami akan mengambil video terbarunya secara massal",
      hintChannel:
        "Channel YouTube terdeteksi, kami akan mengambil upload terbarunya secara massal",
      hintDetected: "Link {platform} terdeteksi, tekan Enter untuk mengambil",
      hintUnsupported: "Sepertinya link ini belum didukung",
      whichLinksWork: "link apa saja yang didukung",
      trustLine:
        "Hanya postingan publik, tanpa akun, dan tidak ada yang disimpan di server kami.",
      privateWhy: "Kenapa postingan privat tidak bisa diambil",
      importedLinks: {
        one: "{count} link diimpor dari {file}",
        other: "{count} link diimpor dari {file}",
      },
      batchPlaceholder:
        "Tempel link, satu per baris…\nhttps://www.tiktok.com/…\nhttps://youtu.be/…",
      batchTextAria: "URL video, satu per baris",
      pasteLinksAria: "Tempel link dari clipboard",
      importFile: "Impor file",
      importFileAria: "Impor link dari file .txt atau .csv",
      singleLink: "Satu link",
      singleLinkAria: "Kembali ke satu link",
      fetchVideos: "Ambil video",
      fetchCount: {
        one: "Ambil {count} video",
        other: "Ambil {count} video",
      },
      batchHintEmpty:
        "Satu link per baris, atau tempel teks apa pun, link-nya akan dipilah otomatis untukmu",
      batchValid: {
        one: "{count} link valid",
        other: "{count} link valid",
      },
      batchUnsupported: "{count} tidak didukung",
      batchCapped: "maksimal {max} per batch",
      batchShortcut: "Ctrl/⌘ + Enter untuk mengambil",
    },

    result: {
      sendToPhone: "Kirim ke HP",
      sendToPhoneAria: "Kirim ke HP dengan kode QR",
      continueOnPhone: "Lanjutkan di HP kamu",
      qrBody: "Pindai untuk membuka video ini di ClipKoala pada perangkat lain.",
      zipError: "Tidak bisa membuat ZIP",
      zipSaved: "ZIP berisi {count} gambar tersimpan",
      zipping: "Membuat ZIP…",
      zipAll: "Download semua ({count}) sebagai ZIP",
      previewUnavailable: "Pratinjau tidak tersedia untuk video ini",
      closePreview: "Tutup pratinjau",
      previewVideo: "Pratinjau video",
      removeFromSaved: "Hapus dari simpanan",
      saveToFavorites: "Simpan ke favorit",
      saved: "Tersimpan",
      saveThumbnail: "Simpan thumbnail",
      saveThumbnailAria: "Simpan gambar thumbnail",
      views: "tayangan",
      likes: "suka",
      comments: "komentar",
      shares: "dibagikan",
      saveAs: "Simpan sebagai",
      noteYouTube:
        "File YouTube dikonversi secara langsung, kamu akan melihat progresnya secara real-time, dan download dimulai otomatis begitu siap.",
      noteOther:
        "File diambil melalui server kami, jadi tidak ada yang perlu diinstal dan tidak perlu aplikasi.",
    },

    download: {
      preparingToast: "Menyiapkan file kamu, download dimulai begitu siap",
      startedToast: "Download dimulai, cek daftar download di browser kamu",
      failed: "Gagal memulai download",
      converting: "Mengonversi · {percent}%",
      preparing: "Menyiapkan…",
      inDownloads: "Ada di folder download",
      started: "Dimulai",
      optionLabel: "Download {what}",
      audio: "Audio",
      video: "Video",
      image: "Gambar",
    },

    batch: {
      title: "Download massal",
      progress: "{done} dari {total} diambil",
      failedCount: "{count} gagal",
      startingAll:
        "Memulai {count} download, browser kamu mungkin meminta izin untuk beberapa file",
      saving: "Menyimpan…",
      saveAll: "Simpan semua ({count})",
      waiting: "Menunggu…",
      fetchingFrom: "Mengambil dari {platform}…",
      formats: {
        one: "{platform} · {count} format",
        other: "{platform} · {count} format",
      },
      saveItemAria: "Simpan {title}",
      footnote:
        "Simpan semua mengambil kualitas terbaik untuk tiap video. Buka sebuah baris untuk memilih format lain.",
      fetchingVideo: "Mengambil video…",
    },

    errors: {
      title: "Kami tidak bisa mengambil yang ini",
      tipOpens: "Pastikan link-nya bisa dibuka di browser kamu",
      tipPrivate:
        "Postingan privat, dibatasi usia, atau dikunci wilayah tidak bisa diambil",
      tipRecopy: "Coba salin ulang link dari tombol Bagikan di aplikasinya",
      tipStatusBefore: "Masih terus terjadi?",
      tipStatusLink: "Cek halaman status",
      tipStatusAfter: "untuk melihat apakah platformnya sedang down",
      tryAgain: "Coba lagi",
      details: "Detail: {message}",
      classes: {
        unsupported_url:
          "ClipKoala tidak bisa membaca link itu. Pastikan itu postingan publik dari platform yang didukung.",
        private_or_restricted:
          "Postingan ini privat, dibatasi usia, atau hanya tersedia di wilayah tertentu, jadi tidak bisa diambil.",
        not_found:
          "Postingan ini tidak ditemukan. Mungkin sudah dihapus atau link-nya tidak lengkap.",
        no_media:
          "Tidak ada video atau audio yang bisa didownload di postingan ini.",
        rate_limited:
          "Platform sedang menerima terlalu banyak permintaan. Tunggu satu menit lalu coba lagi.",
        network:
          "Koneksi terputus saat mengambil. Periksa internet kamu lalu coba lagi.",
        resolver_down:
          "Layanan yang membaca platform ini sedang bermasalah. Coba lagi sebentar lagi.",
        unknown: "Terjadi kesalahan saat mengambil link ini.",
      },
    },

    share: {
      prompt: "Bermanfaat? Bagikan {page} ke teman kamu.",
      share: "Bagikan",
      copyLink: "Salin link",
      copied: "Tersalin",
      copiedToast: "Link tersalin, siap ditempel",
      clipboardBlocked: "Browser kamu memblokir akses clipboard",
      fallbackPitch: "Downloader video gratis, tanpa daftar",
      pitch: {
        tiktok:
          "Menyimpan video TikTok dalam HD tanpa watermark, gratis dan tanpa akun",
        youtube:
          "Mengambil video YouTube sebagai MP4 atau mengubahnya ke MP3, gratis dan tanpa akun",
        instagram:
          "Menyimpan Reels, postingan, dan carousel Instagram dalam kualitas penuh, tanpa login",
        facebook:
          "Menyimpan video dan Reels Facebook dalam HD, gratis dan tanpa akun",
        twitter:
          "Menyimpan video dan GIF dari postingan X dalam HD, gratis dan tanpa akun",
        reddit:
          "Menyimpan video Reddit lengkap dengan suaranya, gratis dan tanpa akun",
        pinterest:
          "Menyimpan pin video dan gambar Pinterest dalam resolusi penuh, tanpa akun",
        twitch:
          "Menyimpan klip Twitch sebagai MP4 hingga 1080p, gratis dan tanpa akun",
        soundcloud:
          "Menyimpan lagu SoundCloud sebagai MP3 beserta cover art-nya, tanpa akun",
      },
    },

    feedback: {
      thanks: "Terima kasih, itu sangat membantu.",
      job: {
        title: "Apa yang sedang kamu simpan?",
        note: "Sekali ketuk. Ini hanya memberi tahu kami kebutuhan mana yang perlu kami tingkatkan.",
        options: {
          own_post: "Postingan saya sendiri",
          reference_clip: "Klip referensi untuk editan",
          audio_offline: "Audio untuk didengar offline",
          teaching: "Materi untuk kelas atau pelajaran",
          archive: "Mengarsipkan postingan publik",
          other: "Hal lain",
        },
      },
      exit: {
        title: "Apa kendalanya?",
        note: "Sekali ketuk, dan ini lebih membantu dari yang kamu kira.",
        options: {
          error: "Gagal karena error",
          unsupported: "Link saya tidak didukung",
          quality: "Kualitas yang saya mau tidak tersedia",
          trust: "Saya ragu ini aman",
          slow: "Prosesnya terlalu lama",
          browsing: "Tidak ada, cuma lihat-lihat",
        },
      },
    },

    onboarding: {
      newHere: "Baru di sini?",
      body: "Buka video apa pun, ketuk tombol Bagikan, salin link-nya, lalu tempel di bawah. Pilihan download muncul dalam hitungan detik, dan menempel beberapa link sekaligus akan memulai download massal.",
      dismiss: "Tutup tips",
    },

    recent: {
      title: "Terbaru",
      aria: "Download terbaru",
      justNow: "baru saja",
      minutesAgo: "{count} mnt lalu",
      hoursAgo: "{count} jam lalu",
      daysAgo: "{count} hr lalu",
    },

    favorites: {
      title: "Tersimpan",
      aria: "Video tersimpan",
      all: "Semua",
      tagPlaceholder: "nama tag",
      newTagAria: "Tag baru",
      addTag: "tag",
      removeTag: "Hapus tag {tag}",
      editTags: "Edit tag untuk {title}",
      remove: "Hapus {title} dari simpanan",
    },

    usage: {
      saved: {
        one: "Kamu sudah menyimpan {count} video dengan ClipKoala",
        other: "Kamu sudah menyimpan {count} video dengan ClipKoala",
      },
      mostlyFrom: "kebanyakan dari",
    },

    filename: {
      settings: "Pengaturan nama file",
      title: "Nama file download",
      body: "Buat pola sendiri dengan variabel di bawah.",
      templateAria: "Template nama file",
      preview: "Pratinjau",
      reset: "Kembalikan ke default",
      resetToast: "Pola nama file dikembalikan ke default",
      vars: {
        title: "Judul video",
        author: "Pembuat / channel",
        platform: "Platform",
        quality: "Kualitas",
        date: "Tanggal hari ini",
      },
    },

    palette: {
      aria: "Palet perintah",
      placeholder: "Cari perintah, video tersimpan, halaman…",
      noMatch: "Tidak ada perintah yang cocok",
      groups: {
        actions: "Aksi",
        theme: "Tema",
        preferences: "Preferensi",
        saved: "Tersimpan",
        recent: "Terbaru",
        goTo: "Buka",
      },
      paste: "Tempel link dan ambil",
      pasteHint: "dari clipboard",
      themeSystem: "Pakai tema sistem",
      themeLight: "Ganti ke tema terang",
      themeDark: "Ganti ke tema gelap",
      toggleSound: "Nyalakan/matikan suara selesai",
      soundOn:
        "Suara selesai aktif, kamu akan mendengar bunyi lembut saat konversi selesai",
      soundOff: "Suara selesai nonaktif",
      home: "Beranda",
      platforms: "Platform yang didukung",
      howItWorks: "Cara kerja",
      faq: "FAQ",
      changelog: "Yang baru",
      status: "Status: apakah ClipKoala berfungsi?",
      features: "Fitur",
      extension: "Ekstensi browser",
      about: "Tentang ClipKoala",
      guides: "Panduan cara",
    },
  },

  site: {
    meta: {
      homeTitle: "ClipKoala: Download Video Online Gratis, Tanpa Daftar",
      homeShortTitle: "ClipKoala: Download Video Gratis",
      description:
        "Download video gratis dari TikTok, YouTube, Instagram, dan 6 platform lain. Simpan dalam HD tanpa watermark, atau ambil audionya sebagai MP3. Tanpa daftar.",
      shortDescription:
        "Download video gratis dari TikTok, YouTube, Instagram, dan enam platform lain. HD, tanpa watermark, MP3. Tanpa daftar.",
      tagline: "Simpan klip apa pun. Tetap bersih.",
      ogAlt:
        "ClipKoala: downloader video gratis untuk TikTok, YouTube, Instagram, dan lainnya",
      ogEyebrow: "Downloader video gratis",
      ogSubtitle:
        "Download video dari 9 platform dalam HD tanpa watermark, atau ambil audionya sebagai MP3. Tanpa daftar, tanpa batas.",
      skipToContent: "Langsung ke konten",
    },

    nav: {
      homeAria: "Beranda ClipKoala",
      primaryAria: "Utama",
      downloaders: "Downloader",
      useCases: "Kegunaan",
      guides: "Panduan",
      answers: "Jawaban",
      faq: "FAQ",
      howItWorks: "Cara kerja",
      downloadVideo: "Download video",
      about: "Tentang",
      extension: "Ekstensi browser",
      changelog: "Yang baru",
      status: "Status",
      glossary: "Glosarium",
      privacy: "Privasi",
    },

    footer: {
      blurb:
        "ClipKoala adalah downloader video online gratis untuk sembilan platform. HD, tanpa watermark, tanpa daftar.",
      downloaders: "Downloader",
      guides: "Panduan",
      allGuides: "Semua panduan",
      answers: "Jawaban",
      allAnswers: "Semua jawaban",
      audiences: "Untuk siapa",
      allUseCases: "Semua kegunaan",
      product: "Produk",
      company: "Perusahaan",
      languages: "Bahasa",
      videoDownloader: "Downloader video",
      features: "Fitur",
      extension: "Ekstensi browser",
      batch: "Download massal",
      changelog: "Yang baru",
      roadmap: "Roadmap",
      status: "Status",
      rss: "Feed RSS",
      about: "Tentang ClipKoala",
      faq: "FAQ",
      glossary: "Glosarium",
      press: "Kit pers",
      accessibility: "Aksesibilitas",
      terms: "Ketentuan layanan",
      privacy: "Kebijakan privasi",
      dmca: "Hak cipta & DMCA",
      security: "Laporkan masalah",
      inEnglish: "dalam bahasa Inggris",
      disclaimer:
        "ClipKoala tidak berafiliasi dengan TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, atau SoundCloud. Download hanya konten milik kamu sendiri atau yang kamu punya izin untuk disimpan.",
    },

    hero: {
      badge: "Gratis selamanya · Tanpa daftar · 9 platform",
      titleLine1: "Download video apa pun.",
      titleLine2: "Bersih, cepat, milikmu.",
      body: "ClipKoala menyimpan video dari TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, dan SoundCloud dalam HD, tanpa watermark. Tempel link, pilih kualitas, selesai. Atau ambil audionya saja sebagai MP3.",
      platformsAria: "Platform yang didukung",
      mascotAlt:
        "Maskot ClipKoala: koala memeluk clapperboard dengan tombol play",
    },

    features: {
      eyebrow: "Kenapa ClipKoala",
      title: "Semua yang seharusnya dilakukan downloader video, tanpa yang tidak perlu",
      body: "File bersih, pilihan kualitas yang nyata, dan alat yang menghargai waktu dan privasi kamu.",
      seeAll: "Lihat semua fitur",
      items: [
        {
          title: "Tanpa watermark",
          body: "Video TikTok datang sebagai file asli yang bersih. Tidak ada yang dipotong, diburamkan, atau di-encode ulang.",
        },
        {
          title: "Kualitas terbaik yang tersedia",
          body: "HD dan Full HD hingga 1080p, dipilih per download. Kamu selalu tahu apa yang akan kamu dapat sebelum menyimpan.",
        },
        {
          title: "Audio dalam format apa pun",
          body: "MP3 320kbps, M4A, WAV, atau FLAC lossless dari YouTube. Soundtrack MP3 dari TikTok dan SoundCloud.",
        },
        {
          title: "Download massal",
          body: "Tempel hingga 10 link, impor .txt atau .csv, atau masukkan playlist YouTube. Simpan semua dalam sekali klik.",
        },
        {
          title: "Privat sejak awal",
          body: "Tanpa akun, tanpa log yang terkait denganmu, tidak ada yang disimpan. Riwayat kamu hanya ada di browser kamu.",
        },
        {
          title: "Cepat di perangkat apa pun",
          body: "Hasil dalam sekitar dua detik. Halaman ringan yang tetap jalan di koneksi lambat dan HP lama.",
        },
      ],
    },

    how: {
      eyebrow: "Cara kerja",
      title: "Tiga langkah, sekitar sepuluh detik",
      body: "Tanpa akun, tanpa aplikasi, tidak perlu instal apa pun. Bisa di HP atau komputer apa pun.",
      steps: [
        {
          title: "Salin link",
          desc: "Ketuk Bagikan di TikTok, YouTube, Instagram, atau aplikasi lain yang didukung, lalu salin link videonya.",
        },
        {
          title: "Tempel di ClipKoala",
          desc: "Platform terdeteksi otomatis dan video muncul dengan semua format yang tersedia dalam sekitar dua detik.",
        },
        {
          title: "Simpan file kamu",
          desc: "Pilih kualitas, MP4 dalam HD atau audio sebagai MP3, lalu file masuk ke folder download dengan nama sesuai judul video.",
        },
      ],
    },

    platforms: {
      eyebrow: "Platform yang didukung",
      title: "Satu downloader untuk semua feed",
      body: "Tempel link dari platform mana pun di bawah ini. ClipKoala mendeteksinya dan mengambil kualitas terbaik yang tersedia.",
      supports: {
        tiktok: ["Video tanpa watermark", "Slideshow foto", "Audio MP3"],
        instagram: ["Reels & postingan video", "Postingan foto", "Stories & highlight"],
        facebook: ["Video & Reels", "Link Watch & share", "Kualitas HD"],
        youtube: ["Video, Shorts & playlist", "MP4 hingga 1080p", "Audio MP3"],
        twitter: ["Video tweet", "GIF sebagai MP4", "Kualitas HD"],
        reddit: ["Video dengan suara", "GIF sebagai MP4", "Link share & redd.it"],
        pinterest: ["Pin video", "Pin gambar dalam HD", "Link pendek pin.it"],
        twitch: ["Klip dalam HD", "Hingga 1080p", "Link clips.twitch.tv"],
        soundcloud: ["Lagu sebagai MP3", "Kualitas asli", "Cover art"],
      },
    },

    trust: {
      eyebrow: "Dibangun atas kepercayaan",
      title: "Downloader yang bisa kamu rekomendasikan ke teman yang paling gaptek",
      body: "Kebanyakan situs download penuh tombol palsu dan pop-up. ClipKoala cuma satu kotak, satu hasil, dan daftar jelas tentang apa yang akan kamu simpan.",
      mascotAlt: "Koala ClipKoala memeluk clapperboard dengan tombol play",
      points: [
        {
          title: "Gratis, tanpa jebakan",
          body: "Tanpa akun, tanpa paywall, tanpa batas download, tanpa tingkat kualitas 'premium'. Semua format tersedia untuk semua orang.",
        },
        {
          title: "Kami tidak menyimpan link kamu",
          body: "Link diproses lalu dibuang. File hanya dialirkan, tidak pernah disimpan. Riwayat dan favorit hanya ada di browser kamu.",
        },
        {
          title: "Tidak pernah meminta password kamu",
          body: "ClipKoala hanya membaca postingan publik. ClipKoala tidak bisa mengakses akun privat dan tidak pernah meminta kredensial platform.",
        },
        {
          title: "Jujur soal uptime",
          body: "Halaman status publik menjalankan pengecekan langsung ke setiap platform, jadi kamu bisa melihat sendiri saat ada yang down.",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "Pertanyaan, terjawab",
      more: "Masih ada pertanyaan?",
      readFull: "Baca FAQ lengkap",
      landingTitle: "Pertanyaan seputar {name}",
      home: [
        {
          q: "Apa itu ClipKoala?",
          a: "ClipKoala adalah downloader video online gratis. Tempel link dari TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, atau SoundCloud lalu simpan videonya dalam HD, tanpa watermark, atau ambil audionya sebagai MP3. Semuanya berjalan di browser kamu, tanpa akun dan tanpa software yang perlu diinstal.",
        },
        {
          q: "Platform dan format apa saja yang didukung?",
          a: "TikTok (video tanpa watermark, slideshow foto, MP3), Reels, postingan, carousel, dan Stories publik Instagram, video dan Reels Facebook, video, Shorts, playlist, dan channel YouTube (MP4 hingga 1080p atau MP3, M4A, WAV, FLAC), video dan GIF X (Twitter), video Reddit dengan suara, pin video dan gambar Pinterest, klip Twitch, dan lagu SoundCloud sebagai MP3.",
        },
        {
          q: "Apakah ClipKoala benar-benar gratis?",
          a: "Ya. Setiap download, dalam semua kualitas, tanpa akun, tanpa batas, dan tanpa biaya tersembunyi.",
        },
        {
          q: "Apakah download TikTok benar-benar tanpa watermark?",
          a: "Ya. ClipKoala mengambil file asli yang disimpan TikTok sebelum watermark ditambahkan. Tidak ada yang dipotong, diburamkan, atau di-encode ulang.",
        },
        {
          q: "Bisakah saya download beberapa video sekaligus?",
          a: "Bisa. Tempel beberapa link sekaligus, atau pakai tombol Massal, dan ClipKoala mengambil hingga 10 video sekaligus. Setiap video punya barisnya sendiri dengan pilihan kualitas, dan Simpan semua mengambil kualitas terbaik untuk semuanya dalam sekali jalan.",
        },
        {
          q: "Bisakah saya download video privat?",
          a: "Tidak. Hanya postingan publik yang bisa diambil. Konten privat, khusus pengikut, atau dibatasi usia memang sengaja tidak bisa diakses, untuk menghormati privasi kreator.",
        },
        {
          q: "Apakah link atau download saya disimpan?",
          a: "Tidak. Link diproses secara langsung dan segera dibuang. File dialirkan melalui server kami ke browser kamu dan tidak pernah disimpan. Daftar download terbaru kamu hanya ada di browser kamu sendiri dan bisa dihapus kapan saja.",
        },
        {
          q: "Apakah download video diperbolehkan?",
          a: "Download boleh untuk konten milik kamu sendiri, konten yang kamu punya izin untuk disimpan, serta media domain publik atau Creative Commons. Selalu hormati hak kreator dan ketentuan layanan setiap platform.",
        },
      ],
    },

    cta: {
      title: "Siap menyimpan klip pertamamu?",
      body: "Tempel link dari salah satu dari sembilan platform. Gratis, tanpa daftar, sekitar dua detik.",
      label: "Download video",
      homeTitle: "Simpan klip pertamamu dalam sepuluh detik ke depan",
      homeBody:
        "Scroll ke atas, tempel link, lalu pilih kualitas. Tanpa akun, tanpa batas, tanpa watermark.",
      homeLabel: "Kembali ke downloader",
      aria: "Mulai",
    },

    landing: {
      allPlatforms: "Semua platform",
      aboutAria: "Tentang downloader ini",
      guideEyebrow: "Panduan langkah demi langkah",
      answersBefore: "Kalau link gagal, penyebab paling umum dibahas di",
      and: "dan",
      audienceBefore:
        "Kalau kamu melakukan ini sebagai bagian dari pekerjaan yang lebih besar,",
      audienceLink: "alur kerja untuk {name}",
      audienceAfter: "menjelaskan semuanya dari awal sampai akhir.",
      moreDownloaders: "Downloader lainnya",
      ogEyebrowPlatform: "Downloader {platform}",
      ogEyebrowGeneric: "Downloader video gratis",
      ogAlt: "Downloader video ClipKoala",
    },

    breadcrumbs: {
      aria: "Breadcrumb",
      home: "Beranda",
    },

    notFound: {
      title: "Halaman tidak ditemukan",
      heading: "Cabang ini kosong",
      body: "Halaman yang kamu cari sudah dipindah atau memang tidak pernah ada. Downloader hanya sekali klik, dan setiap platform punya halamannya sendiri.",
      cta: "Buka downloader",
    },
  },
};
