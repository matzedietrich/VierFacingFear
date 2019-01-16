#include <Adafruit_NeoPixel.h>
#define PIN 6
#define NUMPIXELS 300

//variables
int position = 0;
int width = 300;
const int trigPin = 10;
const int echoPin = 9;
long duration;
int distance;

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  // put your setup code here, to run once:
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
}
