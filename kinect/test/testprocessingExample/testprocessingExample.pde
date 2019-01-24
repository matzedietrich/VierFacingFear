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
int maxD = 4500; // 4.5mx
int minD = 0;  //  50cm
int [] average = new int[512];
int [] averageForArduino = new int[60];


Serial myPort;  // Create object from Serial class
String val;     // Data received from the serial port

void setup() {
    String portName = Serial.list()[2]; //change the 0 to a 1 or 2 etc. to match your port
    myPort = new Serial(this, portName, 9600);
  
  
  
  size(1024, 424, P3D);

  kinect = new KinectPV2(this);

  //Enable point cloud
  kinect.enableDepthImg(true);
  kinect.enablePointCloud(true);

  kinect.init();

}

void draw() {
  
  
  
  
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
  kinect.setLowThresholdPC(minD);
  kinect.setHighThresholdPC(maxD);
  
    
    for(int i = 0; i < 512; i++){
      for(int j = i; j < 217088; j += 512){
        average[i] += rawData[j];
      }
      average[i] /= 424;
    }
    
    for(int i = 0; i < 512; i+=8){
      for(int j = i; j < i + 8; j++){
       
        
        
      }
    }
    
    for(int i = 0; i < 60; i++){
      for(int j = i * 8; j < i * 8 + 8; j++){
        averageForArduino[i] += average[j];   
      }
      averageForArduino[i] /= 8;
    }
    
    
    
   
    
        println(averageForArduino);

  
  if (mousePressed == true) 
  {                           //if we clicked in the window
   myPort.write('1');         //send a 1
   println("1");   
  } else 
  {                           //otherwise
  myPort.write('0');          //send a 0
  }   
  
  
  
}



void keyPressed() {
  if (key == '1') {
    minD += 100;
    println("Change min: "+minD);
  }

  if (key == '2') {
    minD -= 100;
    println("Change min: "+minD);
  }

  if (key == '3') {
    maxD += 100;
    println("Change max: "+maxD);
  }

  if (key == '4') {
    maxD -=100;
    println("Change max: "+maxD);
  }
  
  
  
}