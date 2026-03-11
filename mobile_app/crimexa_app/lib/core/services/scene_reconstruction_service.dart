import 'package:flutter_cube/flutter_cube.dart';

class SceneReconstructionService {

  static Vector3 getPosition(String evidenceType) {

    switch (evidenceType) {

      case "weapon":
        return Vector3(1, -2, 0);

      case "body":
        return Vector3(0, -2, 0);

      case "blood":
        return Vector3(0.5, -1.5, -1);

      case "glass":
        return Vector3(-1, -2, 1);

      default:
        return Vector3(0, -2, 0);
    }
  }
}