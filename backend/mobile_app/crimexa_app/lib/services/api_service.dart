import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService{
  static const baseUrl="http://10.0.2.2:5000"; // Change for real server

  static Future<Map<String,dynamic>> predictCrime(int location,int hour,int month,int arrest,int domestic,String state) async {
    final res = await http.post(Uri.parse('$baseUrl/predict'),
      headers: {'Content-Type':'application/json'},
      body: jsonEncode({
        "location":location,
        "hour":hour,
        "month":month,
        "arrest":arrest,
        "domestic":domestic,
        "state":state
      })
    );
    return jsonDecode(res.body);
  }

  static Future<String> generatePDFReport() async {
    final res = await http.get(Uri.parse('$baseUrl/generate_report'));
    if(res.statusCode==200) return "crime_report.pdf";
    return "Failed to generate report";
  }
}