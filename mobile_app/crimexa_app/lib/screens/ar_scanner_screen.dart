import 'package:flutter/material.dart';
import 'package:arcore_flutter_plugin/arcore_flutter_plugin.dart';

class ARScannerScreen extends StatefulWidget {
  const ARScannerScreen({super.key});

  @override
  State<ARScannerScreen> createState() => _ARScannerScreenState();
}

class _ARScannerScreenState extends State<ARScannerScreen> {

  late ArCoreController arCoreController;

  void onArCoreViewCreated(ArCoreController controller) {
    arCoreController = controller;
  }

  @override
  void dispose() {
    arCoreController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("Crime Scene Scanner"),
      ),

      body: ArCoreView(
        onArCoreViewCreated: onArCoreViewCreated,
        enableTapRecognizer: true,
      ),
    );
  }
}