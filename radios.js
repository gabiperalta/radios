// Lista de radios de Paraguay. Editá este archivo para agregar, quitar o cambiar radios.
// Campos:
//   id:          identificador único (sin espacios)
//   name:        nombre que se muestra
//   description: texto pequeño opcional (frecuencia, ciudad, etc.)
//   url:         dirección del stream
//
// Todas las radios acá usan HTTPS, así funcionan al publicar en GitHub Pages (github.io).
// Si querés radios con http://, usalas solo en la red local (servidor HTTP).

window.RADIOS = [
  { id: 'rockandpop', name: 'Rock & Pop Paraguay', description: 'Rock y Pop', url: 'https://cp9.serverse.com/proxy/rockandpop/stream' },
  { id: 'radioimpacto', name: 'Radio Impacto 95.3', description: 'Variedad', url: 'https://radio.host.com.py:7137/;' },
  { id: 'palma', name: 'Radio Palma 106.5 FM', description: 'Paraguay', url: 'https://us-b4-p-e-qg12-audio.cdn.mdstrm.com/live-audio-aw/62d81d48f5ef320830c8becf' },
  { id: 'estacion40', name: 'Radio Estación 40 91.1', description: 'Pop', url: 'https://us-b4-p-e-cg11-audio.cdn.mdstrm.com/live-audio-aw/62d81cfbbfbcee0837ba1b60' },
  { id: 'urbana', name: 'Radio Urbana 106.9 FM', description: 'Pop / Urbana', url: 'https://us-b4-p-e-pb13-audio.cdn.mdstrm.com/live-audio-aw/62d81cdabff0bc082f8f1a24' },
  { id: 'radiomix', name: 'Radio Mix 90.1 FM', description: 'Paraguay (HLS)', url: 'https://rds3.desdeparaguay.net/movmix/movmix.stream/playlist.m3u8' },
  { id: 'superadio', name: 'Super Radio', description: 'Paraguay', url: 'https://c32.radioboss.fm:8139/stream' },
  { id: 'tapiracuai', name: 'Radio Tapiracuai 88.7', description: 'Paraguay (HLS)', url: 'https://tigocloud.desdeparaguay.net/movtapiracuai/movtapiracuai.stream/playlist.m3u8' },
  { id: 'abccardinal', name: 'Radio ABC Cardinal 730 AM', description: 'Noticias', url: 'https://media.streambrothers.com:8342/stream' },
  { id: 'abcfm', name: 'Radio ABC FM 98.5', description: 'Paraguay', url: 'https://media.streambrothers.com:8350/stream' },
  { id: 'nacional', name: 'Radio Nacional del Paraguay 920 AM', description: 'Nacional', url: 'https://audio.radionacional.gov.py/920' }
];
