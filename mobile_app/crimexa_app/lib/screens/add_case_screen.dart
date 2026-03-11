import 'package:flutter/material.dart';
import '../models/case_model.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

class AddCaseScreen extends StatefulWidget {
  const AddCaseScreen({super.key});

  @override
  State<AddCaseScreen> createState() => _AddCaseScreenState();
}

class _AddCaseScreenState extends State<AddCaseScreen> {
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  File? image;
  String crimeType = "Unknown";

  Future pickImage() async {
    final picked = await ImagePicker().pickImage(source: ImageSource.camera);
    if (picked != null) setState(() => image = File(picked.path));
  }

  void saveCase() {
    if (_titleController.text.isEmpty || image == null) return;

    CaseModel newCase = CaseModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: _titleController.text,
      description: _descController.text,
      crimeType: crimeType,
      imagePath: image!.path,
    );

    // Save locally or send to backend
    ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Case Saved Successfully")));

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Add New Case")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            children: [
              TextField(controller: _titleController, decoration: const InputDecoration(labelText: "Case Title")),
              TextField(controller: _descController, decoration: const InputDecoration(labelText: "Description")),
              const SizedBox(height: 10),
              ElevatedButton.icon(
                  icon: const Icon(Icons.camera_alt),
                  label: const Text("Attach Scene Image"),
                  onPressed: pickImage),
              if (image != null)
                Image.file(image!, height: 200),
              const SizedBox(height: 10),
              DropdownButton<String>(
                value: crimeType,
                items: ["Homicide", "Robbery", "Weapon Assault", "Burglary"]
                    .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                    .toList(),
                onChanged: (val) => setState(() => crimeType = val!),
              ),
              const SizedBox(height: 20),
              ElevatedButton(onPressed: saveCase, child: const Text("Save Case"))
            ],
          ),
        ),
      ),
    );
  }
}