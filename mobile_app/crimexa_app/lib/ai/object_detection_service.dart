import 'package:tflite_flutter/tflite_flutter.dart';

class ObjectDetectionService {

  late Interpreter interpreter;

  Future loadModel() async {

    interpreter = await Interpreter.fromAsset(
      'models/yolo.tflite',
    );
  }

  List<String> detectObjects(List inputImage) {

    // AI processing here

    List<String> detectedObjects = [
      "knife",
      "blood",
      "person"
    ];

    return detectedObjects;
  }
}