import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../services/api_service.dart';

class UploadEvidenceScreen extends StatefulWidget {
  const UploadEvidenceScreen({super.key});

  @override
  State<UploadEvidenceScreen> createState() => _UploadEvidenceScreenState();
}

class _UploadEvidenceScreenState extends State<UploadEvidenceScreen> {
  File? _image;
  Map<String, dynamic>? result;
  bool loading = false;

  final ImagePicker picker = ImagePicker();

  /// PICK IMAGE
  Future<void> pickImage() async {
    final pickedFile = await picker.pickImage(
      source: ImageSource.gallery,
    );

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
        result = null;
      });
    }
  }

  /// ANALYZE IMAGE USING API
  Future<void> analyzeImage() async {
    if (_image == null) return;

    setState(() => loading = true);

    try {
      var data = await ApiService.analyzeScene(_image!);

      setState(() {
        result = data;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Error: $e"),
        ),
      );
    }

    setState(() => loading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Upload Evidence"),
      ),

      body: Padding(
        padding: const EdgeInsets.all(16),

        child: Column(
          children: [

            /// IMAGE PREVIEW
            _image == null
                ? const Placeholder(fallbackHeight: 200)
                : Image.file(_image!, height: 200),

            const SizedBox(height: 20),

            /// BUTTONS
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                ElevatedButton(
                  onPressed: pickImage,
                  child: const Text("Pick Image"),
                ),

                const SizedBox(width: 20),

                ElevatedButton(
                  onPressed: analyzeImage,
                  child: loading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: Colors.white,
                          ),
                        )
                      : const Text("Analyze"),
                ),
              ],
            ),

            const SizedBox(height: 30),

            /// RESULT
            if (result != null) ...[
              Text(
                "Prediction: ${result!['prediction']}",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 10),

              Text(
                "Objects Detected: ${result!['objects_detected'].join(', ')}",
                style: const TextStyle(fontSize: 16),
              ),
            ],
          ],
        ),
      ),
    );
  }
}