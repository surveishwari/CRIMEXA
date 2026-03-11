import 'package:flutter/material.dart';
import '../ai/crime_predictor.dart';

class PredictCrimeScreen extends StatefulWidget {
  const PredictCrimeScreen({super.key});

  @override
  State<PredictCrimeScreen> createState() => _PredictCrimeScreenState();
}

class _PredictCrimeScreenState extends State<PredictCrimeScreen> {

  final CrimePredictor predictor = CrimePredictor();

  final hourController = TextEditingController();
  final dayController = TextEditingController();
  final locationController = TextEditingController();

  String result = "";

  void predict() {

    int hour = int.parse(hourController.text);
    int day = int.parse(dayController.text);
    String location = locationController.text;

    String prediction = predictor.predictCrime(
      hour: hour,
      day: day,
      location: location,
    );

    setState(() {
      result = prediction;
    });

  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(title: const Text("Crime Prediction")),

      body: Padding(

        padding: const EdgeInsets.all(16),

        child: Column(

          children: [

            TextField(
              controller: hourController,
              decoration: const InputDecoration(labelText: "Hour"),
            ),

            TextField(
              controller: dayController,
              decoration: const InputDecoration(labelText: "Day"),
            ),

            TextField(
              controller: locationController,
              decoration: const InputDecoration(labelText: "Location"),
            ),

            const SizedBox(height: 20),

            ElevatedButton(
              onPressed: predict,
              child: const Text("Predict Crime"),
            ),

            const SizedBox(height: 20),

            Text(
              result,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.red,
              ),
            ),

          ],

        ),

      ),

    );
  }
}