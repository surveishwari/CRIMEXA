import 'package:flutter/material.dart';
import '../models/evidence.dart';

class EvidenceProvider with ChangeNotifier {
  List<Evidence> evidenceList = [];

  void setEvidence(List<Evidence> evidence) {
    evidenceList = evidence;
    notifyListeners();
  }
}