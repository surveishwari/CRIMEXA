export const ACT_LABELS = {
  MURDER: [
    'ACT I — ENTRY',
    'ACT II — CONFRONTATION',
    'ACT III — INCIDENT',
    'ACT IV — EVIDENCE',
    'ACT V — ESCAPE',
  ],
  THEFT: ['ACT I — ENTRY', 'ACT II — SEARCH', 'ACT III — THEFT', 'ACT IV — ESCAPE'],
  BURGLARY: [
    'ACT I — BREACH',
    'ACT II — INTRUSION',
    'ACT III — REMOVAL',
    'ACT IV — FLIGHT',
  ],
  ASSAULT: ['ACT I — ARRIVAL', 'ACT II — ALTERCATION', 'ACT III — AFTERMATH'],
  ARMED_ASSAULT: [
    'ACT I — ARRIVAL',
    'ACT II — ARMED CONFRONTATION',
    'ACT III — SHOOTING',
    'ACT IV — SECURED',
  ],
}

export const ACT_TITLES = {
  MURDER: [
    'Forced Entry at 22:00',
    'Confrontation in the Office',
    'Fatal Incident — E-03',
    'Evidence Catalogued',
    'Suspect Flight Path',
  ],
  THEFT: [
    'Window Entry — 02:15',
    'Desk & Drawer Search',
    'Laptop Removed — E-02',
    'Exit via Window',
  ],
  BURGLARY: [
    'Door Breach Detected',
    'Interior Search Pattern',
    'Valuables Removed',
    'Escape Route North',
  ],
  ASSAULT: ['Suspect Arrives', 'Physical Altercation', 'Victim Down'],
  ARMED_ASSAULT: [
    'Armed Suspect Enters',
    'Weapon Drawn',
    'Gunfire — Victim Down',
    'Scene Secured',
  ],
}

export const NARRATIONS = {
  MURDER: [
    'Suspect enters through forced door at 22:00',
    'Confrontation. Weapon raised. Victim attempts to retreat.',
    'Shot fired. Victim falls. Blood at marker E-03.',
    'Evidence secured. Weapon dropped at E-01. Time: 22:08',
    'Suspect flees north. Escape route reconstructed.',
  ],
  THEFT: [
    'Suspect enters through window at 02:15 AM',
    'Suspect searches desk and drawers for valuables',
    'Laptop taken. E-02 evidence marker — item removed from scene.',
    'Suspect exits via same window. Duration: 6 minutes.',
  ],
  BURGLARY: [
    'Forced entry through front door at 01:40',
    'Suspect moves through office — drawers opened',
    'Electronics and valuables removed from scene',
    'Suspect flees through rear exit. Glass at E-04.',
  ],
  ASSAULT: [
    'Suspect enters open public area at 23:00',
    'Physical altercation — no firearm recovered',
    'Victim collapses. Blood sample logged at scene.',
  ],
  ARMED_ASSAULT: [
    'Armed suspect enters at 23:00',
    'Firearm drawn during confrontation',
    'Victim shot. Weapon remains at scene.',
    'Scene secured. Evidence chain initiated.',
  ],
}

export function getActCount(crime) {
  return (NARRATIONS[crime] || NARRATIONS.MURDER).length
}
