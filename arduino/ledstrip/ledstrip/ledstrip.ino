 #include <Adafruit_NeoPixel.h>
 #define PIN 6
 #define NUMPIXELS 300


Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

 //variables
 int incomingInt = 0;
 int third;
 int firstToSecond;
 
 void setup() {//change to 250000
   Serial.begin(250000);
   pixels.begin();
 } 

 void loop() {  

   while (Serial.available()) 
   { // If data is available to read,
     incomingInt = Serial.read(); //000 - 239

         
     //third = dritte Stelle von incomingInt (Helligkeit) 0 - 9
     third = incomingInt % 10;

     //first-to-second = erste und zweite Stelle von incomingInt (Position) 0 - 24
     firstToSecond = (incomingInt - third)/10;

     //setzt zwei Pixel mit definierter Helligkeit auf definierte Position
     pixels.setPixelColor(firstToSecond*2, pixels.Color(0, 0, third*10));
     pixels.setPixelColor((firstToSecond*2)+1, pixels.Color(0, 0, third*10)); 

 
   }
       pixels.show();
   
 
   
}
