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
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final locationController = TextEditingController();
  final timeController = TextEditingController();
  final entryController = TextEditingController();
  final weaponController = TextEditingController();
  final peopleController = TextEditingController();
  final soundController = TextEditingController();
  final motionController = TextEditingController();

  String result = "No prediction yet";

  Future<void> predictCrime() async {
    try {
      final response = await http.post(
        Uri.parse("http://localhost:5000/predict"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "location_type": int.tryParse(locationController.text) ?? 0,
          "time_of_incident": int.tryParse(timeController.text) ?? 0,
          "entry_method": int.tryParse(entryController.text) ?? 0,
          "weapon_present": int.tryParse(weaponController.text) ?? 0,
          "num_people_present": int.tryParse(peopleController.text) ?? 0,
          "sound_level": int.tryParse(soundController.text) ?? 0,
          "motion_detected": int.tryParse(motionController.text) ?? 0
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          result = data["predicted_crime"];
        });
      } else {
        setState(() {
          result = "Error: ${response.statusCode}";
        });
      }
    } catch (e) {
      setState(() {
        result = "Error: $e";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("CRIMEXA - Crime Prediction")),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: locationController, decoration: InputDecoration(labelText: "Location Type")),
            TextField(controller: timeController, decoration: InputDecoration(labelText: "Time of Incident")),
            TextField(controller: entryController, decoration: InputDecoration(labelText: "Entry Method")),
            TextField(controller: weaponController, decoration: InputDecoration(labelText: "Weapon Present")),
            TextField(controller: peopleController, decoration: InputDecoration(labelText: "Number of People")),
            TextField(controller: soundController, decoration: InputDecoration(labelText: "Sound Level")),
            TextField(controller: motionController, decoration: InputDecoration(labelText: "Motion Detected")),
            SizedBox(height: 20),
            ElevatedButton(onPressed: predictCrime, child: Text("Predict Crime")),
            SizedBox(height: 20),
            Text("Prediction: $result", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}