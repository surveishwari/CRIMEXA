export const CRIME_TIMELINES = {
  MURDER: {
    title: "Homicide Reconstruction",
    duration: 30,
    environment: "INDOOR_BEDROOM",
    acts: [
      {
        time: 0,
        label: "ACT I — ENTRY",
        narration: "Suspect enters through forced door at 22:00",
        cameraPos: [0, 2, 8],
        cameraTarget: [0, 1, 0],
        suspectAction: "WALK_IN",      // suspect walks from door
        victimAction: "STANDING",      // victim standing, unaware
        effect: "DOOR_OPEN",
        lighting: "NIGHT_INDOOR"
      },
      {
        time: 6,
        label: "ACT II — CONFRONTATION",
        narration: "Confrontation occurs. Weapon drawn.",
        cameraPos: [2, 1.5, 3],
        cameraTarget: [0, 1, 0],
        suspectAction: "RAISE_WEAPON",
        victimAction: "BACK_AWAY",
        effect: "WEAPON_HIGHLIGHT",
        lighting: "TENSE_RED"
      },
      {
        time: 12,
        label: "ACT III — INCIDENT",
        narration: "Victim falls. Blood evidence at marker E-03.",
        cameraPos: [-1, 3, 2],
        cameraTarget: [0, 0, 0],
        suspectAction: "FLEE_BACK",
        victimAction: "FALL",
        effect: "BLOOD_SPREAD",
        lighting: "FLASH_WHITE"
      },
      {
        time: 18,
        label: "ACT IV — EVIDENCE",
        narration: "Weapon dropped at E-01. Laptop disturbed at E-02.",
        cameraPos: [0, 4, 0],
        cameraTarget: [0, 0, 0],
        suspectAction: "NONE",
        victimAction: "SLUMPED",
        effect: "EVIDENCE_HIGHLIGHT_ALL",
        lighting: "FORENSIC_BLUE"
      },
      {
        time: 24,
        label: "ACT V — ESCAPE ROUTE",
        narration: "Suspect exits via east window. Estimated time: 22:08.",
        cameraPos: [4, 2, 4],
        cameraTarget: [3, 1, 0],
        suspectAction: "EXIT_WINDOW",
        victimAction: "SLUMPED",
        effect: "ESCAPE_PATH",
        lighting: "FORENSIC_BLUE"
      }
    ]
  },

  THEFT: {
    title: "Burglary Reconstruction",
    duration: 25,
    environment: "INDOOR_OFFICE",
    acts: [
      {
        time: 0,
        label: "ACT I — BREAK-IN",
        narration: "Suspect breaks window lock at 02:15 AM",
        cameraPos: [0, 2, 8],
        cameraTarget: [0, 1, 0],
        suspectAction: "CLIMB_IN",
        victimAction: "NONE",
        effect: "WINDOW_BREAK",
        lighting: "NIGHT_DARK"
      },
      {
        time: 5,
        label: "ACT II — SEARCH",
        narration: "Suspect searches drawers and shelves",
        cameraPos: [2, 1.5, 4],
        cameraTarget: [0, 1, 0],
        suspectAction: "SEARCH_DRAWERS",
        victimAction: "NONE",
        effect: "DRAWER_OPEN",
        lighting: "FLASHLIGHT"
      },
      {
        time: 12,
        label: "ACT III — THEFT",
        narration: "Laptop and valuables taken. Items disturbed.",
        cameraPos: [-1, 2, 3],
        cameraTarget: [0, 1, 0],
        suspectAction: "GRAB_LAPTOP",
        victimAction: "NONE",
        effect: "ITEM_TAKEN",
        lighting: "FLASHLIGHT"
      },
      {
        time: 18,
        label: "ACT IV — ESCAPE",
        narration: "Suspect exits same window. Duration: ~8 minutes.",
        cameraPos: [0, 3, 5],
        cameraTarget: [0, 1, 0],
        suspectAction: "EXIT_WINDOW",
        victimAction: "NONE",
        effect: "ESCAPE_PATH",
        lighting: "NIGHT_DARK"
      }
    ]
  },

  ASSAULT: {
    title: "Assault Reconstruction",
    duration: 20,
    environment: "OUTDOOR_ALLEY",
    acts: [
      {
        time: 0,
        label: "ACT I — APPROACH",
        narration: "Suspect approaches victim from behind",
        cameraPos: [0, 2, 8],
        cameraTarget: [0, 1, 0],
        suspectAction: "WALK_FAST",
        victimAction: "STANDING",
        effect: "NONE",
        lighting: "STREET_NIGHT"
      },
      {
        time: 5,
        label: "ACT II — ATTACK",
        narration: "Physical altercation. Victim pushed to ground.",
        cameraPos: [2, 1.5, 4],
        cameraTarget: [0, 1, 0],
        suspectAction: "ATTACK",
        victimAction: "FALL",
        effect: "IMPACT_FLASH",
        lighting: "TENSE_RED"
      },
      {
        time: 12,
        label: "ACT III — FLEE",
        narration: "Suspect flees north on foot.",
        cameraPos: [0, 3, 6],
        cameraTarget: [0, 1, 0],
        suspectAction: "RUN_AWAY",
        victimAction: "GROUNDED",
        effect: "ESCAPE_PATH",
        lighting: "STREET_NIGHT"
      }
    ]
  }
};
