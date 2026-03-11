import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class EmergencyContact extends StatelessWidget {
  const EmergencyContact({super.key});

  final String number = "100";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Emergency Contacts")),
      body: Center(
        child: ElevatedButton.icon(
          icon: const Icon(Icons.call),
          label: const Text("Call Police"),
          onPressed: () async {
            Uri url = Uri.parse("tel:$number");
            if (await canLaunchUrl(url)) {
              launchUrl(url);
            }
          },
        ),
      ),
    );
  }
}
