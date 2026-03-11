import '../core/config/app_config.dart';
import '../core/services/api_service.dart';
import '../models/report_model.dart';

class ReportRepository {
  final ApiService api = ApiService();

  /// Fetch all reports
  /// Optional: filter by caseId or date range
  Future<List<ReportModel>> getReports({
    int? caseId,
    String? startDate,
    String? endDate,
  }) async {
    try {
      final Map<String, dynamic> queryParams = {};
      if (caseId != null) queryParams['case_id'] = caseId;
      if (startDate != null) queryParams['start_date'] = startDate;
      if (endDate != null) queryParams['end_date'] = endDate;

      final data = await api.get(AppConfig.reports, queryParams: queryParams);

      if (data is List) {
        return data.map((e) => ReportModel.fromJson(e)).toList();
      } else {
        return [];
      }
    } catch (e) {
      print("Error fetching reports: $e");
      return [];
    }
  }

  /// Fetch a single report by ID
  Future<ReportModel?> getReportById(int id) async {
    try {
      final data = await api.get('${AppConfig.reports}/$id');
      return ReportModel.fromJson(data);
    } catch (e) {
      print("Error fetching report $id: $e");
      return null;
    }
  }
}