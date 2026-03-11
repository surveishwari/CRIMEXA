class ReconstructionEngine {

  String reconstruct(String prediction) {

    if (prediction.contains("Homicide")) {
      return "Victim attacked with weapon from behind. Possible homicide case.";
    }

    if (prediction.contains("Robbery")) {
      return "Suspect entered location and threatened victim for valuables.";
    }

    if (prediction.contains("Weapon")) {
      return "Weapon assault detected. Suspect used sharp object.";
    }

    if (prediction.contains("Burglary")) {
      return "Suspect broke into property and stole assets.";
    }

    return "Scene reconstruction unavailable";
  }

}