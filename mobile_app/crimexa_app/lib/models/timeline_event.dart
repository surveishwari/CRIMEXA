class TimelineEvent {
  String title;
  String description;
  DateTime time;

  TimelineEvent({
    required this.title,
    required this.description,
    required this.time,
  });

  factory TimelineEvent.fromJson(Map<String, dynamic> json) {
    return TimelineEvent(
      title: json["title"] ?? "",
      description: json["description"] ?? "",
      time: DateTime.parse(json["time"] ?? DateTime.now().toString()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "title": title,
      "description": description,
      "time": time.toIso8601String(),
    };
  }
}