import 'package:flutter/material.dart';

class AppTheme {

  static final ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: const Color(0xFF0F172A),

    primaryColor: const Color(0xFF2563EB),

    cardColor: const Color(0xFF1E293B),

    appBarTheme: const AppBarTheme(
      backgroundColor: Color(0xFF020617),
      elevation: 0,
    ),

    textTheme: const TextTheme(
      headlineMedium: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}