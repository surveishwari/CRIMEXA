import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapScreen extends StatelessWidget {
  final LatLng _center = const LatLng(19.0760, 72.8777); // Mumbai example

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Crime Hotspots')),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(target: _center, zoom: 12),
        markers: {
          Marker(markerId: MarkerId('m1'), position: _center, infoWindow: InfoWindow(title: 'Hotspot 1')),
        },
      ),
    );
  }
}