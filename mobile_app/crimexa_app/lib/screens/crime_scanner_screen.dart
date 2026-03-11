import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../services/ai_service.dart';
import '../ai/reconstruction_engine.dart';
import '../screens/crime_scene_viewer.dart';

class CrimeScannerScreen extends StatefulWidget {
const CrimeScannerScreen({super.key});

@override
State<CrimeScannerScreen> createState() => _CrimeScannerScreenState();
}

class _CrimeScannerScreenState extends State<CrimeScannerScreen> {

File? image;

String prediction = "";
String reconstruction = "";
List objects = [];

final AIService ai = AIService();
final ReconstructionEngine engine = ReconstructionEngine();

Future scanScene() async {

```
final picked = await ImagePicker().pickImage(
  source: ImageSource.camera,
);

if (picked == null) return;

setState(() {
  image = File(picked.path);
  prediction = "";
  reconstruction = "";
  objects = [];
});

try {

  var result = await ai.analyzeScene(image!);

  String pred = result["prediction"];
  List detectedObjects = result["objects_detected"];

  String recon = engine.reconstruct(pred);

  setState(() {
    prediction = pred;
    objects = detectedObjects;
    reconstruction = recon;
  });

} catch (e) {

  setState(() {
    prediction = "AI Server Error";
  });

}
```

}

@override
Widget build(BuildContext context) {

```
return Scaffold(

  appBar: AppBar(
    title: const Text("Crime Scene Scanner"),
  ),

  body: SingleChildScrollView(

    padding: const EdgeInsets.all(16),

    child: Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        /// IMAGE PREVIEW
        image != null
            ? ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.file(
                  image!,
                  height: 250,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              )
            : const Text("No crime scene scanned"),

        const SizedBox(height: 20),

        /// SCAN BUTTON
        ElevatedButton.icon(
          icon: const Icon(Icons.camera_alt),
          label: const Text("Scan Crime Scene"),
          onPressed: scanScene,
        ),

        const SizedBox(height: 30),

        if (prediction.isNotEmpty) ...[

          const Text(
            "AI Prediction",
            style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 8),

          Text(
            prediction,
            style: const TextStyle(
              fontSize: 22,
              color: Colors.red,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 20),

          const Text(
            "Objects Detected",
            style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 8),

          Text(
            objects.join(", "),
            style: const TextStyle(fontSize: 16),
          ),

          const SizedBox(height: 20),

          const Text(
            "Scene Reconstruction",
            style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 8),

          Text(
            reconstruction,
            style: const TextStyle(fontSize: 16),
          ),

          const SizedBox(height: 30),

          /// 3D VIEW BUTTON
          Center(
            child: ElevatedButton(
              child: const Text("View 3D Crime Scene"),
              onPressed: () {

                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CrimeSceneViewer(
                      prediction: prediction,
                      objects: objects,
                    ),
                  ),
                );

              },
            ),
          ),

        ]

      ],

    ),

  ),

);
```

}
}
