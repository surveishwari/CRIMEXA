import 'package:flutter/material.dart';

class RiskCard extends StatelessWidget {
  final String crime;
  final double confidence;
  final double risk;
  final String threat;

  const RiskCard({
    super.key,
    required this.crime,
    required this.confidence,
    required this.risk,
    required this.threat,
  });

  Color getThreatColor() {
    switch (threat.toUpperCase()) {
      case "LOW":
        return Colors.green;
      case "MEDIUM":
        return Colors.orange;
      default:
        return Colors.red;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      color: getThreatColor().withOpacity(0.2),
      margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Crime: $crime",
                style:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text("Confidence: ${confidence.toStringAsFixed(2)}%"),
            Text("Final Risk: ${risk.toStringAsFixed(2)}%"),
            Text("Threat Level: $threat",
                style: TextStyle(
                    fontWeight: FontWeight.bold, color: getThreatColor())),
          ],
        ),
      ),
    );
  }
}