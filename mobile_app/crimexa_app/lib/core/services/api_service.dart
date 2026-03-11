import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class ApiService {
  static const baseUrl = "http://127.0.0.1:5000";

  static Future<Map<String, dynamic>> analyzeEvidence(File imageFile) async {
    var request = http.MultipartRequest('POST', Uri.parse('$baseUrl/analyze_scene'));
    request.files.add(await http.MultipartFile.fromPath('image', imageFile.path));
    var response = await request.send();
    var respStr = await response.stream.bytesToString();
    return json.decode(respStr);
  }
}