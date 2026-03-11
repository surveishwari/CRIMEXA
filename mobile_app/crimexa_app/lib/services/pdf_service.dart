import '../models/evidence_model.dart';
import '../models/hotspot_model.dart';

class HotspotService {
  /// Detect hotspots from evidence list
  /// [threshold] defines proximity to cluster points
  static List<Hotspot> detectHotspots(
    List<Evidence> evidenceList, {
    double threshold = 0.02,
  }) {
    List<Hotspot> hotspots = [];

    for (var e in evidenceList) {
      bool foundCluster = false;

      for (var h in hotspots) {
        double distance = (e.lat - h.lat).abs() + (e.lng - h.lng).abs();

        if (distance < threshold) {
          h.intensity += 1;
          foundCluster = true;
          break;
        }
      }

      if (!foundCluster) {
        hotspots.add(
          Hotspot(lat: e.lat, lng: e.lng, intensity: 1),
        );
      }
    }

    // Sort descending by intensity
    hotspots.sort((a, b) => b.intensity.compareTo(a.intensity));

    return hotspots;
  }
}