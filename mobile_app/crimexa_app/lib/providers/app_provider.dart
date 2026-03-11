import 'package:flutter/material.dart';
import '../models/case_model.dart';
import '../models/evidence_model.dart';

class AppProvider extends ChangeNotifier {

  /// -------------------------------
  /// Navigation
  /// -------------------------------

  int _selectedIndex = 0;

  int get selectedIndex => _selectedIndex;

  void changePage(int index) {
    _selectedIndex = index;
    notifyListeners();
  }

  /// -------------------------------
  /// CASE MANAGEMENT
  /// -------------------------------

  final List<CaseModel> _cases = [];

  List<CaseModel> get cases => _cases;

  void createCase(String title, String location) {

    final newCase = CaseModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: title,
      location: location,
      status: "OPEN",
    );

    _cases.add(newCase);
    notifyListeners();
  }

  void closeCase(String id) {
    final caseIndex = _cases.indexWhere((c) => c.id == id);

    if (caseIndex != -1) {
      _cases[caseIndex] = CaseModel(
        id: _cases[caseIndex].id,
        title: _cases[caseIndex].title,
        location: _cases[caseIndex].location,
        status: "CLOSED",
      );

      notifyListeners();
    }
  }

  /// -------------------------------
  /// EVIDENCE MANAGEMENT
  /// -------------------------------

  final List<EvidenceModel> _evidences = [];

  List<EvidenceModel> get evidences => _evidences;

  void addEvidence(EvidenceModel evidence) {
    _evidences.add(evidence);
    notifyListeners();
  }

  void deleteEvidence(String id) {
    _evidences.removeWhere((e) => e.id == id);
    notifyListeners();
  }

  Future<void> fetchEvidence() async {
    await Future.delayed(const Duration(milliseconds: 500));
    notifyListeners();
  }

}