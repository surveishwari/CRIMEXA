class CrimePredictor {

  String predictCrime({
    required int hour,
    required int day,
    required String location
  }) {

    if(location == "street" && hour > 20) {
      return "Motor Vehicle Theft";
    }

    if(location == "restaurant") {
      return "Criminal Damage";
    }

    if(location == "residence") {
      return "Domestic Offense";
    }

    return "Unknown Crime";
  }

}