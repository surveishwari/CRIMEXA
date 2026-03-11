import '../models/evidence_model.dart';
import '../models/timeline_event.dart';

class TimelineService {

  static List<TimelineEvent> generateTimeline(List<Evidence> evidenceList){

    List<TimelineEvent> events = [];

    for(var evidence in evidenceList){

      events.add(
        TimelineEvent(
          title: "Evidence Collected",
          description: evidence.type,
          time: DateTime.parse(evidence.time),
        ),
      );

    }

    events.sort((a,b) => a.time.compareTo(b.time));

    return events;
  }

}