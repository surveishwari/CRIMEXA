import '../models/case_model.dart';

class CaseRepository {

  final List<CaseModel> _cases = [];

  List<CaseModel> getCases() {
    return _cases;
  }

  void addCase(CaseModel caseModel) {
    _cases.add(caseModel);
  }

}