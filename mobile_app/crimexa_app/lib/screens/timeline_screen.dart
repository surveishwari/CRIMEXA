import 'package:flutter/material.dart';
import 'crime_replay_screen.dart';

class TimelineScreen extends StatelessWidget {

  final List<String> timeline;

  const TimelineScreen({
    super.key,
    required this.timeline,
  });

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("Crime Timeline"),
      ),

      body: Column(
        children: [

          Expanded(
            child: ListView.builder(

              itemCount: timeline.length,

              itemBuilder: (context, index) {

                return ListTile(

                  leading: const Icon(
                    Icons.timeline,
                    color: Colors.red,
                  ),

                  title: Text(
                    timeline[index],
                    style: const TextStyle(
                      fontSize: 16,
                    ),
                  ),

                );

              },
            ),
          ),

          /// REPLAY BUTTON
          Padding(
            padding: const EdgeInsets.all(16),
            child: ElevatedButton.icon(

              icon: const Icon(Icons.play_arrow),

              label: const Text("Replay Crime Scene"),

              onPressed: () {

                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CrimeReplayScreen(
                      timeline: timeline,
                    ),
                  ),
                );

              },

            ),
          )

        ],
      ),

    );
  }
}