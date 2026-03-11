class Crime {
  final String id;
  final String type;
  final double lat;
  final double lng;

  Crime({
    required this.id,
    required this.type,
    required this.lat,
    required this.lng,
  });

  factory Crime.fromJson(Map<String, dynamic> json) {
    return Crime(
      id: json['id'],
      type: json['type'],
      lat: json['lat'].toDouble(),
      lng: json['lng'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': type,
      'lat': lat,
      'lng': lng,
    };
  }
}