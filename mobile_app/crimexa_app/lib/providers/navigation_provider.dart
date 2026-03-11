import 'package:flutter/material.dart';

class NavigationProvider extends ChangeNotifier {
  String _page = "dashboard";

  String get page => _page;

  void changePage(String newPage) {
    if (_page != newPage) {
      _page = newPage;
      notifyListeners();
    }
  }
}