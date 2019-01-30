#include <Adafruit_NeoPixel.h>
#define PIN 6
#define NUMPIXELS 300

//variables
int position = 0;
int width = 60;
const int trigPin = 10;
const int echoPin = 9;
long duration;
int distance;
String val;

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);
  pixels.begin();
  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void led(int r, int g, int b) {
  for(int i = 0; i < width; i++){
      pixels.setPixelColor(position+i, pixels.Color(r, g, b));
  }
   pixels.show();
}

void loop() {
  // put your main code here, to run repeatedly:
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration*0.034/2;
  // Prints the distance on the Serial Monitor
  delay(100);

  led(0,0, 255/distance);

  
  if (Serial.available()) 
   { // If data is available to read,
     val = Serial.read(); // read it and store it in val
   }
   if (val == '1') 
   { // If 1 was received
     Serial.println("clicked");
   } else {
     Serial.println("not clicked");
   }
   delay(10); // Wait 10 milliseconds for next reading


  
}
