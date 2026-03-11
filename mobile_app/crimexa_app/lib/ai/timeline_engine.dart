class TimelineEngine {

List<String> generateTimeline(String prediction) {

```
if (prediction.contains("Homicide")) {
  return [
    "19:02 Suspect enters location",
    "19:04 Argument begins",
    "19:05 Weapon attack",
    "19:06 Victim collapses",
    "19:07 Suspect flees"
  ];
}

if (prediction.contains("Robbery")) {
  return [
    "20:10 Suspect enters store",
    "20:11 Threatens victim",
    "20:12 Cash taken",
    "20:13 Suspect escapes"
  ];
}

if (prediction.contains("Burglary")) {
  return [
    "02:10 Suspect approaches house",
    "02:12 Window broken",
    "02:13 Entry made",
    "02:18 Valuables stolen",
    "02:20 Suspect escapes"
  ];
}

return [
  "Timeline reconstruction unavailable"
];
```

}

}
