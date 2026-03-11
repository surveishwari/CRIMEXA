import 'package:flutter/material.dart';
import 'package:model_viewer_plus/model_viewer_plus.dart';

class CrimeSceneViewer extends StatelessWidget {

  final String prediction;
  final List objects;

  const CrimeSceneViewer({
    super.key,
    required this.prediction,
    required this.objects,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("3D Crime Scene"),
      ),
      body: Column(
        children: [

          /// 3D ROOM VIEW
          Expanded(
            child: ModelViewer(
              src: 'assets/3d/room.glb',
              autoRotate: true,
              cameraControls: true,
            ),
          ),

          const SizedBox(height: 20),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [

                Text(
                  "Prediction: $prediction",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),

                Text(
                  "Objects: ${objects.join(", ")}",
                  style: const TextStyle(fontSize: 16),
                ),

              ],
            ),
          ),

          const SizedBox(height: 20),

        ],
      ),
    );
  }
}