/*
Thomas Sanchez Lengeling.
 http://codigogenerativo.com/
 KinectPV2, Kinect for Windows v2 library for processing
 Point Cloud example in a 2d Image, with threshold example
 */

import KinectPV2.KJoint; //Libraries for Kinect
import KinectPV2.*;
import processing.serial.*;  //Library for communication via Serial Port


KinectPV2 kinect; //Objekt erstellen aus der Klasse 'KinectPV2'

//Distance Threashold
int maxD = 4050; // 405cm
int minD = 0;  //  50cm

//limit area
int columns = 360; //sollte durch 24 teilbar sein 
int rows = 20; //sollte auch durch 2 teilbar sein

int leds = 48;

//define index of first pixel and last pixel of Area
int firstPixelIndex = (((404/2)-(rows/2))*512)+((512-columns)/2);
int lastPixelIndex = firstPixelIndex+(512*(rows-1))+columns;

int [] average = new int[columns]; //saves average distance value of every column
int [] averageForArduino = new int[24]; //saves average distance value for Arduino
int singleValue = 0;
int[] abstufungen = { 150, 200, 250, 300, 500, 600, 700, 800, 900};  //helligkeitstufen mit jeweiliger distanz
int helligkeitsstufe = 0;



Serial myPort;  // Create object from Serial class

void setup() {
  String portName = Serial.list()[2]; //define Port that Arduino uses to communicate
  myPort = new Serial(this, portName, 250000);  
  size(1024, 424, P3D); //draw window to show the vision of kinect
  kinect = new KinectPV2(this); //initiate new kinect object
  //Enable point cloud
  kinect.enableDepthImg(true); //enable depth image
  kinect.enablePointCloud(true); //enable point cloud
  kinect.init(); //initiate kinect
}

void draw() {
   background(0); //set background color (black)

  image(kinect.getDepthImage(), 0, 0); //show and update depth image on canvas (x: 0, y: 0)

  /* obtain the point cloud as a PImage
   * Each pixel of the PointCloudDepthImage corresponds to the Z value
   * of Point Cloud i.e. distances.
   * The Point cloud values are mapped from (0 - 4500) mm  to gray color format (0 - 255)
   */
  image(kinect.getPointCloudDepthImage(), 512, 0);

  //obtain the raw depth data in integers from [0 - 4500]
  int [] rawData = kinect.getRawDepthData();


  for (int i = 0; i < columns; i++) { //staucht die 20 zeilen (rows) zu einer 
    for (int j = i + firstPixelIndex; j < lastPixelIndex; j += 512) {
      average[i] += rawData[j];
    }
    average[i] /= rows+1;
  } 


  for (int i = 0; i < averageForArduino.length; i++) {// staucht 360 reihen (columns) zu 24
    for (int j = i*(columns/averageForArduino.length); j < (i*(columns/averageForArduino.length)+columns/averageForArduino.length); j++) {
      averageForArduino[i] += average[j];
    }
    averageForArduino[i] /= (columns/averageForArduino.length);
    if (averageForArduino[i] < 300) {
      averageForArduino[i] = maxD;
    }
        println(averageForArduino[i]);
  }



  for (int i = 0; i < averageForArduino.length; i++) {
    if (averageForArduino[i] >= 0 && averageForArduino[i] < abstufungen[0]) {
      helligkeitsstufe = 9;
    } else if (averageForArduino[i] >= abstufungen[0] && averageForArduino[i] < abstufungen[1]) {
      helligkeitsstufe = 8;
    } else if (averageForArduino[i] >= abstufungen[1] && averageForArduino[i] < abstufungen[2]) {
      helligkeitsstufe = 7;
    } else if (averageForArduino[i] >= abstufungen[2] && averageForArduino[i] < abstufungen[3]) {
      helligkeitsstufe = 6;
    } else if (averageForArduino[i] >= abstufungen[3] && averageForArduino[i] < abstufungen[4]) {
      helligkeitsstufe = 5;
    } else if (averageForArduino[i] >= abstufungen[4] && averageForArduino[i] < abstufungen[5]) {
      helligkeitsstufe = 4;
    } else if (averageForArduino[i] >= abstufungen[5] && averageForArduino[i] < abstufungen[6]) {
      helligkeitsstufe = 3;
    } else if (averageForArduino[i] >= abstufungen[6] && averageForArduino[i] < abstufungen[7]) {
      helligkeitsstufe = 2;
    } else if (averageForArduino[i] >= abstufungen[7] && averageForArduino[i] < abstufungen[8]) {
      helligkeitsstufe = 1;
    } else if (averageForArduino[i] >= abstufungen[8]) {
      helligkeitsstufe = 0;
    }

    fill(helligkeitsstufe*25);
    rect(((512-columns)/2)+(i*(columns/48)*2), 404, (columns/48)*2, 30);


    singleValue = (helligkeitsstufe) + i * 10;
    //println(singleValue);
    //println(singleValue);
    myPort.write(singleValue);
  }
}  
