import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../widgets/hotspot_marker.dart';

class HotspotMapScreen extends StatefulWidget {
  @override
  _HotspotMapScreenState createState() => _HotspotMapScreenState();
}

class _HotspotMapScreenState extends State<HotspotMapScreen> {
  late GoogleMapController mapController;
  final LatLng _initialPos = LatLng(19.0760, 72.8777); // Mumbai
  final Set<Marker> _markers = {};

  @override
  void initState() {
    super.initState();
    _loadCrimeHotspots();
  }

  void _loadCrimeHotspots() {
    List<Map<String,dynamic>> hotspots = [
      {"lat":19.0760,"lng":72.8777,"risk":"HIGH","crime":"Theft"},
      {"lat":19.2183,"lng":72.9781,"risk":"MEDIUM","crime":"Assault"},
      {"lat":19.0456,"lng":72.8356,"risk":"LOW","crime":"Burglary"},
    ];

    for(var h in hotspots){
      _markers.add(HotspotMarker.create(
          LatLng(h["lat"], h["lng"]),
          h["crime"],
          h["risk"]
      ));
    }
    setState((){});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Crime Hotspot Map")),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(target: _initialPos, zoom: 12),
        markers: _markers,
        onMapCreated: (controller){ mapController = controller; },
      ),
    );
  }
}