import 'package:flutter/material.dart';

class CrimeReconstruction extends StatelessWidget {
  const CrimeReconstruction({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Crime Reconstruction")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.model_training, size: 100, color: Colors.deepPurple),
            SizedBox(height: 20),
            Text("3D Crime Scene Reconstruction Placeholder",
                style: TextStyle(fontSize: 18), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
