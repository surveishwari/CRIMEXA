import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class AIService {

  Future<Map<String,dynamic>> analyzeScene(File image) async {

    var request = http.MultipartRequest(
      'POST',
      Uri.parse("http://10.0.2.2:5000/analyze_scene"),
    );

    request.files.add(
      await http.MultipartFile.fromPath(
        'image',
        image.path,
      ),
    );

    var response = await request.send();

    var responseString = await response.stream.bytesToString();

    return jsonDecode(responseString);

  }

}