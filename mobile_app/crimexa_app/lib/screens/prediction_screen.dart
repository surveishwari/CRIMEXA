import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class PredictionScreen extends StatefulWidget {
  const PredictionScreen({super.key});

  @override
  State<PredictionScreen> createState() => _PredictionScreenState();
}

class _PredictionScreenState extends State<PredictionScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController locationController = TextEditingController();
  final TextEditingController hourController = TextEditingController();
  final TextEditingController monthController = TextEditingController();

  bool loading = false;
  Map<String, dynamic>? predictionResult;

  Color getThreatColor(String? level) {
    switch (level?.toUpperCase()) {
      case "HIGH":
        return Colors.red;
      case "MEDIUM":
        return Colors.orange;
      case "LOW":
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  Future<void> getPrediction() async {
    setState(() {
      loading = true;
      predictionResult = null;
    });

    try {
      final response = await http.post(
        Uri.parse("http://127.0.0.1:5000/predict"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "location": int.tryParse(locationController.text) ?? 0,
          "hour": int.tryParse(hourController.text) ?? 0,
          "month": int.tryParse(monthController.text) ?? 1,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        setState(() {
          predictionResult = {
            "prediction": data['prediction']?.toString() ?? "N/A",
            "confidence": data['confidence']?.toString() ?? "0",
            "threat_level": data['threat_level']?.toString() ?? "N/A",
          };
        });
      } else {
        setState(() {
          predictionResult = {
            "prediction": "Error",
            "confidence": "0",
            "threat_level": "N/A",
          };
        });
      }
    } catch (e) {
      setState(() {
        predictionResult = {
          "prediction": "Error",
          "confidence": "0",
          "threat_level": "N/A",
        };
      });
    } finally {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Form(
            key: _formKey,
            child: Column(
              children: [
                TextFormField(
                  controller: locationController,
                  decoration: const InputDecoration(labelText: "Location ID"),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: hourController,
                  decoration: const InputDecoration(labelText: "Hour (0-23)"),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: monthController,
                  decoration: const InputDecoration(labelText: "Month (1-12)"),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: loading ? null : getPrediction,
                  child: loading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : const Text("Predict"),
                ),
              ],
            ),
          ),
          const SizedBox(height: 30),
          if (predictionResult != null)
            Card(
              elevation: 5,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Text(
                      "Prediction: ${predictionResult?['prediction'] ?? 'N/A'}",
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    Text(
                        "Confidence: ${predictionResult?['confidence'] ?? '0'}%"),
                    const SizedBox(height: 10),
                    Text(
                      "Threat Level: ${predictionResult?['threat_level'] ?? 'N/A'}",
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: getThreatColor(
                              predictionResult?['threat_level'])),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}