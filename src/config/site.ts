export const site = {
  name: "Lumi",
  title: "Lumi — A home robot built to help clear everyday clutter",
  description:
    "Lumi is a mobile indoor cleanup robot in development, designed to identify floor objects, pick them up, and help keep living spaces clear.",
  url: "https://lumirobot.co",
  contactEmail: "gary@lumirobot.co",
  waitlistUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  githubUrl: "",
};

export const updateMailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
  "Lumi product updates",
)}&body=${encodeURIComponent(
  "Hi Lumi team,\n\nPlease send me future product updates and build notes.\n\nThanks!",
)}`;
