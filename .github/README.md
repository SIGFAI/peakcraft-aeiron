# PeakCraft (SkyCraft port)

Play PEAK as a Minecraft player: Minecraft movement, HUD, inventory and placed blocks on PEAK's mountain (a SkyCraft port).

**PeakCraft (SkyCraft port) is made by [aeironnsarmiento](https://github.com/aeironnsarmiento).** All credit for the mod goes to them. It is built on [chasmlol/SkyCraft](https://github.com/chasmlol/SkyCraft) by chasmlol.

- Original project: https://github.com/aeironnsarmiento/PeakCraft
- Report bugs and ask questions there: https://github.com/aeironnsarmiento/PeakCraft/issues
- Upstream version packaged here: 0.1.0 (commit [`d07030e`](https://github.com/aeironnsarmiento/PeakCraft/tree/d07030ee527ee2a2facc989f5acae8a317968c02))
- **Built by SIGF from commit [`d07030ee527ee2a2facc989f5acae8a317968c02`](https://github.com/aeironnsarmiento/PeakCraft/tree/d07030ee527ee2a2facc989f5acae8a317968c02)**, on a disposable build machine (AWS EC2 i-0ad3d6f0c674e7c04 (c6i.xlarge, Windows Server 2022, terminated after the build); JDK Temurin 25.0.4.1+1 + Gradle 9.7.1 wrapper, .NET SDK 10.0.401; plugin compiled against PEAK Steam build 25667990 PEAK_Data/Managed (references only, never shipped or committed)). The app installs these SIGF builds, not binaries from the author.

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **PEAK** ([Steam](https://store.steampowered.com/app/3527290/)): PEAK 2.5.a (the author's build); SIGF compiled against Steam build 25667990; no version check in the plugin.
- **Minecraft**: Java Edition 26.3.
- Windows and the [SIGF app](https://sigf.ai). The app installs bepinex 5.4.23.5, fabric-loader 0.19.5, fabric-api 0.161.0+26.3 for you.

## Install

In the SIGF app, open **PeakCraft (SkyCraft port)** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v0.1.0`](../../releases/tag/v0.1.0).

### How to play

- Play PEAK as a Minecraft player: Minecraft's movement, HUD and inventory on PEAK's mountain, with blocks that PEAK draws, lights and hides behind its rocks.
- Press Play: Minecraft starts first and waits hidden, then PEAK. Start a solo game: in the airport the Minecraft hotbar shows and Minecraft has your scout.
- G is PEAK's interact (kiosk, luggage, campfires), Esc PEAK's pause menu, O Minecraft's menu. Every other key is Minecraft's: E inventory, F5 camera, T chat.
- The world starts in Creative. Type /gamemode survival so PEAK's cold, heat, poison and thorns cost Minecraft hearts; a Minecraft death kills your scout.
- If Minecraft closes or hangs, PEAK gives you its own controls back within a few seconds and links again when Minecraft returns.

### Good to know

- You need PEAK on Steam and Minecraft: Java Edition, Windows only, and about 3 GB of free RAM for the hidden Minecraft. Made for PEAK 2.5.a: a game update may break parts of it.
- Solo only: the author did not attempt multiplayer, and friends in a lobby would not see your Minecraft body or blocks. One player reported falling into the void after joining a lobby.
- Not there yet: the summit ending cannot be reached (PEAK's flare cannot be used while Minecraft has the body), PEAK's items stay unused, and there is no digging into the mountain.
- Cannot be installed together with PeakCraft by Keel62155: both use SkyCraft's link, so restore that one first. Run one "Minecraft X" mod at a time. Restore removes BepInEx and this PeakCraft.
- Beta: report bugs to the author on the upstream issue tracker with BepInEx\LogOutput.log.

## Not together with PeakCraft (Keel62155)

This PeakCraft and Keel62155's PeakCraft (SIGFAI/peakcraft) both use SkyCraft's link names (`Local\SkyCraft_v1`). Install only one of them: restore the other first.

## What this repository holds

1. The upstream source tree at commit [`d07030ee527ee2a2facc989f5acae8a317968c02`](https://github.com/aeironnsarmiento/PeakCraft/tree/d07030ee527ee2a2facc989f5acae8a317968c02), every file unchanged (same git blobs). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, `THIRD-PARTY.md` (licenses and sources of the third-party files in the release), and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v0.1.0` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `BepInEx_win_x64_5.4.23.5.zip` | 639118 B | `82f9878551030f54657792c0740d9d51a09500eeae1fba21106b0c441e6732c4` | BepInEx 5.4.23.5 x64, the official build, unchanged (see THIRD-PARTY.md); unpacked into the PEAK folder. |
| `peakcraft-aeiron-peak.zip` | 92137 B | `ff6e72568a5035a0126c5dc337bba9eccba6d5b911abb496c0d7736b4dd53cc6` | the SIGF build of `aeironnarmiento.PeakCraft.dll` from the pinned commit (compiled against the assemblies of PEAK of Steam build 25667990 as references; no PEAK file is shipped or stored here), with upstream's two LICENSE files; unpacked into `BepInEx/plugins/PeakCraft-aeiron`. |
| `peakcraft-aeiron.mrpack` | 236572 B | `8fc02e31c9d1af8fff025ed437ec00d3dc637aea09312336deeb5a8c7ad7c4e3` | the Minecraft side: the SIGF build of PeakCraft's `fabric/` (SkyCraft 0.1.2 with PeakCraft's changes) from the pinned commit, as `skycraft-0.1.2-peakcraft.jar`, with upstream's LICENSE and THIRD-PARTY-NOTICES, for Minecraft 26.3 with Fabric Loader 0.19.5; Fabric API 0.161.0+26.3 is a Modrinth download link, not stored here. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| PeakCraft (all of the upstream tree, and the SIGF builds) | MIT, Copyright 2026 chasmlol; PEAK plugin 2026 PeakCraft contributors | `LICENSE`, `peak/LICENSE`, `THIRD-PARTY-NOTICES.md` |
| BepInEx 5.4.23.5 and what its zip bundles (release asset) | MIT; UnityDoorstop LGPL-2.1 | `THIRD-PARTY.md` |
| Fabric API (downloaded from Modrinth by the app, not stored here) | Apache-2.0 | https://github.com/FabricMC/fabric |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes PeakCraft (SkyCraft port) installable in one click, credited to aeironnsarmiento. If you are the author and want anything changed or taken down, open an issue here.
