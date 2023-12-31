import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class TrainScheduleService {
  Future<http.Response> getSchedules(
      ReservationTicket reservationTicket) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      var uri = Uri.parse(
          '$baseUrl/getresevationschedules'); // Make sure the URL is correct

      final Map<String, dynamic> requestData = {
        'startStation': reservationTicket.startStation!.stationId,
        'endStation': reservationTicket.endStation!.stationId,
        'departureDate': reservationTicket.depatureDate,
        'returnDate': reservationTicket.returnDate.toString(),
      };

      final response = await http.post(
        uri,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(requestData), // Encode the data as JSON
      );
      print(json.decode(response.body));
      return response;
    } catch (e) {
      print(e);
      rethrow;
    }
  }

  Future<http.Response> getTrainInfo(scheduleId, depatureDate) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      var uri = Uri.parse(
          '$baseUrl/reservation/getReservationTrainInfo'); // Make sure the URL is correct

      final Map<String, dynamic> requestData = {
        'scheduleId': scheduleId,
        'depatureDate': depatureDate
      };

      final response = await http.post(
        uri,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(requestData), // Encode the data as JSON
      );
      print(json.decode(response.body));
      return response;
    } catch (e) {
      print(e);
      rethrow;
    }
  }
}
