import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../services/ai_service.dart';
import '../services/report_service.dart';

import '../ai/reconstruction_engine.dart';
import '../ai/timeline_engine.dart';

import '../screens/crime_scene_viewer.dart';
import '../screens/timeline_screen.dart';

class CrimeScannerScreen extends StatefulWidget {
  const CrimeScannerScreen({super.key});

  @override
 State<CrimeScannerScreen> createState() => _CrimeScannerScreenState();
}

class _CrimeScannerScreenState extends State<CrimeScannerScreen> {

  File? image;

  String prediction = "";
  String reconstruction = "";

  List<String> objects = [];
  List<String> timeline = [];

  bool isLoading = false;

  final AIService ai = AIService();
  final ReconstructionEngine engine = ReconstructionEngine();
  final TimelineEngine timelineEngine = TimelineEngine();
  final ReportService reportService = ReportService();

  /// SCAN CRIME SCENE
  Future scanScene() async {

    final picked = await ImagePicker().pickImage(
      source: ImageSource.camera,
    );

    if (picked == null) return;

    setState(() {
      image = File(picked.path);
      prediction = "";
      reconstruction = "";
      objects = [];
      timeline = [];
      isLoading = true;
    });

    try {

      /// AI ANALYSIS
      var result = await ai.analyzeScene(image!);

      String pred = result["prediction"];

      List<String> detectedObjects =
          List<String>.from(result["objects_detected"]);

      /// RECONSTRUCTION
      String recon = engine.reconstruct(pred);

      /// TIMELINE
      List<String> generatedTimeline =
          timelineEngine.generateTimeline(pred);

      setState(() {
        prediction = pred;
        objects = detectedObjects;
        reconstruction = recon;
        timeline = generatedTimeline;
        isLoading = false;
      });

    } catch (e) {

      setState(() {
        prediction = "AI Server Error";
        isLoading = false;
      });

    }
  }

  /// GENERATE REPORT
  Future generateReport() async {

    if (prediction.isEmpty) return;

    await reportService.generateReport(
      prediction: prediction,
      objects: objects,
      reconstruction: reconstruction,
      timeline: timeline,
    );
  }

  @override
  Widget build(BuildContext context) {

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

            const SizedBox(height: 20),

            /// LOADING
            if (isLoading)
              const Center(
                child: CircularProgressIndicator(),
              ),

            const SizedBox(height: 20),

            /// SHOW RESULTS AFTER SCAN
            if (prediction.isNotEmpty) ...[

              /// AI PREDICTION
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
                  fontWeight: FontWeight.bold,
                  color: Colors.red,
                ),
              ),

              const SizedBox(height: 20),

              /// OBJECTS DETECTED
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

              const SizedBox(height: 10),

              /// DETECTED EVIDENCE
              Text(
                "Detected Evidence: ${objects.join(", ")}",
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 20),

              /// RECONSTRUCTION
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

              const SizedBox(height: 20),

              /// TIMELINE BUTTON
              ElevatedButton.icon(
                icon: const Icon(Icons.timeline),
                label: const Text("View Crime Timeline"),
                onPressed: () {

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => TimelineScreen(
                        timeline: timeline,
                      ),
                    ),
                  );

                },
              ),

              const SizedBox(height: 10),

              /// REPORT BUTTON
              ElevatedButton.icon(
                icon: const Icon(Icons.picture_as_pdf),
                label: const Text("Generate Case Report"),
                onPressed: generateReport,
              ),

              const SizedBox(height: 10),

              /// 3D SCENE VIEW
              ElevatedButton.icon(
                icon: const Icon(Icons.view_in_ar),
                label: const Text("View 3D Crime Scene"),
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

            ],

          ],
        ),
      ),
    );
  }
}