class ReportModel {
  final String id;
  final String type;
  final String description;

  ReportModel({
    required this.id,
    required this.type,
    required this.description,
  });

  factory ReportModel.fromJson(Map<String, dynamic> json) {
    return ReportModel(
      id: json["id"].toString(),
      type: json["type"] ?? "",
      description: json["description"] ?? "",
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "type": type,
      "description": description,
    };
  }
}