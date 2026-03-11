import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../services/api_service.dart';

class CrimeMapScreen extends StatefulWidget {
  @override
  _CrimeMapScreenState createState() => _CrimeMapScreenState();
}

class _CrimeMapScreenState extends State<CrimeMapScreen> {
  Set<Marker> markers = {};

  @override
  void initState() {
    super.initState();
    fetchHeatmap();
  }

  void fetchHeatmap() async {
    var data = await ApiService.getHeatmap();
    Set<Marker> tempMarkers = {};
    for (var loc in data) {
      tempMarkers.add(Marker(
        markerId: MarkerId("${loc['lat']}_${loc['lng']}"),
        position: LatLng(loc['lat'], loc['lng']),
        infoWindow: InfoWindow(title: "Crime Intensity: ${loc['intensity']}"),
      ));
    }
    setState(() {
      markers = tempMarkers;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Crime Heatmap")),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(target: LatLng(18.5204, 73.8567), zoom: 13),
        markers: markers,
      ),
    );
  }
}