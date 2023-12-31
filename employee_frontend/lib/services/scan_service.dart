import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; // Import this to use JSON encoding/decoding

class ApiService {
  //

  static Future<Map<String, dynamic>> sendScannedData(
      String id, String data) async {
    var baseUrl = dotenv.env['BASE_URL'];
    final Uri uri =
        Uri.parse('$baseUrl/scan-data'); // Replace with your API endpoint

    final response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'id': id,
        'resultData': data
      }), // Convert the body data to JSON-encoded string
    );

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      return responseData;
    } else {
      if (kDebugMode) {
        print('Failed to send data: ${response.statusCode}');
      }
      final responseData = json.decode(response.body);
      return responseData;
      // return {'message': 'Failed to send data to the backend'};
    }
  }
}
