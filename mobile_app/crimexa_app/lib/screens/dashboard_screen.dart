import 'package:flutter/material.dart';
import 'crime_reconstruction.dart';
import 'case_management.dart';
import 'prediction.dart';
import 'emergency_contact.dart';
import 'qr_scanner.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final items = [
      {'title': 'Crime Recon', 'icon': Icons.search, 'screen': const CrimeReconstruction()},
      {'title': 'Case Management', 'icon': Icons.folder, 'screen': const CaseManagement()},
      {'title': 'Prediction', 'icon': Icons.analytics, 'screen': const PredictionScreen()},
      {'title': 'Emergency', 'icon': Icons.phone, 'screen': const EmergencyContact()},
      {'title': 'QR Scanner', 'icon': Icons.qr_code, 'screen': const QRScanner()},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text("CRIMEXA Dashboard")),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: GridView.builder(
          itemCount: items.length,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2, crossAxisSpacing: 10, mainAxisSpacing: 10),
          itemBuilder: (context, index) {
            return GestureDetector(
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (_) => items[index]['screen'] as Widget));
              },
              child: Card(
                elevation: 8,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                shadowColor: Colors.deepPurpleAccent,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(items[index]['icon'] as IconData, size: 50, color: Colors.deepPurple),
                    const SizedBox(height: 10),
                    Text(items[index]['title'] as String,
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
