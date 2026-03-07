import 'package:flutter/material.dart';

class RiskCard extends StatelessWidget {
  final String crime;
  final double confidence;
  final double risk;
  final String threat;

  RiskCard({required this.crime, required this.confidence, required this.risk, required this.threat});

  Color getThreatColor(){
    if(threat=="LOW") return Colors.green;
    if(threat=="MEDIUM") return Colors.orange;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      color: getThreatColor().withOpacity(0.2),
      margin: EdgeInsets.symmetric(vertical:20),
      child: Padding(
        padding: EdgeInsets.all(15),
        child: Column(
          children: [
            Text("Crime: $crime", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text("Confidence: ${confidence.toStringAsFixed(2)}%"),
            Text("Final Risk: ${risk.toStringAsFixed(2)}%"),
            Text("Threat Level: $threat", style: TextStyle(fontWeight: FontWeight.bold, color: getThreatColor())),
          ],
        ),
      ),
    );
  }
}