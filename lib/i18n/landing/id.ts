import type { LandingTranslations } from "../types";

// Indonesian copy for the tool landing pages. Structure (slug, platform,
// related pages, dates) comes from the English entry in lib/landing.

export const landing: LandingTranslations = {
  "tiktok-downloader": {
    name: "Downloader TikTok",
    metaTitle: "Download Video TikTok Tanpa Watermark (HD, Gratis)",
    metaDescription:
      "Download video TikTok tanpa watermark dalam HD, simpan slideshow foto, atau ambil suaranya sebagai MP3. Gratis, cepat, tanpa daftar dan tanpa aplikasi.",
    h1: "Download video TikTok tanpa watermark",
    sub: "Tempel link TikTok apa pun dan simpan file HD aslinya yang bersih. Termasuk slideshow foto dan soundtrack MP3.",
    highlights: [
      "Tanpa watermark, selalu",
      "Kualitas HD dan SD",
      "Slideshow foto sebagai gambar",
      "Soundtrack sebagai MP3",
    ],
    sections: [
      {
        heading: "Kenapa watermark-nya hilang, bukan disembunyikan",
        body: [
          "Tombol Simpan video bawaan TikTok menempelkan watermark bergerak ke dalam file. ClipKoala mengambil versi asli yang bersih yang disimpan TikTok sebelum watermark ditambahkan, jadi tidak ada yang dipotong, diburamkan, atau di-encode ulang. Kamu mendapat resolusi dan bitrate yang sama dengan yang diupload kreator.",
          "Setiap hasil menyediakan file MP4 HD dan SD, plus MP3 dari soundtrack-nya. Untuk slideshow foto, setiap slide tampil sebagai gambar terpisah, dengan ZIP sekali klik untuk seluruh set.",
        ],
      },
      {
        heading: "Link TikTok apa saja yang bisa",
        body: [
          "Link video lengkap (tiktok.com/@user/video/...), link share pendek dari aplikasi (vm.tiktok.com dan vt.tiktok.com), dan link slideshow foto. Video privat, khusus teman, dan yang sudah dihapus tidak bisa diambil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Bagaimana cara download TikTok tanpa watermark?",
        a: "Buka TikTok, ketuk Bagikan di video, pilih Salin link, lalu tempel di ClipKoala. Pilih Download HD dan MP4 tanpa watermark tersimpan di perangkat kamu. Tidak ada proses edit atau crop.",
      },
      {
        q: "Bisakah saya download slideshow foto TikTok?",
        a: "Bisa. Tempel link slideshow dan setiap slide muncul sebagai download gambar terpisah, bersama soundtrack dalam MP3 dan tombol Download semua sebagai ZIP.",
      },
      {
        q: "Bisakah saya menyimpan suaranya saja dari TikTok?",
        a: "Bisa. Setiap hasil TikTok menyertakan pilihan Download Audio yang menyimpan soundtrack sebagai file MP3.",
      },
      {
        q: "Apakah bisa di iPhone dan Android?",
        a: "Bisa. ClipKoala berjalan di browser HP apa pun. Di Android, kamu juga bisa menginstalnya sebagai aplikasi dan membagikan video TikTok langsung ke ClipKoala dari menu share.",
      },
    ],
  },

  "instagram-downloader": {
    name: "Downloader Instagram",
    metaTitle: "Download Reels & Video Instagram (HD, Tanpa Login)",
    metaDescription:
      "Download Reels, video, foto, carousel, dan Stories publik Instagram dalam kualitas penuh. Gratis, cepat, tanpa login dan tanpa aplikasi.",
    h1: "Download Reels, video, dan foto Instagram dalam HD",
    sub: "Tempel link Reel, postingan, carousel, atau Story publik dan simpan file asli berkualitas penuh ke perangkat kamu.",
    highlights: [
      "Reels dan postingan video",
      "Foto dan carousel",
      "Stories dan Highlight publik",
      "Tanpa login",
    ],
    sections: [
      {
        heading: "Semua yang bisa kamu lihat di Instagram, tersimpan dengan benar",
        body: [
          "Instagram hanya menyediakan bookmark di dalam aplikasi, yang hilang saat postingan dihapus. ClipKoala memberimu file sungguhan: Reels dan video sebagai MP4 dalam kualitas tertinggi yang disediakan Instagram, foto sebagai JPG resolusi penuh, dan carousel dengan setiap item ditampilkan plus ZIP untuk seluruh set.",
          "Stories dan Highlight publik bisa diambil selama masih tayang. Akun Instagram kamu tidak diperlukan sama sekali, dan kami tidak pernah meminta password.",
        ],
      },
      {
        heading: "Link Instagram apa saja yang bisa",
        body: [
          "instagram.com/reel/..., instagram.com/p/..., instagram.com/tv/..., link story, dan link highlight dari akun publik. Postingan dari akun privat memang sengaja tidak bisa diambil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Bagaimana cara download Reel Instagram?",
        a: "Ketuk titik tiga atau panah Bagikan di Reel, pilih Salin link, lalu tempel di ClipKoala. MP4 HD siap dalam hitungan detik.",
      },
      {
        q: "Apakah saya perlu login ke Instagram?",
        a: "Tidak. ClipKoala bisa dipakai untuk postingan publik mana pun tanpa akun kamu. Kami tidak pernah meminta kredensial.",
      },
      {
        q: "Bisakah saya download dari akun privat?",
        a: "Tidak. Hanya postingan, Reels, dan Stories publik yang bisa diambil. Konten privat dan khusus pengikut tetap privat.",
      },
      {
        q: "Bisakah saya menyimpan seluruh carousel sekaligus?",
        a: "Bisa. Setiap foto dan video di carousel ditampilkan terpisah, dan tombol Download semua sebagai ZIP menggabungkan seluruh postingan menjadi satu file.",
      },
    ],
  },

  "facebook-downloader": {
    name: "Downloader Facebook",
    metaTitle: "Download Video Facebook: Video & Reels dalam HD",
    metaDescription:
      "Download video dan Reels Facebook dalam HD, termasuk link fb.watch dan link share. Gratis, tanpa daftar, langsung di browser di perangkat apa pun.",
    h1: "Download video dan Reels Facebook dalam HD",
    sub: "Bisa untuk link watch, link share, link pendek fb.watch, dan Reels. Tersimpan dalam kualitas terbaik yang disediakan Facebook.",
    highlights: [
      "Video dan Reels",
      "Link fb.watch dan share",
      "HD jika tersedia",
      "Tanpa akun",
    ],
    sections: [
      {
        heading: "Dari daftar tonton nanti ke file milikmu sendiri",
        body: [
          "Facebook memungkinkan kamu menyimpan video ke daftar di dalam Facebook, tapi tidak ke HP atau komputer kamu. Tempel link video publik apa pun ke ClipKoala dan kamu mendapat MP4 biasa: HD jika Facebook menyediakannya, SD sebagai alternatif yang lebih kecil.",
          "Siaran live bisa disimpan setelah siarannya selesai dan rekamannya publik. Reels bisa diambil persis seperti video biasa.",
        ],
      },
      {
        heading: "Link Facebook apa saja yang bisa",
        body: [
          "Link facebook.com/watch, link postingan video, link Reel, link facebook.com/share/v/..., dan link pendek fb.watch. Video di grup privat, acara, atau postingan khusus teman tidak bisa diambil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Link Facebook apa saja yang bisa?",
        a: "Halaman video, link /watch, Reels, link share (facebook.com/share/v/...), dan link pendek fb.watch. Tempel link apa pun yang diberikan aplikasinya.",
      },
      {
        q: "Kenapa muncul keterangan videonya privat?",
        a: "Hanya video publik yang bisa diambil. Video yang dibatasi untuk teman, grup, atau penonton yang login tidak bisa diakses. Itu memang disengaja.",
      },
      {
        q: "Kualitas apa yang saya dapat?",
        a: "Kualitas terbaik yang disediakan Facebook untuk video tersebut, biasanya HD 720p atau 1080p jika tersedia, dengan pilihan SD untuk file yang lebih kecil.",
      },
    ],
  },

  "youtube-downloader": {
    name: "Downloader YouTube",
    metaTitle: "Download Video YouTube: MP4 hingga 1080p & MP3",
    metaDescription:
      "Download video dan Shorts YouTube sebagai MP4 360p sampai 1080p, atau ubah ke MP3. Progres konversi langsung, gratis tanpa batas, tanpa instal software.",
    h1: "Download video dan Shorts YouTube",
    sub: "Pilih kualitas, dari 360p sampai Full HD 1080p, atau ubah langsung ke MP3 dengan progres real-time. Playlist dan channel masuk antrean sebagai download massal.",
    highlights: [
      "Video dan Shorts",
      "MP4 hingga 1080p",
      "Audio MP3, M4A, WAV, FLAC",
      "Playlist dan channel",
    ],
    sections: [
      {
        heading: "Kualitas pilihanmu, dikonversi sesuai permintaan",
        body: [
          "YouTube mengalirkan video dan audio secara terpisah, jadi downloader harus menggabungkannya. ClipKoala melakukannya secara langsung dalam kualitas yang kamu pilih, dari 360p hingga 1080p, dan menampilkan progresnya langsung di tombol. Sebagian besar file siap dalam hitungan detik; video HD yang panjang bisa memakan waktu hingga satu menit.",
          "Lebih suka audio? Pilih MP3 320kbps, M4A, WAV, atau FLAC lossless. Tempel link playlist atau channel dan video terbarunya akan berjejer sebagai batch yang bisa kamu simpan dalam sekali klik.",
        ],
      },
      {
        heading: "Link YouTube apa saja yang bisa",
        body: [
          "youtube.com/watch, link pendek youtu.be, youtube.com/shorts, link playlist, dan link channel atau @handle. Video yang dibatasi usia, khusus member, dan privat tidak bisa diambil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Bagaimana cara mengubah video YouTube ke MP3?",
        a: "Tempel link video, lalu pilih Download MP3. Audio dikonversi dalam 320kbps dan tersimpan di folder download kamu. Lihat halaman khusus YouTube ke MP3 untuk detail soal M4A, WAV, dan FLAC.",
      },
      {
        q: "Kenapa download-nya butuh waktu sebentar untuk mulai?",
        a: "File YouTube dikonversi ke kualitas pilihanmu sesuai permintaan. Kamu akan melihat progres langsung di tombol; sebagian besar file siap dalam hitungan detik.",
      },
      {
        q: "Apakah Shorts dan playlist bisa?",
        a: "Bisa. Link youtube.com/shorts bisa didownload seperti video biasa, dan link playlist atau channel akan diurai menjadi batch berisi video terbarunya.",
      },
      {
        q: "Bisakah saya download video YouTube 4K?",
        a: "Belum. Download tersedia hingga 1080p Full HD, yang mencakup sebagian besar kebutuhan sekaligus menjaga konversi tetap cepat.",
      },
    ],
  },

  "youtube-to-mp3": {
    name: "YouTube ke MP3",
    metaTitle: "YouTube ke MP3: Konverter Online Gratis 320kbps",
    metaDescription:
      "Ubah video YouTube ke MP3 320kbps, atau ke M4A, WAV, dan FLAC lossless. Konverter online gratis dengan progres langsung, tanpa daftar, tanpa instal apa pun.",
    h1: "Konversi YouTube ke MP3, gratis dan dalam kualitas penuh",
    sub: "Tempel link YouTube dan simpan audionya sebagai MP3 320kbps, atau pilih M4A, WAV, atau FLAC lossless. Progres langsung, tanpa software.",
    highlights: [
      "MP3 320kbps",
      "Juga M4A, WAV, FLAC",
      "Progres konversi langsung",
      "Playlist secara massal",
    ],
    sections: [
      {
        heading: "Format audio mana yang sebaiknya kamu pilih?",
        body: [
          "MP3 bisa diputar di semua perangkat dan jadi pilihan default yang aman; ClipKoala selalu meng-encode-nya dalam 320kbps, bitrate tertinggi yang didukung format ini. M4A (AAC) terdengar kurang lebih sama dengan ukuran file lebih kecil dan merupakan format bawaan perangkat Apple. WAV tidak terkompresi dan berukuran besar, berguna jika kamu berencana mengedit audionya. FLAC adalah kompresi lossless: audio asli yang persis sama dengan ukuran sekitar setengah WAV, ideal untuk mengarsipkan musik.",
          "Apa pun pilihanmu, konversi berjalan di server kami dan dialirkan ke browser kamu begitu siap. Tidak ada yang diinstal di perangkat kamu.",
        ],
      },
      {
        heading: "Podcast, kuliah, mix, dan seluruh playlist",
        body: [
          "Rekaman panjang tetap bisa dikonversi dengan baik; progress bar terus memberi kabar dan notifikasi muncul jika kamu pindah tab. Untuk mengonversi banyak video, tempel link playlist dan pilih format audio di setiap item, atau pakai Simpan semua untuk pilihan terbaik yang tersedia.",
        ],
      },
    ],
    faqs: [
      {
        q: "Berapa bitrate file MP3-nya?",
        a: "320kbps, maksimum yang didukung MP3. Tidak ada yang perlu diatur; setiap konversi MP3 berjalan dalam kualitas tertinggi.",
      },
      {
        q: "Apakah konversi YouTube ke MP3 gratis?",
        a: "Ya. Tanpa akun, tanpa batas jumlah konversi, dan tanpa batasan durasi selain waktu yang dibutuhkan untuk memproses video yang sangat panjang.",
      },
      {
        q: "Apakah legal mengubah video YouTube ke MP3?",
        a: "Mengonversi upload kamu sendiri, konten Creative Commons, atau audio yang kamu punya izin untuk digunakan tidak masalah. Download musik berhak cipta yang tidak kamu miliki haknya bisa melanggar hukum dan ketentuan YouTube. Hormati hak kreator.",
      },
      {
        q: "Kenapa FLAC lebih baik dari MP3 untuk arsip?",
        a: "FLAC menyimpan setiap bit audio asli, sementara MP3 membuang sebagian detail untuk memperkecil file. Kalau kamu ingin salinan terbaik untuk koleksi musik, pilih FLAC; kalau kamu ingin kompatibilitas dan ukuran kecil, pilih MP3.",
      },
    ],
  },

  "twitter-downloader": {
    name: "Downloader X (Twitter)",
    metaTitle: "Download Video X (Twitter): Video & GIF dalam HD",
    metaDescription:
      "Download video dan GIF dari X (Twitter) dalam HD. Tempel link postingan x.com atau twitter.com apa pun. Gratis, tanpa daftar, bisa di HP dan desktop.",
    h1: "Download video dan GIF dari X (Twitter)",
    sub: "Tempel link postingan x.com atau twitter.com apa pun dan simpan video atau GIF-nya dalam kualitas terbaik yang tersedia.",
    highlights: [
      "Video postingan dalam HD",
      "GIF disimpan sebagai MP4",
      "Link x.com dan twitter.com",
      "Tanpa akun",
    ],
    sections: [
      {
        heading: "MP4 aslinya, termasuk GIF",
        body: [
          "X tidak punya cara bawaan untuk menyimpan video dari postingan. ClipKoala mengambil MP4 kualitas tertinggi yang disediakan X, biasanya sesuai resolusi saat diupload. GIF animasi di X sebenarnya adalah video pendek yang berulang, jadi hasilnya berupa file MP4 kecil yang bisa diputar di mana saja.",
          "Postingan dengan beberapa video menampilkan masing-masing secara terpisah. Teks postingan dijadikan nama file supaya klip tetap mudah dikenali di folder download kamu.",
        ],
      },
      {
        heading: "Link X apa saja yang bisa",
        body: [
          "Link x.com/user/status/... dan twitter.com/user/status/..., termasuk link yang disalin dari aplikasi. Postingan dari akun yang dilindungi, media dengan batasan usia, dan postingan khusus pelanggan tidak bisa diambil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Bagaimana cara menyalin link postingan di X?",
        a: "Ketuk ikon share di bawah postingan dan pilih Salin link, lalu tempel di ClipKoala. Link x.com maupun twitter.com sama-sama bisa.",
      },
      {
        q: "Bisakah saya download GIF dari X?",
        a: "Bisa. Postingan GIF disimpan sebagai klip MP4 pendek, yang bisa diputar di mana saja dan mempertahankan kualitas aslinya.",
      },
      {
        q: "Kenapa sebuah postingan tidak bisa diambil?",
        a: "Postingan dari akun privat atau yang dibatasi usia, serta postingan tanpa media apa pun, tidak bisa didownload.",
      },
    ],
  },

  "reddit-downloader": {
    name: "Downloader Reddit",
    metaTitle: "Download Video Reddit dengan Suara (HD, Gratis)",
    metaDescription:
      "Download video Reddit dengan suara dalam HD. Video dan audio digabung otomatis. Bisa untuk link postingan, share, dan redd.it. Gratis, tanpa daftar.",
    h1: "Download video Reddit lengkap dengan suaranya",
    sub: "Reddit menyimpan video dan audio secara terpisah. ClipKoala memberikannya sudah tergabung, jadi hasil download kamu bisa diputar dengan suara di pemutar apa pun.",
    highlights: [
      "Video dan audio digabung",
      "GIF sebagai MP4",
      "Link share dan redd.it",
      "Tanpa akun",
    ],
    sections: [
      {
        heading: "Kenapa kebanyakan download Reddit tanpa suara, dan kenapa punya kami tidak",
        body: [
          "Host video Reddit, v.redd.it, menyajikan gambar dan audio sebagai dua aliran terpisah. Kalau file videonya disimpan langsung, hasilnya tanpa suara. ClipKoala memproses postingan melalui layanan yang menggabungkan keduanya menjadi satu file, lalu mengalirkannya ke kamu, jadi MP4 yang kamu simpan punya suara di mana saja, dari galeri HP sampai aplikasi edit video.",
          "GIF dan postingan gambar Reddit juga bisa didownload, dan judul postingan dijadikan nama file.",
        ],
      },
      {
        heading: "Link Reddit apa saja yang bisa",
        body: [
          "Link postingan lengkap (reddit.com/r/.../comments/...), link share dari HP (reddit.com/r/.../s/...), link pendek redd.it, dan link langsung v.redd.it. Postingan di subreddit privat atau yang dikarantina tidak bisa diambil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kenapa video Reddit biasanya terdownload tanpa suara?",
        a: "Reddit menyajikan video dan audio sebagai aliran terpisah. Keduanya digabung menjadi satu file sebelum sampai ke kamu, jadi yang kamu simpan bisa diputar dengan suara di pemutar apa pun.",
      },
      {
        q: "Link Reddit apa saja yang bisa?",
        a: "Link postingan lengkap, link share dari HP (reddit.com/r/.../s/...), link pendek redd.it, dan link langsung v.redd.it.",
      },
      {
        q: "Bisakah saya download dari subreddit privat?",
        a: "Tidak. Hanya postingan yang terlihat publik yang bisa diambil.",
      },
    ],
  },

  "pinterest-downloader": {
    name: "Downloader Pinterest",
    metaTitle: "Download Video Pinterest: Pin & Gambar dalam HD",
    metaDescription:
      "Download pin video Pinterest sebagai MP4 dan pin gambar dalam resolusi asli. Untuk link pinterest.com dan pin.it dari negara mana pun. Gratis, tanpa daftar.",
    h1: "Download video dan pin gambar Pinterest",
    sub: "Tempel link pin. Pin video tersimpan sebagai MP4 dan pin gambar sebagai file asli resolusi penuh, bukan pratinjau yang dikompres.",
    highlights: [
      "Pin video sebagai MP4",
      "Gambar dalam kualitas asli",
      "Link pendek pin.it",
      "Semua domain negara",
    ],
    sections: [
      {
        heading: "File asli, bukan thumbnail",
        body: [
          "Klik kanan pada pin biasanya hanya menyimpan pratinjau yang diperkecil. ClipKoala mencari file upload aslinya, jadi pin gambar datang dalam resolusi penuh dan pin video sebagai file MP4 yang layak. Idea pin dengan beberapa halaman menampilkan setiap item secara terpisah.",
        ],
      },
      {
        heading: "Link Pinterest apa saja yang bisa",
        body: [
          "Link pinterest.com/pin/... dari domain regional mana pun (pinterest.co.uk, pinterest.de, dan seterusnya) serta link pendek pin.it yang disalin dari aplikasi. Board rahasia tidak bisa diambil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Bagaimana cara menyalin link pin?",
        a: "Buka pin, ketuk ikon share, dan pilih Salin link. Link pinterest.com maupun link pendek pin.it sama-sama bisa.",
      },
      {
        q: "Bisakah saya download pin gambar juga?",
        a: "Bisa. Pin gambar terdownload sebagai file asli resolusi penuh, bukan pratinjau yang dikompres.",
      },
      {
        q: "Apakah domain negara seperti pinterest.co.uk bisa?",
        a: "Bisa. Semua domain regional Pinterest didukung, begitu juga link pendek pin.it dari aplikasi.",
      },
    ],
  },

  "twitch-clip-downloader": {
    name: "Downloader Klip Twitch",
    metaTitle: "Download Klip Twitch: Simpan sebagai MP4 dalam HD",
    metaDescription:
      "Download klip Twitch sebagai MP4 hingga 1080p. Tempel link clips.twitch.tv atau twitch.tv/clip apa pun dan pilih kualitasnya. Gratis, tanpa daftar.",
    h1: "Download klip Twitch dalam HD",
    sub: "Tempel link klip apa pun dan simpan sebagai MP4 dalam kualitas pilihanmu, hingga 1080p.",
    highlights: [
      "Klip sebagai MP4",
      "Hingga 1080p",
      "Link clips.twitch.tv dan /clip",
      "Tanpa akun",
    ],
    sections: [
      {
        heading: "Simpan momennya sebelum hilang dari Twitch",
        body: [
          "Klip adalah bagian Twitch yang paling mudah dibagikan sekaligus paling mudah hilang saat channel dihapus atau klip diturunkan. ClipKoala menampilkan setiap kualitas yang disediakan Twitch untuk sebuah klip, biasanya 360p hingga 1080p, dan menyimpan yang kamu pilih sebagai MP4 yang siap diedit atau diposting ulang.",
        ],
      },
      {
        heading: "Link Twitch apa saja yang bisa",
        body: [
          "Link clips.twitch.tv/... dan twitch.tv/channel/clip/.... VOD, siaran lengkap sebelumnya, dan siaran live belum didukung.",
        ],
      },
    ],
    faqs: [
      {
        q: "Bagaimana cara mendapatkan link klip Twitch?",
        a: "Di klip, klik Bagikan lalu salin link-nya. Link clips.twitch.tv/... maupun twitch.tv/channel/clip/... sama-sama bisa.",
      },
      {
        q: "Kualitas apa saja yang bisa saya download?",
        a: "Apa pun yang tersedia untuk klip tersebut, biasanya 360p hingga 1080p. ClipKoala menampilkan setiap kualitas yang tersedia secara terpisah.",
      },
      {
        q: "Bisakah saya download VOD lengkap atau siaran live?",
        a: "Belum. Hanya klip yang didukung. Channel, VOD, dan siaran live tidak bisa didownload.",
      },
    ],
  },

  "soundcloud-downloader": {
    name: "Downloader SoundCloud",
    metaTitle: "Download Lagu SoundCloud: Simpan sebagai MP3",
    metaDescription:
      "Download lagu SoundCloud sebagai MP3 dalam kualitas terbaik yang diizinkan pengunggah, beserta cover art. Tempel link lagu apa pun. Gratis, tanpa daftar.",
    h1: "Download lagu SoundCloud sebagai MP3",
    sub: "Tempel link lagu dan simpan audionya dalam kualitas terbaik yang diizinkan pengunggah, lengkap dengan cover art.",
    highlights: [
      "Lagu sebagai MP3",
      "Kualitas asli",
      "Termasuk cover art",
      "Tanpa akun",
    ],
    sections: [
      {
        heading: "Salinan offline dari lagu favoritmu",
        body: [
          "Fitur dengar offline SoundCloud dikunci di balik langganan dan hanya bisa dipakai di dalam aplikasi. ClipKoala menyimpan MP3 biasa yang bisa kamu putar di mana saja, diberi tag judul lagu dan nama artis, serta dilengkapi cover art. Kualitasnya sesuai dengan yang disediakan pengunggah.",
        ],
      },
      {
        heading: "Link SoundCloud apa saja yang bisa",
        body: [
          "Link soundcloud.com/artist/track dan link pendek on.soundcloud.com dari aplikasi. Lagu yang diatur pengunggah hanya untuk pratinjau, serta lagu privat, tidak bisa disimpan. Link playlist dan profil belum didukung.",
        ],
      },
    ],
    faqs: [
      {
        q: "Bagaimana cara menyalin link lagu SoundCloud?",
        a: "Ketuk Bagikan di lagu dan pilih Salin link. Link soundcloud.com maupun link pendek on.soundcloud.com sama-sama bisa.",
      },
      {
        q: "Kenapa beberapa lagu tidak bisa didownload?",
        a: "Beberapa pengunggah menonaktifkan download atau hanya menyediakan stream pratinjau. Lagu-lagu tersebut tidak bisa disimpan.",
      },
      {
        q: "Bisakah saya download seluruh playlist?",
        a: "Belum. Tempel link lagu satu per satu. Link playlist dan profil belum didukung.",
      },
    ],
  },

  "batch-video-downloader": {
    name: "Download Massal",
    metaTitle: "Download Video Massal: Banyak Video Sekaligus",
    metaDescription:
      "Download banyak video sekaligus dari TikTok, YouTube, Instagram, dan lainnya. Tempel daftar link, impor .txt atau .csv, atau pakai playlist YouTube. Gratis.",
    h1: "Download banyak video sekaligus",
    sub: "Tempel hingga 10 link dari platform apa pun, impor file .txt atau .csv berisi link, atau masukkan playlist YouTube. Semuanya diambil secara paralel.",
    highlights: [
      "Hingga 10 link per batch",
      "Campur platform sesukamu",
      "Impor .txt atau .csv",
      "Simpan semua sekali klik",
    ],
    sections: [
      {
        heading: "Dibuat untuk editor, pengarsip, dan yang tidak sabaran",
        body: [
          "Mengumpulkan klip untuk editan, mencadangkan postingan kamu sendiri, atau menyimpan playlist sebelum naik pesawat seharusnya tidak berarti menempel link satu per satu. Tempel seluruh daftar ke ClipKoala dan mode massal aktif otomatis: setiap link punya barisnya sendiri dengan status langsung, pilihan kualitas, dan tombol coba lagi, dan Simpan semua mengambil kualitas terbaik dari semuanya sekaligus.",
          "Link bisa berasal dari aplikasi catatan, kolom spreadsheet, atau obrolan chat. Kamu juga bisa mengimpor file .txt atau .csv, atau cukup seret file ke halaman. Link playlist dan channel YouTube akan diurai menjadi video terbarunya.",
        ],
      },
      {
        heading: "Cara batch tetap cepat",
        body: [
          "Batch dibatasi 10 link dan diambil tiga sekaligus, sehingga setiap hasil tetap cepat dan platform tidak kelebihan beban. Setelah satu batch selesai, tempel batch berikutnya.",
        ],
      },
    ],
    faqs: [
      {
        q: "Berapa banyak video yang bisa saya download sekaligus?",
        a: "Hingga 10 per batch. Kamu bisa menjalankan batch sebanyak yang kamu mau, satu demi satu.",
      },
      {
        q: "Bisakah saya mencampur link TikTok, YouTube, dan Instagram dalam satu batch?",
        a: "Bisa. Platform dideteksi per link, jadi campuran apa pun dari sembilan platform yang didukung bisa masuk dalam satu batch.",
      },
      {
        q: "Jenis file apa yang bisa saya impor?",
        a: "File .txt biasa dengan satu link per baris dan file .csv hasil ekspor dari spreadsheet. Tanda kutip, koma, dan kolom tambahan ditangani otomatis.",
      },
      {
        q: "Apakah Simpan semua memilih kualitas terbaik?",
        a: "Ya. Simpan semua mengambil pilihan teratas untuk setiap video. Buka baris mana pun untuk memilih format atau kualitas lain terlebih dahulu.",
      },
    ],
  },
};
