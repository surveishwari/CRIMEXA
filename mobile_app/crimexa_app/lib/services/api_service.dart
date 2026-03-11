import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://127.0.0.1:5000";

  static Future<Map<String, dynamic>> analyzeScene(File image) async {
    var request = http.MultipartRequest('POST', Uri.parse('$baseUrl/analyze_scene'));
    request.files.add(await http.MultipartFile.fromPath('image', image.path));

    var streamed = await request.send();
    var response = await http.Response.fromStream(streamed);

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to analyze scene: ${response.body}");
    }
  }
}