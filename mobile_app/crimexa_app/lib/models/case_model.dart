class CaseModel {
  final String id;
  final String title;
  final String location;
  final String status;

  CaseModel({
    required this.id,
    required this.title,
    required this.location,
    required this.status,
  });

  factory CaseModel.fromJson(Map<String, dynamic> json) {
    return CaseModel(
      id: json['id'].toString(),
      title: json['title'],
      location: json['location'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "title": title,
      "location": location,
      "status": status,
    };
  }
}