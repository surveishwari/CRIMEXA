import 'package:flutter/material.dart';

class CaseListScreen extends StatelessWidget {
  const CaseListScreen({super.key});

  final List<Map<String, String>> dummyCases = const [
    {"id": "1019", "title": "Burglary at Downtown"},
    {"id": "1020", "title": "Suspicious Package Found"},
    {"id": "1021", "title": "Traffic Accident Investigation"},
    {"id": "1022", "title": "Arson Case at Warehouse"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Active Cases")),
      body: ListView.builder(
        itemCount: dummyCases.length,
        itemBuilder: (context, index) {
          final caseItem = dummyCases[index];
          return Card(
            child: ListTile(
              title: Text(caseItem["title"]!),
              subtitle: Text("Case ID: ${caseItem["id"]}"),
              trailing: const Icon(Icons.arrow_forward_ios),
              onTap: () {
                // Navigate to case detail screen (future)
              },
            ),
          );
        },
      ),
    );
  }
}