import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(CrimexaApp());
}

class CrimexaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String result = "No prediction yet";

  Future<void> predictCrime() async {
    final response = await http.post(
      Uri.parse("http://YOUR_BACKEND_IP:5000/predict"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "location_type": 1,
        "time_of_incident": 1,
        "entry_method": 0,
        "weapon_present": 1
      }),
    );

    final data = jsonDecode(response.body);

    setState(() {
      result = data["predicted_crime"];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("CRIMEXA")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Prediction: $result"),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: predictCrime,
              child: Text("Predict Crime"),
            )
          ],
        ),
      ),
    );
  }
}