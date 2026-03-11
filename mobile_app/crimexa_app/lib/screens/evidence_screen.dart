import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../models/evidence_model.dart';

class EvidenceScreen extends StatefulWidget {
  const EvidenceScreen({super.key});

  @override
  State<EvidenceScreen> createState() => _EvidenceScreenState();
}

class _EvidenceScreenState extends State<EvidenceScreen> {

  final TextEditingController typeController = TextEditingController();
  final TextEditingController descController = TextEditingController();

  void addEvidence() {

    final provider = Provider.of<AppProvider>(context, listen: false);

    EvidenceModel evidence = EvidenceModel(
      id: DateTime.now().toString(),
      caseId: "CASE001",
      type: typeController.text,
      description: descController.text,
      imagePath: "",
      timestamp: DateTime.now(),
    );

    provider.addEvidence(evidence);

    typeController.clear();
    descController.clear();
  }

  @override
  Widget build(BuildContext context) {

    final provider = Provider.of<AppProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Evidence Manager"),
      ),

      body: Padding(
        padding: const EdgeInsets.all(20),

        child: Column(

          children: [

            TextField(
              controller: typeController,
              decoration: const InputDecoration(
                labelText: "Evidence Type",
              ),
            ),

            const SizedBox(height: 10),

            TextField(
              controller: descController,
              decoration: const InputDecoration(
                labelText: "Description",
              ),
            ),

            const SizedBox(height: 15),

            ElevatedButton(
              onPressed: addEvidence,
              child: const Text("Add Evidence"),
            ),

            const SizedBox(height: 20),

            Expanded(
              child: ListView.builder(
                itemCount: provider.evidences.length,

                itemBuilder: (context, index) {

                  final evidence = provider.evidences[index];

                  return Card(
                    child: ListTile(
                      title: Text(evidence.type),
                      subtitle: Text(evidence.description),
                      trailing: Text(
                        evidence.timestamp.toString(),
                      ),
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}