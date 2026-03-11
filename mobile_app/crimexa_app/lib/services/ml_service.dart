class MLService {
  static Future<String> predictCrime(List<String> descriptions) async {
    await Future.delayed(const Duration(seconds: 1));
    return "Predicted Crime Type: Burglary";
  }
}