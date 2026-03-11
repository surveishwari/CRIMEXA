import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/evidence_provider.dart';
import '../services/ml_service.dart';
import '../services/api_service.dart';
import '../models/evidence.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class EvidenceMappingMapScreen extends StatefulWidget {
  const EvidenceMappingMapScreen({Key? key}) : super(key: key);

  @override
  State<EvidenceMappingMapScreen> createState() => _EvidenceMappingMapScreenState();
}

class _EvidenceMappingMapScreenState extends State<EvidenceMappingMapScreen> {
  late GoogleMapController mapController;
  final Set<Marker> _markers = {};

  @override
  void initState() {
    super.initState();
    fetchEvidence();
  }

  void fetchEvidence() async {
    final evidenceProvider = Provider.of<EvidenceProvider>(context, listen: false);
    final evidenceList = await ApiService.fetchEvidence("crimeId123"); // replace with actual crime id
    evidenceProvider.setEvidence(evidenceList);

    setState(() {
      _markers.clear();
      for (var ev in evidenceList) {
        _markers.add(Marker(
          markerId: MarkerId(ev.id),
          position: LatLng(18.5204 + _markers.length * 0.001, 73.8567 + _markers.length * 0.001),
          infoWindow: InfoWindow(title: ev.description),
        ));
      }
    });
  }

  void addNewEvidence(String description) {
    final evidenceProvider = Provider.of<EvidenceProvider>(context, listen: false);
    final newEv = Evidence(id: DateTime.now().toString(), description: description, crimeId: "crimeId123");

    evidenceProvider.setEvidence([...evidenceProvider.evidenceList, newEv]);
    setState(() {
      _markers.add(Marker(
        markerId: MarkerId(newEv.id),
        position: LatLng(18.5204 + _markers.length * 0.001, 73.8567 + _markers.length * 0.001),
        infoWindow: InfoWindow(title: newEv.description),
      ));
    });
  }

  Future<void> predictCrime() async {
    final evidenceProvider = Provider.of<EvidenceProvider>(context, listen: false);
    final descriptions = evidenceProvider.evidenceList.map((e) => e.description).toList();
    final prediction = await MLService.predictCrime(descriptions);

    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(prediction)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Evidence Mapping")),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.analytics),
        onPressed: predictCrime,
      ),
      body: GoogleMap(
        initialCameraPosition: const CameraPosition(
          target: LatLng(18.5204, 73.8567),
          zoom: 13,
        ),
        markers: _markers,
        onMapCreated: (controller) => mapController = controller,
      ),
    );
  }
}