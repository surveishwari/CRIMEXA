import 'dart:io';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';

import '../providers/crime_provider.dart';
import '../models/evidence_model.dart';

class ReconstructionScreen extends StatefulWidget {
  const ReconstructionScreen({super.key});

  @override
  State<ReconstructionScreen> createState() => _ReconstructionScreenState();
}

class _ReconstructionScreenState extends State<ReconstructionScreen> {
  final LatLng initialLocation = const LatLng(19.9975, 73.7898);
  final ImagePicker _picker = ImagePicker();

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<CrimeProvider>(context);

    Set<Marker> markers = provider.evidenceList
        .map(
          (e) => Marker(
            markerId: MarkerId(e.id.toString()),
            position: LatLng(e.latitude, e.longitude),
            infoWindow: InfoWindow(
              title: e.type,
              snippet: e.description,
              onTap: () => _showEvidenceDialog(context, e),
            ),
          ),
        )
        .toSet();

    void _addEvidence(LatLng pos) async {
      TextEditingController typeController = TextEditingController();
      TextEditingController descController = TextEditingController();
      XFile? pickedImage;

      await showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text("Add Evidence"),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: typeController,
                  decoration:
                      const InputDecoration(labelText: "Evidence Type"),
                ),
                TextField(
                  controller: descController,
                  decoration:
                      const InputDecoration(labelText: "Description"),
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                        onPressed: () async {
                          pickedImage =
                              await _picker.pickImage(source: ImageSource.camera);
                          setState(() {});
                        },
                        child: const Text("Camera")),
                    ElevatedButton(
                        onPressed: () async {
                          pickedImage =
                              await _picker.pickImage(source: ImageSource.gallery);
                          setState(() {});
                        },
                        child: const Text("Gallery")),
                  ],
                ),
                if (pickedImage != null)
                  Image.file(File(pickedImage.path), height: 100),
              ],
            ),
          ),
          actions: [
            TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text("Cancel")),
            ElevatedButton(
                onPressed: () {
                  provider.addEvidence(Evidence(
                    id: DateTime.now().millisecondsSinceEpoch,
                    type: typeController.text,
                    description: descController.text,
                    photoPath: pickedImage?.path ?? "",
                    latitude: pos.latitude,
                    longitude: pos.longitude,
                    timestamp: DateTime.now(),
                  ));
                  Navigator.pop(context);
                },
                child: const Text("Add")),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text("Crime Scene Reconstruction")),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(target: initialLocation, zoom: 14),
        markers: markers,
        onTap: _addEvidence,
        myLocationEnabled: true,
      ),
    );
  }

  void _showEvidenceDialog(BuildContext context, Evidence e) {
    showDialog(
        context: context,
        builder: (_) => AlertDialog(
              title: Text(e.type),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(e.description),
                  const SizedBox(height: 10),
                  e.photoPath.isNotEmpty
                      ? Image.file(File(e.photoPath), height: 150)
                      : const SizedBox(),
                  Text("Lat: ${e.latitude}, Lng: ${e.longitude}"),
                  Text("Added on: ${e.timestamp}"),
                ],
              ),
            ));
  }
}