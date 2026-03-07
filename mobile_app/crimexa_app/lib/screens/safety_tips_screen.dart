import 'package:flutter/material.dart';

class SafetyTipsScreen extends StatelessWidget {
  const SafetyTipsScreen({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("Safety Tips")),

      body: const Padding(
        padding: EdgeInsets.all(20),

        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Text("• Avoid isolated areas at night"),
            Text("• Keep emergency contacts ready"),
            Text("• Use trusted transport services"),
            Text("• Share location with family"),
            Text("• Stay aware of surroundings"),

          ],
        ),
      ),
    );
  }
}