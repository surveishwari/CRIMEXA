import 'package:flutter/material.dart';

class AlertsScreen extends StatelessWidget {
  const AlertsScreen({super.key});

  final List<String> dummyAlerts = const [
    "New case assigned: Case #1023",
    "Heatmap updated for Downtown area",
    "Suspicious activity detected near Riverside",
    "3D scene update available for Case #1019",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Alerts")),
      body: ListView.builder(
        itemCount: dummyAlerts.length,
        itemBuilder: (context, index) {
          return ListTile(
            leading: const Icon(Icons.notification_important, color: Colors.red),
            title: Text(dummyAlerts[index]),
          );
        },
      ),
    );
  }
}