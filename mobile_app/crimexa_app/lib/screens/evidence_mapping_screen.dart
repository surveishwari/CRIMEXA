import 'package:flutter/material.dart';
import '../ai/reconstruction_engine.dart';

class EvidenceMappingScreen extends StatefulWidget {
  const EvidenceMappingScreen({super.key});

  @override
  State<EvidenceMappingScreen> createState() =>
      _EvidenceMappingScreenState();
}

class _EvidenceMappingScreenState extends State<EvidenceMappingScreen> {

  List<String> evidence = [];
  String result = "";

  final ReconstructionEngine engine = ReconstructionEngine();

  void addEvidence(String type) {

    setState(() {

      evidence.add(type);

      result = engine.reconstruct(evidence);

    });

  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("Evidence Mapping"),
      ),

      body: Padding(

        padding: const EdgeInsets.all(16),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            const Text(
              "Add Evidence",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            Wrap(

              spacing: 10,

              children: [

                ElevatedButton(
                  onPressed: () => addEvidence("knife"),
                  child: const Text("Add Knife"),
                ),

                ElevatedButton(
                  onPressed: () => addEvidence("blood"),
                  child: const Text("Add Blood"),
                ),

                ElevatedButton(
                  onPressed: () => addEvidence("body"),
                  child: const Text("Add Body"),
                ),

                ElevatedButton(
                  onPressed: () => addEvidence("glass"),
                  child: const Text("Add Glass"),
                ),

              ],

            ),

            const SizedBox(height: 20),

            const Text(
              "Evidence Found:",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            Expanded(

              child: ListView.builder(

                itemCount: evidence.length,

                itemBuilder: (context, index) {

                  return Card(

                    child: ListTile(

                      leading: const Icon(Icons.search),

                      title: Text(evidence[index]),

                    ),

                  );

                },

              ),

            ),

            const SizedBox(height: 10),

            const Text(
              "Predicted Event:",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 5),

            Text(
              result,
              style: const TextStyle(
                fontSize: 18,
                color: Colors.red,
                fontWeight: FontWeight.bold,
              ),
            ),

          ],

        ),

      ),

    );

  }
}