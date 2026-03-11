import 'package:flutter/material.dart';
import 'package:animated_text_kit/animated_text_kit.dart';

class DashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Dashboard')),
      body: Center(
        child: AnimatedTextKit(
          animatedTexts: [
            TyperAnimatedText('Welcome to CRIMEXA', textStyle: TextStyle(fontSize: 28)),
            TyperAnimatedText('Predict & Analyze Crimes', textStyle: TextStyle(fontSize: 24)),
          ],
          repeatForever: true,
        ),
      ),
    );
  }
}