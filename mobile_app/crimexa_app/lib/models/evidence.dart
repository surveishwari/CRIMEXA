class Evidence {
  final String id;
  final String description;
  final String crimeId;

  Evidence({
    required this.id,
    required this.description,
    required this.crimeId,
  });

  factory Evidence.fromJson(Map<String, dynamic> json) {
    return Evidence(
      id: json['id'],
      description: json['description'],
      crimeId: json['crimeId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'description': description,
      'crimeId': crimeId,
    };
  }
}