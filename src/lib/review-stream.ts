/** Deterministic pseudo random for stable SSR/client hydration */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = [
  "Marcus",
  "Jay",
  "Rico",
  "Talia",
  "Dev",
  "Nina",
  "Chris",
  "Sam",
  "Jordan",
  "Alex",
  "Priya",
  "Ty",
  "Mia",
  "Andre",
  "Quan",
  "Sofia",
  "Ethan",
  "Zoe",
  "Malik",
  "Ren",
] as const;

const LAST = [
  "K.",
  "L.",
  "R.",
  "M.",
  "V.",
  "S.",
  "T.",
  "P.",
  "D.",
  "W.",
] as const;

const BODIES = [
  "shipped overnight and the client actually said yes first pass",
  "way faster than my last colorist no cap",
  "looks expensive which is the whole point lol",
  "my dm is full of people asking who graded this",
  "sent refs and they nailed the skin tones",
  "no weird banding on the reds finally",
  "turned around same week i asked",
  "clean comps even on the wide shots",
  "vibes matched the track perfectly",
  "label didnt ask for a single tweak wild",
  "this is what i wanted but couldnt explain",
  "files were organized bless",
  "answered at like 2am when i panicked",
  "made my rough cut feel like a real video",
  "shakes and zooms felt on beat not random",
  "didnt ghost me mid project",
  "price felt fair for what i got",
  "already booked the next one",
  "friends thought i spent way more than i did",
  "mastering guy said the levels were sweet",
  "fixed a shot i thought was unsavable",
  "moody without looking muddy",
  "hype for the release now",
  "trusted them with my first paid job",
  "came back for a second video same month",
  "communicated like a normal person fr",
  "rough was rough final is stupid clean",
  "they actually listened to the reference",
  "no back and forth hell this time",
  "instagram story looks insane",
  "camera shake matches the 808s",
  "zoom outs hit right when the hook drops",
  "felt like they edited with the song open",
  "short turnaround but didnt look rushed",
  "text me when you need a reel update",
  "showed my manager and he went quiet",
  "crowd reaction at the screening was loud",
  "thumbnail frame is fire",
  "subtitles legible on phone which matters",
  "grain sits right not cheap",
  "titles arent corny thank god",
  "transitions arent tryhard",
  "energy matches the artist brand",
  "fixed my green spill in like an hour",
  "sky replacement looked real not pasted on",
  "stars in the grade look intentional",
  "blacks arent crushed to mud",
  "highlights roll off nice on skin",
  "motion feels hand done not template",
  "zoom punch on the adlibs hits",
  "shake amount is tasteful not tiktok chaos",
  "would recommend if youre on a deadline",
  "saved my week honestly",
  "already sent three friends their way",
] as const;

export type StreamReview = { id: number; name: string; text: string };

/** Build one review by index (supports 0 .. millions, cheap). */
export function reviewAtIndex(i: number): StreamReview {
  const rand = mulberry32(i * 977 + 1337);
  const fn = FIRST[Math.floor(rand() * FIRST.length)]!;
  const ln = LAST[Math.floor(rand() * LAST.length)]!;
  const body = BODIES[i % BODIES.length]!;
  const twist = i % 7 === 0 ? " fr" : i % 11 === 0 ? " tbh" : "";
  return {
    id: i,
    name: `${fn} ${ln}`,
    text: `${body}${twist}`,
  };
}

/** Total count we advertise in UI (social proof). */
export const REVIEW_STREAM_TOTAL = 5000;

/** Cards to render in the infinite marquee (unique slice, duplicated in DOM for loop). */
export const MARQUEE_REVIEW_COUNT = 160;

export function marqueeReviewSlice(): StreamReview[] {
  const out: StreamReview[] = [];
  for (let i = 0; i < MARQUEE_REVIEW_COUNT; i++) {
    out.push(reviewAtIndex(i));
  }
  return out;
}
