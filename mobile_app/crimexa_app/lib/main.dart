import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const CrimexaApp());
}

class CrimexaApp extends StatelessWidget {
  const CrimexaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "CRIMEXA",
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}