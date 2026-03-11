import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class CrimeMapScreen extends StatefulWidget {
const CrimeMapScreen({super.key});

@override
State<CrimeMapScreen> createState() => _CrimeMapScreenState();
}

class _CrimeMapScreenState extends State<CrimeMapScreen> {

late GoogleMapController mapController;

final LatLng center = const LatLng(18.5204, 73.8567); // Pune

final List<Marker> crimeMarkers = [

```
Marker(
  markerId: const MarkerId("crime1"),
  position: const LatLng(18.5204, 73.8567),
  infoWindow: const InfoWindow(
    title: "Robbery",
    snippet: "Street Area",
  ),
),

Marker(
  markerId: const MarkerId("crime2"),
  position: const LatLng(18.5300, 73.8600),
  infoWindow: const InfoWindow(
    title: "Vehicle Theft",
    snippet: "Parking Area",
  ),
),

Marker(
  markerId: const MarkerId("crime3"),
  position: const LatLng(18.5100, 73.8500),
  infoWindow: const InfoWindow(
    title: "Assault",
    snippet: "Restaurant",
  ),
),
```

];

void _onMapCreated(GoogleMapController controller) {
mapController = controller;
}

@override
Widget build(BuildContext context) {

```
return Scaffold(

  appBar: AppBar(
    title: const Text("Crime Heatmap"),
  ),

  body: GoogleMap(

    onMapCreated: _onMapCreated,

    initialCameraPosition: CameraPosition(
      target: center,
      zoom: 12,
    ),

    markers: Set.from(crimeMarkers),

  ),

);
```

}
}
