import 'package:flutter/material.dart';

class PredictionScreen extends StatelessWidget {
  const PredictionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Prediction")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // TODO: call prediction API
          },
          child: const Text("Run AI Prediction"),
        ),
      ),
    );
  }
}
