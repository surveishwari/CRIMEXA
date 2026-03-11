import 'package:flutter/material.dart';
import 'ar_scanner_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("CRIMEXA Scanner"),
      ),

      body: Center(

        child: ElevatedButton(

          child: const Text("Scan Crime Scene"),

          onPressed: () {

            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const ARScannerScreen(),
              ),
            );

          },
        ),

      ),

    );
  }
}