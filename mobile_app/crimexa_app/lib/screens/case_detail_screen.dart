import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CaseDetailScreen extends StatefulWidget {

  final int caseId;

  const CaseDetailScreen({super.key, required this.caseId});

  @override
  State<CaseDetailScreen> createState() => _CaseDetailScreenState();
}

class _CaseDetailScreenState extends State<CaseDetailScreen> {

  Map caseData = {};

  final String baseUrl = "http://127.0.0.1:5000";

  Future loadCase() async {

    final res = await http.get(
        Uri.parse("$baseUrl/cases/${widget.caseId}")
    );

    caseData = jsonDecode(res.body);

    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    loadCase();
  }

  @override
  Widget build(BuildContext context) {

    if (caseData.isEmpty) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(

      appBar: AppBar(
        title: Text(caseData["title"]),
      ),

      body: Padding(

        padding: const EdgeInsets.all(20),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Text(
              "Status: ${caseData["status"]}",
              style: const TextStyle(fontSize: 18),
            ),

            const SizedBox(height: 20),

            const Text(
              "Timeline",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 10),

            Expanded(

              child: ListView.builder(

                itemCount: caseData["timeline"].length,

                itemBuilder: (context, i) {

                  return ListTile(
                    leading: const Icon(Icons.timeline),
                    title: Text(caseData["timeline"][i]),
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