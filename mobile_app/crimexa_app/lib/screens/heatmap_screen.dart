import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:provider/provider.dart';
import '../models/evidence_model.dart';
import '../providers/app_provider.dart';

class HeatmapScreen extends StatelessWidget {
  const HeatmapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);

    Set<Marker> markers = appProvider.evidences
        .map((e) => Marker(
            markerId: MarkerId(e.key.toString()),
            position: LatLng(e.latitude, e.longitude),
            infoWindow: InfoWindow(title: e.type, snippet: e.description)))
        .toSet();

    return Scaffold(
      appBar: AppBar(title: const Text("Crime Intelligence Map")),
      body: GoogleMap(
        initialCameraPosition: const CameraPosition(
          target: LatLng(19.9975, 73.7898),
          zoom: 13,
        ),
        markers: markers,
        myLocationEnabled: true,
      ),
    );
  }
}