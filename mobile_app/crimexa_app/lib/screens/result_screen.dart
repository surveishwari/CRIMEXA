import 'package:flutter/material.dart';

class ResultScreen extends StatelessWidget {

  final Map data;

  const ResultScreen({super.key, required this.data});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("Prediction Result")),

      body: Padding(
        padding: const EdgeInsets.all(20),

        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Text("Crime: ${data["prediction"]}", style: const TextStyle(fontSize: 20)),
            Text("Confidence: ${data["confidence"]}%"),

            const SizedBox(height: 10),

            Text("Risk Score: ${data["final_risk"]}"),

            Text(
              "Threat Level: ${data["threat_level"]}",
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 20),

            ElevatedButton(
              onPressed: () {},
              child: const Text("Download Report"),
            )

          ],
        ),
      ),
    );
  }
}