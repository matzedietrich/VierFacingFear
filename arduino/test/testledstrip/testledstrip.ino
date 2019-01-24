 #include <Adafruit_NeoPixel.h>
 #define PIN 6
 #define NUMPIXELS 300


Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

 //variables
int pos = 0;
int width = 60;
int brightness = 0;
int r = 0;
 String incomingString; // Data received from the serial port
 int input1 = 10;
 int input2 = 20;
 int input3 = 150;
 int input4 = 60;
 int incomingInt = 0;
 char einzelnerWert;
 char seperator = " ";
 int counter = 0;
 

 
 void setup() {
   Serial.begin(230400);
   pixels.begin();
   while(Serial.read() != 0000){
    
   }
 }


 

 void loop() {

   while (Serial.available()) 
   { // If data is available to read,
     //incomingString = Serial.read(); // read it and store it in val
     incomingInt = Serial.read();

     if(incomingInt != 0000){
        pixels.setPixelColor(incomingInt, pixels.Color(255, 0, 0));
        if(counter < 59){    
            counter++;   
        }
        else{
            counter = 0;
      }
     }
   }
   
    pixels.show();
}
