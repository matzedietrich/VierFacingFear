/*
Thomas Sanchez Lengeling.
 http://codigogenerativo.com/
 KinectPV2, Kinect for Windows v2 library for processing
 Point Cloud example in a 2d Image, with threshold example
 */

import KinectPV2.KJoint;
import KinectPV2.*;
import processing.serial.*;


KinectPV2 kinect;

//Distance Threashold
int maxD = 4050; // 4.5mx
int minD = 0;  //  50cm

int columns = 360; //sollte durch 24 teilbar sein
int rows = 20; //sollte auch durch 2 teilbar sein
int leds = 48;
int firstPixelIndex = (((404/2)-(rows/2))*512)+((512-columns)/2);
int lastPixelIndex = firstPixelIndex+(512*(rows-1))+columns;

int [] average = new int[columns];
int [] averageForArduino = new int[24];
int singleValue = 0;
int[] abstufungen = { 150, 200, 250, 300, 400, 800, 1000, 1500, 1800};  // Alternate syntax
int helligkeitsstufe = 0;



Serial myPort;  // Create object from Serial class

void setup() {
  String portName = Serial.list()[2]; //change the 0 to a 1 or 2 etc. to match your port
  myPort = new Serial(this, portName, 250000);  
  size(1024, 424, P3D);
  kinect = new KinectPV2(this);
  //Enable point cloud
  kinect.enableDepthImg(true);
  kinect.enablePointCloud(true);
  kinect.init();
}

void draw() {
  //println("FP:" +firstPixelIndex);
  //println("LP:" +lastPixelIndex);




  background(0);

  image(kinect.getDepthImage(), 0, 0);

  /* obtain the point cloud as a PImage
   * Each pixel of the PointCloudDepthImage corresponds to the Z value
   * of Point Cloud i.e. distances.
   * The Point cloud values are mapped from (0 - 4500) mm  to gray color format (0 - 255)
   */
  image(kinect.getPointCloudDepthImage(), 512, 0);

  //obtain the raw depth data in integers from [0 - 4500]
  int [] rawData = kinect.getRawDepthData();
  //Threahold of the point Cloud.



  for (int i = 0; i < columns; i++) {
    for (int j = i + firstPixelIndex; j < lastPixelIndex; j += 512) {
      average[i] += rawData[j];
    }
    average[i] /= rows+1;
  } 


  for (int i = 0; i < averageForArduino.length; i++) {
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
