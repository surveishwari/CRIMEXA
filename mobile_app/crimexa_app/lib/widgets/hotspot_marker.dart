import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/material.dart';

class HotspotMarker {
  static Marker create(LatLng position, String crime, String risk){
    BitmapDescriptor icon;
    if(risk=="HIGH") icon = BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed);
    else if(risk=="MEDIUM") icon = BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueOrange);
    else icon = BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen);

    return Marker(
      markerId: MarkerId(position.toString()),
      position: position,
      icon: icon,
      infoWindow: InfoWindow(title: crime, snippet: "Risk: $risk"),
    );
  }
}