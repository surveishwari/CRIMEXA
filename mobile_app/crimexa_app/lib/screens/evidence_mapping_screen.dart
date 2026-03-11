import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/evidence_provider.dart';
import '../models/evidence.dart';

class EvidenceMappingScreen extends StatelessWidget {
  const EvidenceMappingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final evidenceProvider = Provider.of<EvidenceProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Evidence Mapping')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            ElevatedButton(
              onPressed: () {
                evidenceProvider.addEvidence(Evidence(
                  id: DateTime.now().toString(),
                  crimeId: 'crime1',
                  description: 'Sample Evidence',
                ));
              },
              child: const Text('Add Evidence'),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: evidenceProvider.evidenceList.length,
                itemBuilder: (context, index) {
                  final evidence = evidenceProvider.evidenceList[index];
                  return Card(
                    child: ListTile(
                      title: Text(evidence.description),
                      subtitle: Text('Crime ID: ${evidence.crimeId}'),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () {
                          evidenceProvider.evidenceList.removeAt(index);
                          evidenceProvider.notifyListeners();
                        },
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