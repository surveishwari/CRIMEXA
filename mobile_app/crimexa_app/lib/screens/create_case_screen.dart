import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/crime_provider.dart';
import '../models/case_model.dart';

class CreateCaseScreen extends StatefulWidget {
  const CreateCaseScreen({super.key});

  @override
  State<CreateCaseScreen> createState() => _CreateCaseScreenState();
}

class _CreateCaseScreenState extends State<CreateCaseScreen> {
  final locationController = TextEditingController();
  final crimeController = TextEditingController();

  void createCase() {
    final location = locationController.text.trim();
    final crimeType = crimeController.text.trim();

    if (location.isEmpty || crimeType.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Please fill all fields")),
      );
      return;
    }

    final newCase = CaseModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      location: location,
      crimeType: crimeType,
      status: "Active",
      createdAt: DateTime.now(),
    );

    Provider.of<CrimeProvider>(context, listen: false).addCase(newCase);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Case Created Successfully")),
    );

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Create Case")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: locationController,
              decoration: const InputDecoration(
                labelText: "Location",
                prefixIcon: Icon(Icons.location_on),
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: crimeController,
              decoration: const InputDecoration(
                labelText: "Crime Type",
                prefixIcon: Icon(Icons.gavel),
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 30),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: createCase,
                icon: const Icon(Icons.add),
                label: const Text("Create Case"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}