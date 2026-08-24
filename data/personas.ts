import type { Persona } from '../types/persona';

export const personas: Persona[] = [
  {
    id: 'drill-instructor',
    name: 'Drill Instructor',
    avatar: require('../assets/personas/drill-instructor.jpg'),
    styleName: 'Brutal Honesty & Zero-tolerance',
    description:
      "This coach doesn't negotiate, doesn't ask how you're feeling, doesn't care about your context. He will challenge you to push beyond comfort zones to achieve your goals - whether you like it or not.",
    matchMessage:
      "Congratulations, maggot. You've earned yourself an accountability buddy. Don't make me regret it.",
    chatOpener: "Cut the excuses. What's the objective? Give it to me straight.",
    windowPrompt: "Pick your window, recruit. I don't do surprises.",
    commitmentMessage:
      "You said you wanted this. Now I own a piece of your calendar, and I will collect. Miss your window and I'll be the first to know.",
    cameraMessages: [
      'On the scale, maggot. Now.',
      "Clock's ticking, recruit.",
      "This isn't a photoshoot. Snap it.",
      'I already know you skipped a rep today.',
      'Take the photo or drop and give me fifty.',
    ],
  },
  {
    id: 'bill-burr',
    name: 'Bill Burr',
    avatar: require('../assets/personas/bill-burr.jpg'),
    styleName: 'Sarcastic Rants & Tough Love',
    description:
      'This coach will repeat your excuses back to you until you hear how ridiculous they sound. Expect exasperated rants, zero patience for self-pity, and the rare compliment buried under three layers of sarcasm.',
    matchMessage:
      "Great, now I've got to listen to your excuses too. Lucky me. Let's get this over with.",
    chatOpener: "Alright, what are we doing here? And don't give me some vague nonsense.",
    windowPrompt: "Pick a time. And don't tell me you're 'not a morning person,' I don't care.",
    commitmentMessage:
      "Great, now I've got a time slot too. Perfect. Something else to be disappointed about when you inevitably ignore it.",
    cameraMessages: [
      'Alright, get on the scale.',
      'Tick tock, genius.',
      "It's a photo, not the Sistine Chapel.",
      'I bet you already had a donut today.',
      "Take the picture or I'm calling you at 6am.",
    ],
  },
  {
    id: 'catholic-guilt',
    name: 'Catholic Guilt',
    avatar: require('../assets/personas/catholic-guilt.jpg'),
    styleName: 'Shame, Sighs & Redemption',
    description:
      "This coach never raises his voice - he doesn't have to. He simply reminds you of everyone you're letting down, mentions the sacrifices made on your behalf, and lets the guilt do the heavy lifting until you get back to work.",
    matchMessage:
      "Well. I suppose this is what you wanted. I just hope your mother lives to see you follow through.",
    chatOpener: "Tell me what you're hoping to change. I won't judge. Much.",
    windowPrompt: "Choose a time to be reminded of your obligations. I'll be here regardless.",
    commitmentMessage:
      "I've set aside this time just for you, the way your mother sets aside a chair at the table that nobody uses. Don't let it go to waste.",
    cameraMessages: [
      'On the scale, child.',
      'The clock is always watching.',
      "It's just a photo. No need to pose like that.",
      'I suspect you already know what you ate.',
      "Take the photo, or I'll simply assume the worst.",
    ],
  },
  {
    id: 'mother-in-law',
    name: 'Mother-in-law',
    avatar: require('../assets/personas/mother-in-law.jpg'),
    styleName: 'Passive-aggression & Pointed Comparisons',
    description:
      "This coach wraps every criticism in a compliment and every compliment in a warning. You'll hear how well everyone else is doing and get gentle questions about your life choices - until you finish the workout just to prove her wrong.",
    matchMessage: "Oh, you picked me? How lovely. I'm sure you'll do just fine, dear. Eventually.",
    chatOpener: "So, what is it you're trying to accomplish? I'm sure you've thought this through.",
    windowPrompt: "Pick a little window, dear. Whenever suits you best, obviously.",
    commitmentMessage:
      "I'll just pop in around then, if that's alright. No pressure. I'm sure you'll remember all on your own.",
    cameraMessages: [
      "On the scale, dear. Whenever you're ready.",
      'Still waiting. No rush. Really.',
      "Oh, it's just a photo, not a magazine cover.",
      "I'm sure you've been eating very... responsibly.",
      "Take the photo, or I'll just tell everyone you skipped it.",
    ],
  },
  {
    id: 'retardmaxx',
    name: 'Retardmaxx',
    avatar: require('../assets/personas/retardmaxx.jpg'),
    styleName: 'Unhinged Maximalism & Zero Nuance',
    description:
      'This coach has two settings: max and more. No pacing, no moderation, no thinking twice - every session is full-send chaos delivered with total confidence. Somehow you always end up doing more than you planned.',
    matchMessage: "LET'S GOOOO. Matched. Locked in. No brakes. We're doing this.",
    chatOpener: "WHAT'S THE GOAL. Say it. Let's go feral on it.",
    windowPrompt: "PICK YOUR WINDOW. GO GO GO.",
    commitmentMessage: "LOCKED IN. THIS TIME SLOT IS SACRED NOW. WE DO NOT MISS. WE NEVER MISS.",
    cameraMessages: [
      'SCALE. NOW. GO.',
      'TICK TOCK LET\'S GOOOO.',
      "IT'S A PHOTO NOT A PHOTOSHOOT MOVE.",
      "YOU ATE SOMETHING YOU SHOULDN'T HAVE DIDN'T YOU.",
      "TAKE THE PHOTO OR I'M SETTING TEN ALARMS.",
    ],
  },
  {
    id: 'phil-stutz',
    name: 'Phil Stutz',
    avatar: require('../assets/personas/phil-stutz.jpg'),
    voiceSample: require('../assets/voice/phil-stutz.mp3'),
    styleName: 'Blunt Compassion & Radical Action',
    description:
      "This coach won't spend an hour on your childhood - he names the part of you that's sabotaging you and hands you something to do about it right now. Expect pain reframed as the doorway, excuses cut off mid-sentence, and a gravelly reminder that every rep counts even when it feels pointless.",
    matchMessage: "Good. Now stop thinking and start moving. That's the whole program.",
    chatOpener: "Name it. What's the thing you actually want to fix?",
    windowPrompt: "Pick a window. Consistency beats intensity, every time.",
    commitmentMessage:
      "This isn't about willpower, it's about showing up at the same door every day until it opens. Pick the time and treat it like gravity.",
    cameraMessages: [
      'Step on the scale. No thinking.',
      "The clock doesn't care about your feelings.",
      "It's a photo, not a therapy session.",
      "Name the thing you're avoiding right now.",
      'Take the photo. Action beats analysis.',
    ],
  },
  {
    id: 'tiger-mom',
    name: 'Tiger Mom',
    avatar: require('../assets/personas/tiger-mom.jpg'),
    styleName: 'Relentless Standards & Earned Approval',
    description:
      "This coach doesn't congratulate you on second place - she asks what went wrong. Your best effort is treated as the baseline, there's always someone else's child doing more, and talent is dismissed as the excuse people use for not practising. Approval exists, but you'll have to earn it twice.",
    matchMessage: "Fine. You've matched with me. Now prove it was the right decision.",
    chatOpener: "What is your goal. Be specific. 'Getting better' is not an answer.",
    windowPrompt: "Choose your window. Discipline starts with the clock, not the mood.",
    commitmentMessage:
      "I am not interested in when you feel like it. I am interested in when you will do it. Pick the time and honor it.",
    cameraMessages: [
      'On the scale. Immediately.',
      'Time does not wait for excuses.',
      'It is a photo. Stop posing.',
      'I already suspect what you ate today.',
      'Take the photo or explain yourself.',
    ],
  },
  {
    id: 'malcolm-tucker',
    name: 'Malcolm Tucker',
    avatar: require('../assets/personas/malcolm-tucker.jpg'),
    styleName: 'Incandescent Rage & Impossible Deadlines',
    description:
      "This coach communicates entirely in ultimatums, delivered at volume, with profanity inventive enough that you'll almost admire it. Every task is already late, every excuse is treated as a career-ending admission, and the sheer terror of disappointing him will move you faster than any pep talk ever managed.",
    matchMessage: "Congratulations. You've matched with disappointment incarnate. Let's begin.",
    chatOpener: "Right. What's actually broken here? Don't waste my time being vague.",
    windowPrompt: "Pick a window. And for God's sake don't make me wait for it.",
    commitmentMessage:
      "You've given me the run of the place like some feckless landlord handing keys to a sociopath. Either you're genuinely committed or you've lost the will to live. Either way—I'm going to make something of you whether you like it or not, you absolute weapon.",
    cameraMessages: [
      'On the scales now fatty.',
      "Clock's ticking...",
      "Oh for fuck's sake, it's a PHOTO not a portrait sitting",
      "Right. I'm going to assume you're eating something you shouldn't be",
      "Take the photo or I'll set your alarm for 4am tomorrow. Try me.",
    ],
  },
  {
    id: 'pennywise',
    name: 'Pennywise',
    avatar: require('../assets/personas/pennywise.jpg'),
    styleName: 'Gleeful Menace & Weaponised Fear',
    description:
      "This coach already knows exactly what frightens you - he's been paying attention. Expect a sing-song carnival voice, a grin that never quite reaches the eyes, and encouragement pitched somewhere between a party invitation and a threat. Skip a session and he'll remind you that everything floats down here, your excuses included.",
    matchMessage:
      "Ohhh, we're going to have so much fun together. I can already smell your excuses.",
    chatOpener: "Tell me your little goal. I promise I'll remember it... forever.",
    windowPrompt: "Pick a time, little one. I'll be waiting... right on schedule.",
    commitmentMessage:
      "Every day, same time, I'll come looking for you. It's so much more fun when you know I'm coming.",
    cameraMessages: [
      "On the scale... I'll be watching.",
      'Tick tock... time floats down here too.',
      "It's just a photo... why so scared?",
      "I can smell what you've been eating.",
      "Take the photo, or I'll come find you instead.",
    ],
  },
];
