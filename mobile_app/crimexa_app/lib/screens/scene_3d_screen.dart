import 'package:flutter/material.dart';
import 'package:flutter_cube/flutter_cube.dart';

class Scene3DScreen extends StatelessWidget {
  final String modelPath;
  const Scene3DScreen({super.key, required this.modelPath});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("3D Scene Viewer")),
      body: Cube(
        onSceneCreated: (Scene scene) {
          scene.world.add(Object(fileName: modelPath));
          scene.camera.zoom = 10;
        },
      ),
    );
  }
}