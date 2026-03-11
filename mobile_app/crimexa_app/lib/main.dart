import 'package:flutter/material.dart';
import 'screens/dashboard.dart';

void main() {
  runApp(const CrimexaApp());
}

class CrimexaApp extends StatelessWidget {
  const CrimexaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CRIMEXA',
      theme: ThemeData(primarySwatch: Colors.deepPurple),
      home: const DashboardScreen(),
    );
  }
}
