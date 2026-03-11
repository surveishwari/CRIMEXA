import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/app_provider.dart';

class EvidenceGalleryScreen extends StatelessWidget {
  const EvidenceGalleryScreen({super.key});

  @override
  Widget build(BuildContext context){

    final evidences = Provider.of<AppProvider>(context).evidences;

    return Scaffold(
      appBar: AppBar(title: const Text("Evidence Gallery")),
      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount:2),
        itemCount: evidences.length,
        itemBuilder: (_,i){

          final e = evidences[i];

          return Card(
            child: Column(
              children: [

                Expanded(
                  child: e.photoPath.isNotEmpty
                      ? Image.file(File(e.photoPath),fit: BoxFit.cover)
                      : const Icon(Icons.image,size:60),
                ),

                Text(e.type)

              ],
            ),
          );
        },
      ),
    );
  }
}