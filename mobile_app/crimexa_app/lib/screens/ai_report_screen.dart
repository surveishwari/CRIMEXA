import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/crime_provider.dart';

class AIReportScreen extends StatelessWidget {
  const AIReportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<CrimeProvider>(context);

    // Generate AI-style report
    String report = provider.evidenceList.isEmpty
        ? "No evidence collected yet."
        : provider.evidenceList.map((e) {
            return "Evidence Type: ${e.type}\n"
                "Location: (${e.lat.toStringAsFixed(4)}, ${e.lng.toStringAsFixed(4)})\n"
                "Time: ${e.time}\n";
          }).join("\n");

    return Scaffold(
      appBar: AppBar(title: const Text("AI Investigation Report")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Text(
            report,
            style: const TextStyle(fontSize: 16, height: 1.5),
          ),
        ),
      ),
    );
  }
}