class AppConfig {
  // Base URL of your backend Flask server
  static const String baseUrl = "http://127.0.0.1:5000"; // or "http://localhost:5000" for web

  // Endpoints
  static const String cases = "/cases";
  static const String suspects = "/suspects";
  static const String evidence = "/evidence";
  static const String reports = "/reports";
}