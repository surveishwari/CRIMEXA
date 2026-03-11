import 'package:flutter/material.dart';
import 'package:flutter_cube/flutter_cube.dart';
import '../core/services/api_service.dart';

class Crime3DViewer extends StatefulWidget {
  final String caseId;
  const Crime3DViewer({super.key, required this.caseId});

  @override
  State<Crime3DViewer> createState() => _Crime3DViewerState();
}

class _Crime3DViewerState extends State<Crime3DViewer> {
  late Object sceneObject;
  bool isLoading = true;
  bool isPlaying = true;
  Map<String, dynamic>? aiData;

  @override
  void initState() {
    super.initState();
    loadScene();
  }

  Future<void> loadScene() async {
    try {
      final sceneData = await ApiService().get3DSceneData(widget.caseId);
      aiData = await ApiService().getAIAnalysis(widget.caseId);

      setState(() {
        sceneObject = Object(fileName: sceneData['objFile']); // path from backend
        isLoading = false;
      });
    } catch (e) {
      debugPrint("Error loading scene: $e");
    }
  }

  void togglePlayPause() {
    setState(() => isPlaying = !isPlaying);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("3D Crime Scene Replay")),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Stack(
              children: [
                Cube(
                  onSceneCreated: (Scene scene) {
                    scene.world.add(sceneObject);
                    scene.camera.position.z = 10;
                  },
                ),
                if (aiData != null)
                  Positioned(
                    top: 20,
                    left: 20,
                    child: Card(
                      color: Colors.white70,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("AI Prediction:",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Colors.red[800])),
                            Text(aiData!['prediction'] ?? 'No data'),
                            Text("Confidence: ${aiData!['confidence'] ?? '-'}")
                          ],
                        ),
                      ),
                    ),
                  ),
                Positioned(
                  bottom: 20,
                  left: 20,
                  child: FloatingActionButton(
                    onPressed: togglePlayPause,
                    child: Icon(isPlaying ? Icons.pause : Icons.play_arrow),
                  ),
                ),
              ],
            ),
    );
  }
}