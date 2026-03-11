import 'package:flutter/material.dart';

class SuspectScreen extends StatelessWidget {
  const SuspectScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [

          Text(
            "Suspects",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),

          SizedBox(height: 20),

          Expanded(
            child: Center(
              child: Text(
                "Suspect Management Module",
                style: TextStyle(fontSize: 18),
              ),
            ),
          ),

        ],
      ),
    );
  }
}