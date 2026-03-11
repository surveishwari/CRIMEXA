class SuspectModel {
  final String id;
  final String name;
  final String caseId;

  SuspectModel({
    required this.id,
    required this.name,
    required this.caseId,
  });

  factory SuspectModel.fromJson(Map<String, dynamic> json) {
    return SuspectModel(
      id: json["id"].toString(),
      name: json["name"] ?? "",
      caseId: json["caseId"].toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "name": name,
      "caseId": caseId,
    };
  }
}