import 'package:flutter/material.dart';

class CrimeReplayScreen extends StatefulWidget {

final List<String> timeline;

const CrimeReplayScreen({
super.key,
required this.timeline,
});

@override
State<CrimeReplayScreen> createState() => _CrimeReplayScreenState();
}

class _CrimeReplayScreenState extends State<CrimeReplayScreen> {

int currentStep = 0;

void startReplay() async {

```
for (int i = 0; i < widget.timeline.length; i++) {

  await Future.delayed(const Duration(seconds: 2));

  setState(() {
    currentStep = i;
  });

}
```

}

@override
void initState() {
super.initState();
startReplay();
}

@override
Widget build(BuildContext context) {

```
return Scaffold(

  appBar: AppBar(
    title: const Text("Crime Replay"),
  ),

  body: Center(

    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [

        const Icon(
          Icons.play_circle,
          size: 80,
          color: Colors.red,
        ),

        const SizedBox(height: 20),

        Text(
          widget.timeline[currentStep],
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),

        const SizedBox(height: 30),

        ElevatedButton(
          onPressed: () {
            setState(() {
              currentStep = 0;
            });
            startReplay();
          },
          child: const Text("Replay Again"),
        )

      ],
    ),

  ),

);
```

}
}
