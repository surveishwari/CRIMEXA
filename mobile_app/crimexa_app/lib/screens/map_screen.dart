import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:provider/provider.dart';
import 'package:geolocator/geolocator.dart';
import '../providers/app_provider.dart';
import '../models/evidence_model.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  late GoogleMapController mapController;
  LatLng currentPos = const LatLng(20.5937, 78.9629);
  final Set<Marker> markers = {};

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    bool enabled = await Geolocator.isLocationServiceEnabled();
    if (!enabled) return;

    LocationPermission permission = await Geolocator.requestPermission();
    Position pos = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);

    setState(() {
      currentPos = LatLng(pos.latitude, pos.longitude);
      markers.add(Marker(
        markerId: const MarkerId("current_location"),
        position: currentPos,
        infoWindow: const InfoWindow(title: "Your Location"),
      ));
    });
  }

  void _addCrimeMarker(LatLng pos) {
    final provider = Provider.of<AppProvider>(context, listen: false);
    provider.addEvidence(Evidence(
      id: 0,
      type: "Crime Evidence",
      description: "",
      photoPath: "",
      lat: pos.latitude,
      lng: pos.longitude,
      time: DateTime.now(),
      caseId: 0,
    ));

    setState(() {
      markers.add(Marker(
        markerId: MarkerId(DateTime.now().millisecondsSinceEpoch.toString()),
        position: pos,
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
        infoWindow: const InfoWindow(title: "Evidence"),
      ));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Crime Map")),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(target: currentPos, zoom: 12),
        markers: markers,
        onMapCreated: (c) => mapController = c,
        myLocationEnabled: true,
        onTap: _addCrimeMarker,
      ),
    );
  }
}