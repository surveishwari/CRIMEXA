import 'package:flutter/material.dart';
import '../services/api_service.dart';

class PredictScreen extends StatefulWidget {
  @override
  _PredictScreenState createState() => _PredictScreenState();
}

class _PredictScreenState extends State<PredictScreen> {

  final hourController = TextEditingController();
  final monthController = TextEditingController();

  int location = 1;
  int arrest = 0;
  int domestic = 0;
  String state = "Maharashtra";

  String result = "";

  void predict() async {

    var response = await ApiService.predictCrime(
      location,
      int.parse(hourController.text),
      int.parse(monthController.text),
      arrest,
      domestic,
      state
    );

    setState(() {
      result =
          "Crime: ${response['predicted_crime']}\n"
          "Confidence: ${response['confidence']}%\n"
          "Risk Score: ${response['risk_score']}\n"
          "Threat Level: ${response['threat_level']}";
    });
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: Text("CRIMEXA Prediction")),

      body: Padding(
        padding: EdgeInsets.all(20),

        child: Column(
          children: [

            TextField(
              controller: hourController,
              decoration: InputDecoration(labelText: "Hour (0-23)"),
            ),

            TextField(
              controller: monthController,
              decoration: InputDecoration(labelText: "Month (1-12)"),
            ),

            SizedBox(height: 20),

            ElevatedButton(
              onPressed: predict,
              child: Text("Predict Crime"),
            ),

            SizedBox(height: 20),

            Text(result)
          ],
        ),
      ),
    );
  }
}