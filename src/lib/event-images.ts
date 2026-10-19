import thx from "@/assets/event/optimized/thx.asset.json";
import tvx from "@/assets/event/optimized/tvx.asset.json";
import tjx from "@/assets/event/optimized/tjx.asset.json";
import psx from "@/assets/event/optimized/psx.asset.json";
import manual from "@/assets/event/optimized/psx-manual.asset.json";
import plx from "@/assets/event/optimized/plx.asset.json";
import pbx from "@/assets/event/optimized/pbx.asset.json";
import bmx from "@/assets/event/optimized/bmx.asset.json";
import tpx from "@/assets/event/optimized/tpx.asset.json";
import gtx from "@/assets/event/optimized/gtx.asset.json";
import ggx from "@/assets/event/optimized/ggx.asset.json";
import gfx from "@/assets/event/optimized/gfx.asset.json";
import thxMobile from "@/assets/event/optimized/thx-mobile.asset.json";
import tvxMobile from "@/assets/event/optimized/tvx-mobile.asset.json";
import tjxMobile from "@/assets/event/optimized/tjx-mobile.asset.json";
import psxMobile from "@/assets/event/optimized/psx-mobile.asset.json";
import manualMobile from "@/assets/event/optimized/psx-manual-mobile.asset.json";
import plxMobile from "@/assets/event/optimized/plx-mobile.asset.json";
import pbxMobile from "@/assets/event/optimized/pbx-mobile.asset.json";
import bmxMobile from "@/assets/event/optimized/bmx-mobile.asset.json";
import tpxMobile from "@/assets/event/optimized/tpx-mobile.asset.json";
import gtxMobile from "@/assets/event/optimized/gtx-mobile.asset.json";
import ggxMobile from "@/assets/event/optimized/ggx-mobile.asset.json";
import gfxMobile from "@/assets/event/optimized/gfx-mobile.asset.json";

export const eventImages = {
  thx: [thx.url, thxMobile.url], tvx: [tvx.url, tvxMobile.url], tjx: [tjx.url, tjxMobile.url],
  psx: [psx.url, psxMobile.url], "psx-manual": [manual.url, manualMobile.url], plx: [plx.url, plxMobile.url],
  pbx: [pbx.url, pbxMobile.url], bmx: [bmx.url, bmxMobile.url], tpx: [tpx.url, tpxMobile.url],
  gtx: [gtx.url, gtxMobile.url], ggx: [ggx.url, ggxMobile.url], gfx: [gfx.url, gfxMobile.url],
} as const;