import 'dart:io';
import 'package:flutter/material.dart';
import '../core/services/api_service.dart';
import 'scene_3d_screen.dart';

class CaseDetailScreen extends StatefulWidget {
  final String caseId;
  final File imageFile;
  const CaseDetailScreen({super.key, required this.caseId, required this.imageFile});

  @override
  State<CaseDetailScreen> createState() => _CaseDetailScreenState();
}

class _CaseDetailScreenState extends State<CaseDetailScreen> {
  Map<String, dynamic>? aiResult;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Case: ${widget.caseId}")),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(
                builder: (_) => Scene3DScreen(modelPath: "assets/3d_scenes/${widget.caseId}.obj"),
              ));
            },
            child: const Text("View 3D Scene"),
          ),
          ElevatedButton(
            onPressed: () async {
              var result = await ApiService.analyzeEvidence(widget.imageFile);
              setState(() => aiResult = result);
            },
            child: const Text("Analyze Evidence"),
          ),
          if (aiResult != null)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                "Prediction: ${aiResult!['prediction']}\nDetected Objects: ${aiResult!['objects_detected']}",
              ),
            )
        ],
      ),
    );
  }
}