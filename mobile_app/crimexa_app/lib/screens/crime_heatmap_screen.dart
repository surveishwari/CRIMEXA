import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class CrimeHeatmapScreen extends StatefulWidget {
  const CrimeHeatmapScreen({super.key});

  @override
  State<CrimeHeatmapScreen> createState() => _CrimeHeatmapScreenState();
}

class _CrimeHeatmapScreenState extends State<CrimeHeatmapScreen> {

  final LatLng initialPosition = const LatLng(18.5204, 73.8567); // Pune center
  final List<LatLng> crimeLocations = [
    LatLng(18.525, 73.85),
    LatLng(18.522, 73.858),
    LatLng(18.518, 73.852),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Crime Heatmap")),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(
          target: initialPosition,
          zoom: 14,
        ),
        markers: crimeLocations
            .map((loc) => Marker(
                markerId: MarkerId(loc.toString()), position: loc))
            .toSet(),
      ),
    );
  }
}