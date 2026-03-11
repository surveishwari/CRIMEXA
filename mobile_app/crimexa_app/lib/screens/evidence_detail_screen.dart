import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class EvidenceDetailScreen extends StatefulWidget {
  final int evidenceId;

  const EvidenceDetailScreen({super.key, required this.evidenceId});

  @override
  State<EvidenceDetailScreen> createState() => _EvidenceDetailScreenState();
}

class _EvidenceDetailScreenState extends State<EvidenceDetailScreen> {
  Map evidenceData = {};
  final TextEditingController noteController = TextEditingController();

  @override
  void initState() {
    super.initState();
    loadEvidence();
  }

  void loadEvidence() {
    final provider = Provider.of<AppProvider>(context, listen: false);
    final e = provider.evidenceList.firstWhere(
      (e) => e["id"] == widget.evidenceId,
      orElse: () => {},
    );
    setState(() {
      evidenceData = e;
    });
  }

  void addNote() {
    if (noteController.text.isEmpty) return;
    setState(() {
      if (evidenceData["timeline"] == null) {
        evidenceData["timeline"] = [];
      }
      evidenceData["timeline"].add(noteController.text);
      noteController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    if (evidenceData.isEmpty) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(evidenceData["name"] ?? "Evidence Detail"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Evidence main info
            Row(
              children: [
                Container(
                  width: 100,
                  height: 100,
                  color: Colors.grey[300],
                  child: const Icon(Icons.folder_open, size: 50),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        evidenceData["name"] ?? "",
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text("Type: ${evidenceData["type"] ?? ""}"),
                      Text(
                        "Date Added: ${evidenceData["date"] ?? ""}",
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            const Text(
              "Investigation Timeline",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),

            // Timeline list
            Expanded(
              child: evidenceData["timeline"] == null ||
                      evidenceData["timeline"].isEmpty
                  ? const Center(child: Text("No notes yet"))
                  : ListView.builder(
                      itemCount: evidenceData["timeline"].length,
                      itemBuilder: (context, index) {
                        final note = evidenceData["timeline"][index];
                        return ListTile(
                          leading: const Icon(Icons.note),
                          title: Text(note),
                        );
                      },
                    ),
            ),

            // Add new note
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: noteController,
                      decoration: const InputDecoration(
                        hintText: "Add investigation note...",
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: addNote,
                    child: const Text("Add"),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}