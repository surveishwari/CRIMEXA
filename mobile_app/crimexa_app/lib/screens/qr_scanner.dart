import 'package:flutter/material.dart';

class QRScanner extends StatelessWidget {
  const QRScanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("QR Scanner")),
      body: const Center(
        child: Text("QR Scanner Placeholder", style: TextStyle(fontSize: 18)),
      ),
    );
  }
}
