export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Quaternions {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

export interface EPICImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  date: string;
  centroid_coordinates: Coordinates;
  dscovr_j2000_position: Position;
  lunar_j2000_position: Position;
  sun_j2000_position: Position;
  attitude_quaternions: Quaternions;
  coords: {
    centroid_coordinates: Coordinates;
    dscovr_j2000_position: Position;
    lunar_j2000_position: Position;
    sun_j2000_position: Position;
    attitude_quaternions: Quaternions;
  };
}