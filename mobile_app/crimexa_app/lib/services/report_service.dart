import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

class ReportService {

Future<void> generateReport({
required String prediction,
required List objects,
required String reconstruction,
required List<String> timeline,
}) async {

```
final pdf = pw.Document();

pdf.addPage(

  pw.Page(
    build: (pw.Context context) {

      return pw.Column(

        crossAxisAlignment: pw.CrossAxisAlignment.start,

        children: [

          pw.Text(
            "CRIMEXA Crime Investigation Report",
            style: pw.TextStyle(
              fontSize: 24,
              fontWeight: pw.FontWeight.bold,
            ),
          ),

          pw.SizedBox(height: 20),

          pw.Text("Crime Type: $prediction"),

          pw.SizedBox(height: 10),

          pw.Text("Detected Objects: ${objects.join(", ")}"),

          pw.SizedBox(height: 10),

          pw.Text("Reconstruction: $reconstruction"),

          pw.SizedBox(height: 20),

          pw.Text(
            "Crime Timeline",
            style: pw.TextStyle(
              fontSize: 18,
              fontWeight: pw.FontWeight.bold,
            ),
          ),

          pw.SizedBox(height: 10),

          ...timeline.map(
            (step) => pw.Text(step),
          ),

        ],

      );

    },
  ),

);

await Printing.layoutPdf(
  onLayout: (format) async => pdf.save(),
);
```

}

}
