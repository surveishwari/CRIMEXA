import 'package:flutter/material.dart';
import 'package:flutter_cube/flutter_cube.dart';
import '../core/services/scene_reconstruction_service.dart';

class CrimeScene3DScreen extends StatefulWidget {
  const CrimeScene3DScreen({super.key});

  @override
  State<CrimeScene3DScreen> createState() => _CrimeScene3DScreenState();
}

class _CrimeScene3DScreenState extends State<CrimeScene3DScreen> {

  List<String> evidenceList = [
    "body",
    "weapon",
    "glass",
  ];

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text("3D Crime Scene Reconstruction"),
      ),

      body: Cube(

        onSceneCreated: (Scene scene) {

          scene.camera.zoom = 12;

          Object room = Object(
            fileName: "assets/3d/room.obj",
          );

          scene.world.add(room);

          for (var evidence in evidenceList) {

            Vector3 position =
                SceneReconstructionService.getPosition(evidence);

            Object object;

            if (evidence == "body") {
              object = Object(
                fileName: "assets/3d/body.obj",
                position: position,
                scale: Vector3.all(0.5),
              );
            }

            else if (evidence == "weapon") {
              object = Object(
                fileName: "assets/3d/weapon.obj",
                position: position,
                scale: Vector3.all(0.3),
              );
            }

            else {
              object = Object(
                fileName: "assets/3d/table.obj",
                position: position,
                scale: Vector3.all(0.6),
              );
            }

            scene.world.add(object);
          }
        },
      ),
    );
  }
}