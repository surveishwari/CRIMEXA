import 'package:flutter/material.dart';
import '../models/crime.dart';
import '../services/api_service.dart';

class CrimeProvider with ChangeNotifier {
  List<Crime> crimeList = [];

  void setCrimes(List<Crime> crimes) {
    crimeList = crimes;
    notifyListeners();
  }

  // Add this fetchCrimes() method so your advanced dashboard works
  Future<void> fetchCrimes() async {
    final crimes = await ApiService.fetchCrimes();
    setCrimes(crimes);
  }
}