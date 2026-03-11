import 'package:flutter/material.dart';
import 'package:camera/camera.dart';

class AIScannerScreen extends StatefulWidget {
  const AIScannerScreen({super.key});

  @override
  State<AIScannerScreen> createState() => _AIScannerScreenState();
}

class _AIScannerScreenState extends State<AIScannerScreen> {

  CameraController? controller;

  @override
  void initState() {
    super.initState();
    initCamera();
  }

  Future initCamera() async {

    final cameras = await availableCameras();

    controller = CameraController(
      cameras.first,
      ResolutionPreset.medium,
    );

    await controller!.initialize();

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {

    if (controller == null || !controller!.value.isInitialized) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(

      appBar: AppBar(
        title: const Text("Crime Scene Scanner"),
      ),

      body: Stack(

        children: [

          CameraPreview(controller!),

          Positioned(
            bottom: 30,
            left: 0,
            right: 0,

            child: Center(

              child: ElevatedButton(

                child: const Text("Analyze Scene"),

                onPressed: () {

                  // detection will run here

                },

              ),

            ),
          ),

        ],
      ),
    );
  }
}