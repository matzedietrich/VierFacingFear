 #include <Adafruit_NeoPixel.h>
 #define PIN 6
 #define NUMPIXELS 300

//variables
int position = 0;
int width = 60;
int brightness = 0;
int averageArray[] = {};


Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

 
 
 int incomingValue; // Data received from the serial port

 
 void setup() {
   Serial.begin(38400); // Start serial communication at 9600 bps
   pixels.begin();
 }

void led(int r, int g, int b) {
  for(int i = 0; i < width; i++){
      pixels.setPixelColor(position+i, pixels.Color(r, g, b));
  }
   pixels.show();
}

 

 void loop() {
   if (Serial.available()) 
   { // If data is available to read,
     incomingValue = Serial.read(); // read it and store it in val
     
     for(int i = 0; i < 60; i++){
     averageArray[i] = incomingValue;
     
     }
     

   }

 


 

  led(0,0, brightness);
}
