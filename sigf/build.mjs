// PeakCraft (aeironnsarmiento, MIT): PEAK played as a Minecraft player. A port of chasmlol's SkyCraft: a BepInEx 5
// plugin in PEAK (aeironnarmiento.PeakCraft) plays the part of SkyCraft's Skyrim plugin and drives SkyCraft's Fabric mod
// (with PeakCraft's four changes) over the shared memory Local\SkyCraft_v1, protocol 11.
// No upstream release: SIGF built the plugin and the Fabric jar from the pinned commit on a disposable AWS builder
// (library/QC.md section 4; source.json "built"), no change to upstream's source. The plugin compiled against
// PEAK_Data/Managed of a copy SIGF owns (Steam build 25667990), references only: no PEAK file is in any asset or in
// this repository.
// Not our `peakcraft` (Keel62155): both bind SkyCraft's mapping and mutex names, so the two never run together (card
// note; the recipe format has no conflicts field). The plugin goes into its own folder BepInEx/plugins/PeakCraft-aeiron
// so the two never write the same file.
//   SIGF_LIBRARY_BUILDS=<dir> node library/peakcraft-aeiron/build.mjs      (outputs: library/lib.mjs)
import { mrpack, resolveFabricApi } from '../../orchestrator/src/recipe.js';
import { BEPINEX, asset, card, dl, emit, pinned, player, zipAsset } from '../lib.mjs';
import { builtArtifacts, builtField, sourceOf } from '../um-gta5-passthrough/sigf-build.mjs';

const ID = 'peakcraft-aeiron', VERSION = '0.1.0', NAME = 'PeakCraft (SkyCraft port)';
const SRC = sourceOf(ID);
const UP = { repo: SRC.repo, commit: SRC.commit, authors: ['aeironnsarmiento', 'chasmlol'] };
const SKY = { repo: 'https://github.com/chasmlol/SkyCraft', commit: 'bfcaf178524b92c2cdeb88e4ce0f13ef9ded6f32', tag: 'v0.1.2' }; // the history PeakCraft starts from
const MC = { mc: '26.3', loader: '0.19.5', fabricApi: '0.161.0+26.3', java: '25' }; // fabric/gradle.properties at the commit
const DLL = 'aeironnarmiento.PeakCraft.dll';
// Same mod id and version string as SkyCraft's release jar: our copy gets its own name.
const JAR = 'skycraft-0.1.2.jar', JAR_AS = 'skycraft-0.1.2-peakcraft.jar';
const TAGLINE = 'Play PEAK as a Minecraft player: Minecraft movement, HUD, inventory and placed blocks on PEAK\'s mountain (a SkyCraft port).';

const files = builtArtifacts(ID);
const bepinex = asset(BEPINEX.file, await pinned(BEPINEX.url, BEPINEX.sha256), { zipped: true });
const plugin = zipAsset(`${ID}-peak.zip`, [
  { name: DLL, data: files.get(DLL) },
  { name: 'LICENSE.txt', data: files.get('LICENSE') },
  { name: 'LICENSE-peak-plugin.txt', data: files.get('peak-LICENSE') },
]);
const pack = async (offline) => {
  const fabricApi = offline ? null : await resolveFabricApi(MC.fabricApi, MC.mc);
  if (!offline && !fabricApi?.download) throw new Error(`Fabric API ${MC.fabricApi} not resolved on Modrinth`);
  return asset(`${ID}.mrpack`, mrpack({ name: NAME, summary: TAGLINE, versions: MC, versionId: VERSION, fabricApi,
    jars: [{ name: JAR_AS, data: files.get(JAR) }],
    extra: [
      { name: 'overrides/licenses/peakcraft-LICENSE.txt', data: files.get('LICENSE') },
      { name: 'overrides/licenses/peakcraft-THIRD-PARTY-NOTICES.md', data: files.get('THIRD-PARTY-NOTICES.md') },
    ] }));
};
const assets = [bepinex, plugin, await pack(false)];

const make = (urls, set) => {
  const mp = set.find(a => a.name.endsWith('.mrpack'));
  return {
    id: `sigf/${ID}`,
    version: VERSION,
    name: NAME,
    tagline: player(ID).tagline ?? TAGLINE,
    how_to_play: player(ID).howToPlay,
    kind: 'passthrough',
    games: [
      { game: 'peak', role: 'host', label: 'PEAK', engine: 'PEAK (Unity 6, Mono, x64) + BepInEx 5 plugin aeironnarmiento.PeakCraft (C#)', apps: { steam: '3527290' }, runtime: 'PEAK 2.5.a (the author\'s build); SIGF compiled against Steam build 25667990; no version check in the plugin' },
      { game: 'minecraft', role: 'guest', label: 'Minecraft', engine: 'Minecraft Java 26.3 + SkyCraft\'s Fabric mod with PeakCraft\'s changes (Java)', mc: MC.mc, loader: `fabric@${MC.loader}`, java: MC.java },
    ],
    requires: [
      { id: BEPINEX.id, version: BEPINEX.version, license: `${BEPINEX.license}, shipped unchanged`, page: `${BEPINEX.repo}/releases/tag/v${BEPINEX.version}`,
        note: 'installed into the PEAK folder by the app', source: { url: urls[bepinex.name], sha256: bepinex.sha256 } },
      { id: 'fabric-loader', version: MC.loader },
      { id: 'fabric-api', version: MC.fabricApi, note: 'in the Minecraft pack (downloaded from Modrinth)' },
    ],
    install: [
      { game: 'peak', strategy: 'game-dir-snapshot', loader: 'bepinex', files: [
        { src: bepinex.name, dst: '{game}', unpack: true, contents: bepinex.contents, ...dl(bepinex, urls) },
        { src: plugin.name, dst: '{game}/BepInEx/plugins/PeakCraft-aeiron', unpack: true, contents: plugin.contents, ...dl(plugin, urls) },
      ] },
      // -Dskycraft.startHidden=true: Minecraft's window stays hidden while PEAK draws everything (SkyCraft's own flag).
      { game: 'minecraft', strategy: 'mrpack', jvm_args: ['-Dskycraft.startHidden=true'], pack: { src: mp.name, ...dl(mp, urls) } },
    ],
    // Minecraft first (README: it waits for PEAK); PEAK creates the mapping, Minecraft links on the airport load.
    launch: [{ game: 'minecraft' }, { game: 'peak', args: [] }],
    files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
    source: {
      repo: UP.repo, license: 'MIT AND LGPL-2.1', upstream_license: SRC.license, commit: UP.commit,
      hosted: `https://github.com/SIGFAI/${ID}`,
      based_on: SKY.repo,
      built: builtField(ID),
      bundled: [{ name: 'BepInEx', version: BEPINEX.version, repo: BEPINEX.repo, commit: BEPINEX.commit, license: BEPINEX.license }],
      references: [{ name: 'PEAK PEAK_Data/Managed', version: 'Steam build 25667990', note: 'from a copy SIGF owns, build-time references only, never shipped' }],
    },
    media: {},
    built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
    idea_by: UP.authors[0],
    built_at: '2026-10-06T00:00:00.000Z',
    ...card(UP.repo),
    notes: player(ID).notes,
  };
};

emit({ slug: ID, version: VERSION, assets, make });
