// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'evidence_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class EvidenceAdapter extends TypeAdapter<Evidence> {
  @override
  final int typeId = 0;

  @override
  Evidence read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Evidence(
      type: fields[0] as String,
      description: fields[1] as String,
      photoPath: fields[2] as String,
      latitude: fields[3] as double,
      longitude: fields[4] as double,
      timestamp: fields[5] as DateTime,
    );
  }

  @override
  void write(BinaryWriter writer, Evidence obj) {
    writer
      ..writeByte(6)
      ..writeByte(0)
      ..write(obj.type)
      ..writeByte(1)
      ..write(obj.description)
      ..writeByte(2)
      ..write(obj.photoPath)
      ..writeByte(3)
      ..write(obj.latitude)
      ..writeByte(4)
      ..write(obj.longitude)
      ..writeByte(5)
      ..write(obj.timestamp);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is EvidenceAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
