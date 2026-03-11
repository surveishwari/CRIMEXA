class EvidenceAIService {

  static String classifyEvidence(String imagePath){

    if(imagePath.contains("weapon")){
      return "Weapon Evidence";
    }

    if(imagePath.contains("blood")){
      return "Blood Evidence";
    }

    return "General Evidence";

  }

}