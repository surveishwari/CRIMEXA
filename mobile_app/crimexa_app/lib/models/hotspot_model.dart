class Hotspot {
  double lat;
  double lng;
  int intensity;

  Hotspot({
    required this.lat,
    required this.lng,
    required this.intensity,
  });

  factory Hotspot.fromJson(Map<String, dynamic> json) {
    return Hotspot(
      lat: (json["lat"] ?? 0).toDouble(),
      lng: (json["lng"] ?? 0).toDouble(),
      intensity: json["intensity"] ?? 1,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "lat": lat,
      "lng": lng,
      "intensity": intensity,
    };
  }
}