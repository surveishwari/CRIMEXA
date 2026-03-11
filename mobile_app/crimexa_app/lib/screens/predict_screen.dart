import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../services/api_service.dart';

class PredictScreen extends StatefulWidget {
  const PredictScreen({super.key});

  @override
  State<PredictScreen> createState() => _PredictScreenState();
}

class _PredictScreenState extends State<PredictScreen> {
  final TextEditingController hourController = TextEditingController();
  final TextEditingController monthController = TextEditingController();

  int location = 1;
  int arrest = 0;
  int domestic = 0;
  String state = "Maharashtra";

  double confidence = 0;
  String predictedCrime = "";
  double riskScore = 0;
  String threatLevel = "";

  void predict() async {
    var response = await ApiService.predictCrime(
        location,
        int.parse(hourController.text),
        int.parse(monthController.text),
        arrest,
        domestic,
        state);

    setState(() {
      predictedCrime = response['predicted_crime'] ?? "";
      confidence = response['confidence']?.toDouble() ?? 0;
      riskScore = response['risk_score']?.toDouble() ?? 0;
      threatLevel = response['threat_level'] ?? "";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("CRIMEXA Prediction")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: ListView(
          children: [
            TextField(
              controller: hourController,
              decoration: const InputDecoration(labelText: "Hour (0-23)"),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 16),
            TextField(
              controller: monthController,
              decoration: const InputDecoration(labelText: "Month (1-12)"),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 20),
            ElevatedButton(onPressed: predict, child: const Text("Predict Crime")),
            const SizedBox(height: 20),
            Text(
              "Predicted Crime: $predictedCrime",
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text("Confidence: ${confidence.toStringAsFixed(2)}%"),
            Text("Risk Score: ${riskScore.toStringAsFixed(2)}"),
            Text("Threat Level: $threatLevel"),
            const SizedBox(height: 20),
            SizedBox(
              height: 200,
              child: PieChart(
                PieChartData(sections: [
                  PieChartSectionData(
                      value: confidence,
                      color: Colors.red,
                      title: "${confidence.toStringAsFixed(1)}%"),
                  PieChartSectionData(
                      value: 100 - confidence,
                      color: Colors.green,
                      title: ""),
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}