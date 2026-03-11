import '../models/evidence_model.dart';
import '../models/hotspot_model.dart';

class HotspotService {

  static List<Hotspot> detectHotspots(List<Evidence> evidenceList){

    List<Hotspot> hotspots = [];

    for(var e in evidenceList){

      bool foundCluster = false;

      for(var h in hotspots){

        double distance =
            (e.lat - h.lat).abs() +
            (e.lng - h.lng).abs();

        if(distance < 0.02){

          h.intensity += 1;
          foundCluster = true;
          break;

        }

      }

      if(!foundCluster){

        hotspots.add(
          Hotspot(
            lat: e.lat,
            lng: e.lng,
            intensity: 1,
          ),
        );

      }

    }

    return hotspots;
  }

}