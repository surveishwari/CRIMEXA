import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class SosScreen extends StatelessWidget {
  const SosScreen({super.key});

  final String emergencyNumber = "112"; // Example SOS number

  Future<void> _callEmergency() async {
    final Uri callUri = Uri(scheme: 'tel', path: emergencyNumber);
    if (await canLaunchUrl(callUri)) {
      await launchUrl(callUri);
    } else {
      debugPrint("Could not launch $emergencyNumber");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton.icon(
        icon: const Icon(Icons.warning, size: 32),
        label: const Text(
          "SOS - Call Emergency",
          style: TextStyle(fontSize: 20),
        ),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          backgroundColor: Colors.red,
        ),
        onPressed: _callEmergency,
      ),
    );
  }
}