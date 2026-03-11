class EvidenceAIService {

  static String classifyEvidence(String imagePath){

    // Mock AI classification (can later connect to real AI)

    if(imagePath.contains("weapon")){
      return "Possible Weapon";
    }

    if(imagePath.contains("blood")){
      return "Blood Evidence";
    }

    return "General Evidence";
  }

}