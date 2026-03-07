import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class HeatmapScreen extends StatefulWidget {
  const HeatmapScreen({super.key});

  @override
  State<HeatmapScreen> createState() => _HeatmapScreenState();
}

class _HeatmapScreenState extends State<HeatmapScreen> {
  final LatLng _initialPosition = const LatLng(19.0760, 72.8777);
  final Set<Marker> _markers = {};

  @override
  void initState() {
    super.initState();
    fetchHeatmap();
  }

  Future<void> fetchHeatmap() async {
    try {
      final response = await http.get(Uri.parse("http://127.0.0.1:5000/heatmap"));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        for (var item in data) {
          _markers.add(Marker(
            markerId: MarkerId("${item['lat']}_${item['lng']}"),
            position: LatLng(
              (item['lat'] as num).toDouble(),
              (item['lng'] as num).toDouble(),
            ),
            infoWindow: InfoWindow(title: "Risk: ${item['level']}"),
            icon: BitmapDescriptor.defaultMarkerWithHue(
              item['level'] == "HIGH"
                  ? BitmapDescriptor.hueRed
                  : item['level'] == "MEDIUM"
                      ? BitmapDescriptor.hueOrange
                      : BitmapDescriptor.hueGreen,
            ),
          ));
        }
        setState(() {});
      }
    } catch (e) {
      // fallback empty
    }
  }

  @override
  Widget build(BuildContext context) {
    return GoogleMap(
      initialCameraPosition: CameraPosition(target: _initialPosition, zoom: 13),
      markers: _markers,
      myLocationEnabled: true,
      zoomControlsEnabled: true,
    );
  }
}