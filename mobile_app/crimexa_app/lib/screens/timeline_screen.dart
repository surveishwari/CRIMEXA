import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/crime_provider.dart';
import '../services/timeline_service.dart';
import '../services/timeline_ai_service.dart';
import '../models/timeline_event.dart';

class TimelineScreen extends StatelessWidget {
  const TimelineScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var provider = Provider.of<CrimeProvider>(context);

    List<TimelineEvent> events =
        TimelineService.generateTimeline(provider.evidenceList);
    String analysis = TimelineAIService.analyze(events);

    return Scaffold(
      appBar: AppBar(title: const Text("Crime Timeline Reconstruction")),
      body: Column(
        children: [
          Expanded(
            flex: 3,
            child: ListView.builder(
              itemCount: events.length,
              itemBuilder: (context, index) {
                final event = events[index];
                return ListTile(
                  leading: const CircleAvatar(
                    backgroundColor: Colors.indigo,
                    child: Icon(Icons.timeline, color: Colors.white),
                  ),
                  title: Text(event.title),
                  subtitle: Text("${event.description}\n${event.time}"),
                );
              },
            ),
          ),
          const Divider(),
          Expanded(
            flex: 2,
            child: Container(
              padding: const EdgeInsets.all(20),
              width: double.infinity,
              color: Colors.grey[100],
              child: SingleChildScrollView(
                child: Text(
                  analysis,
                  style: const TextStyle(fontSize: 16),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}